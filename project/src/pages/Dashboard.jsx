import React, { useEffect, useState } from 'react';
import Navbar_1 from '../components/Navbar_1';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Register common chart types
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAmm0FVV618ftggSwqMLyL8A1xCewXJoaA",
  authDomain: "petplace-fc2ea.firebaseapp.com",
  projectId: "petplace-fc2ea",
  storageBucket: "petplace-fc2ea.appspot.com",
  messagingSenderId: "286818333615",
  appId: "1:286818333615:web:e6bdbfcad3b920ad86b55a",
  measurementId: "G-93QMXWMB0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState({});
  const [latestAppointment, setLatestAppointment] = useState(null);
  const [pets, setPets] = useState({});

  // Fetching Appointments from Firebase
  useEffect(() => {
    const appointmentsRef = ref(db, 'appointments');
    onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();
      const appointmentsList = Object.values(data);
      setAppointments(appointmentsList);

      // Find the latest appointment with a 'Confirmed' status
      const confirmedAppointments = appointmentsList.filter(appointment => appointment.status === 'confirmed');
      const latestConfirmed = confirmedAppointments[confirmedAppointments.length - 1];
      setLatestAppointment(latestConfirmed);
    });
  }, []);

  // Fetching Clients from Firebase
  useEffect(() => {
    const clientsRef = ref(db, 'clients');
    onValue(clientsRef, (snapshot) => {
      setClients(snapshot.val());
    });
  }, []);

  // Fetching Pets from Firebase
  useEffect(() => {
    const petsRef = ref(db, 'pets');
    onValue(petsRef, (snapshot) => {
      setPets(snapshot.val());
    });
  }, []);

  // Preparing data for the Appointments Overview chart
  const appointmentStatuses = appointments.reduce((acc, { status }) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const appointmentsData = {
    labels: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    datasets: [{
      label: 'Appointments',
      data: [appointmentStatuses.pending || 0, appointmentStatuses.confirmed || 0, appointmentStatuses.cancelled || 0, appointmentStatuses.completed || 0],
      backgroundColor: [ 
        'rgba(255, 99, 132, 0.6)',  
        'rgba(54, 162, 235, 0.6)',  
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)', 
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
      categoryPercentage: 0.8,
      barPercentage: 0.9, 
    }]
  };

  // Getting data for the latest appointment (if exists)
  const latestAppointmentDetails = latestAppointment && clients[latestAppointment.clientID] ? {
    date: latestAppointment.date,
    time: latestAppointment.time,
    client: clients[latestAppointment.clientID].name,
    status: latestAppointment.status
  } : null;

  return (
    <div className="flex">
      <Navbar_1 />
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Appointments Overview</h2>
            <div style={{ height: '400px', width: '100%' }}>
              <Bar
                data={appointmentsData}
                options={{
                  scales: {
                    x: {
                      type: 'category',
                    },
                    y: {
                      type: 'linear',
                      ticks: {
                        beginAtZero: true,
                      }
                    }
                  },
                  maintainAspectRatio: false, 
                }}
              />
            </div>
          </div>
{/* Latest Appointments Here (Can be separated as a component) */}
          {latestAppointmentDetails && latestAppointmentDetails.status === 'confirmed' && (
  <div className="bg-white rounded-lg shadow-md p-6 relative">
    <h2 className="text-2xl font-semibold mb-4">Latest Confirmed Appointment</h2>
    <div className="flex items-center mb-2">
      <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M8 7V3m8 4V3m-9 8h10M3 21h18a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      <p className="text-lg text-gray-700 font-medium">Date: <span className="text-gray-600">{latestAppointmentDetails.date}</span></p>
    </div>
    <div className="flex items-center mb-2">
      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p className="text-lg text-gray-700 font-medium">Time: <span className="text-gray-600">{latestAppointmentDetails.time}</span></p>
    </div>
    <div className="flex items-center mb-4">
      <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-1.657-1.343-3-3-3H7a3 3 0 00-3 3v2m3-6V5a3 3 0 013-3h4a3 3 0 013 3v9m-9 3h10"></path>
      </svg>
      <p className="text-lg text-gray-700 font-medium">Client: <span className="text-gray-600">{latestAppointmentDetails.client}</span></p>
    </div>
    <div className="absolute top-6 right-6 px-4 py-1 bg-green-100 text-green-800 rounded-full">
      <p className="text-xs font-semibold uppercase">{latestAppointmentDetails.status}</p>
    </div>
  </div>
)}
{/* end of latest Appointment component */}

{/* Start of Total Patient component */}
<div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
  <div className="flex items-center">
    <svg className="w-8 h-8 text-indigo-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c-3.124 0-5.826 2.088-6.682 5H2v2c0 3.308 2.692 6 6 6s6-2.692 6-6v-2h-3.318c-.856-2.912-3.558-5-6.682-5z" />
      <path d="M16.683 16c-1.407 0-2.736.471-3.818 1.324-1.082-.853-2.411-1.324-3.818-1.324s-2.736.471-3.818 1.324C4.32 17.471 3.016 18 1.683 18h18.634c-1.333 0-2.637-.529-3.818-1.324-1.082.853-2.411 1.324-3.818 1.324z" />
    </svg>
    <h2 className="text-xl font-semibold">Total Pets in Care</h2>
  </div>
  <p className="text-lg text-indigo-600 font-bold">{Object.keys(pets).length}</p>
</div>
{/* end of component */}

{/* start of total clients component */}
<div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
  <div className="flex items-center">
    <svg className="w-8 h-8 text-green-500 mr-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <h2 className="text-xl font-semibold">Total Clients</h2>
  </div>
  <p className="text-lg text-green-600 font-bold">{Object.keys(clients).length}</p>
</div>

{/* end of component */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
