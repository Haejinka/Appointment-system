import React from 'react';
import Navbar_1 from '../components/Navbar_1';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const appointmentsData = {
    labels: ['Pending', 'Confirmed', 'Cancelled'],
    datasets: [{
      label: 'Appointments',
      data: [20, 50, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
      categoryPercentage: 0.8, // Adjust for bar widths
      barPercentage: 0.9, // Adjust for bar widths 
    }]
  };

  return (
    <div className="flex">
      <Navbar_1 />
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Appointments Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Appointments Overview</h2>
            <div style={{ height: '400px', width: '100%' }}>
              <Bar
                data={appointmentsData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Other components */}
          {/* Latest Appointment */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Latest Appointment</h2>
            <div>
              <p className="text-gray-600">Date: 12/03/2024</p>
              <p className="text-gray-600">Time: 10:00 AM</p>
              <p className="text-gray-600">Patient/Client: John Doe</p>
              <p className="text-gray-600">Status: Confirmed</p>
            </div>
          </div>

          {/* Total Patients */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Total Patients</h2>
            <p className="text-gray-600">Count: 100</p>
            {/* Numerical count of total patients */}
          </div>

          {/* Total Clients */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Total Clients</h2>
            <p className="text-gray-600">Count: 80</p>
            {/* Numerical count of total clients */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
