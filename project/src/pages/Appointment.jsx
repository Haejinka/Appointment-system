import React, { useState, useEffect } from 'react';
import Navbar_1 from '../components/Navbar_1';
import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import AppointmentViewModal from '../components/AppointmentViewModal';

const firebaseConfig = {
    apiKey: "AIzaSyAmm0FVV618ftggSwqMLyL8A1xCewXJoaA",
    authDomain: "petplace-fc2ea.firebaseapp.com",
    projectId: "petplace-fc2ea",
    storageBucket: "petplace-fc2ea.appspot.com",
    messagingSenderId: "286818333615",
    appId: "1:286818333615:web:e6bdbfcad3b920ad86b55a",
    measurementId: "G-93QMXWMB0K"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const Appointment = ({ clients, pets, services }) => {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage] = useState(5);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        // Fetch appointments from Firebase Realtime Database
        const fetchAppointments = async () => {
            try {
                const appointmentsRef = ref(db, 'appointments');
                const snapshot = await get(appointmentsRef);
                if (snapshot.exists()) {
                    const appointmentData = Object.values(snapshot.val());
                    setAppointments(appointmentData);
                }
            } catch (error) {
                console.error('Error fetching appointments: ', error);
            }
        };
        fetchAppointments();
    }, [db]);

    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleConfirm = (id) => {
        console.log(`Confirm appointment with ID ${id}`);
        // Implement logic to confirm appointment with id
    };

    const handleCancel = (id) => {
        console.log(`Cancel appointment with ID ${id}`);
        // Implement logic to cancel appointment with id
    };

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Navbar_1 />
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Indicator for Appointment Panel */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold">Appointment Panel</h2>
                    <p className="text-gray-600">You are viewing the Appointment Panel</p>
                </div>
                {/* Horizontal Cards */}
                <div className="flex flex-col space-y-4">
                    {currentAppointments.map(appointment => (
                        <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{appointment.date}</h3>
                                <p className="text-gray-600">Time: {appointment.time}</p>
                            </div>
                            <div className="space-x-2">
                                {/* View Details Button */}
                                <button onClick={() => handleViewDetails(appointment)} className="px-4 py-2 rounded-md bg-blue-500 text-white">View Details</button>
                                {/* Confirm Button */}
                                <button onClick={() => handleConfirm(appointment.id)} className="px-4 py-2 rounded-md bg-green-500 text-white">Confirm</button>
                                {/* Cancel Button */}
                                <button onClick={() => handleCancel(appointment.id)} className="px-4 py-2 rounded-md bg-red-500 text-white">Cancel</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="mt-8 flex justify-between items-center">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded-md bg-blue-500 text-white">Previous</button>
                    <span className="text-gray-600">Page {currentPage} of {Math.ceil(appointments.length / appointmentsPerPage)}</span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentAppointments.length < appointmentsPerPage} className="px-4 py-2 rounded-md bg-blue-500 text-white">Next</button>
                </div>
            </div>
            {/* Appointment View Modal */}
            {selectedAppointment && (
                <AppointmentViewModal
                    appointment={selectedAppointment}
                    clients={clients}
                    pets={pets}
                    services={services}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default Appointment;
