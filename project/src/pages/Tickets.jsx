import React, { useState, useEffect } from 'react';
import Navbar_1 from '../components/Navbar_1';
import { getDatabase, ref, update, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import AppointmentViewModal from '../components/AppointmentViewModal';
import AddNotesModal from '../components/AddNotesModal'; // Import the modal component

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
const db = getDatabase(app);

const Tickets = ({ clients, pets, services }) => {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage] = useState(5);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showAddNotesModal, setShowAddNotesModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointmentsRef = ref(db, 'appointments');
                const snapshot = await get(appointmentsRef);
                if (snapshot.exists()) {
                    const appointmentData = Object.entries(snapshot.val()).map(([key, value]) => ({ ...value, id: key }));
                    setAppointments(appointmentData.filter(appointment => appointment.status === 'confirmed'));
                }
            } catch (error) {
                console.error('Error fetching appointments: ', error);
            }
        };

        // Listen for changes in appointments and update state accordingly
        const appointmentsRef = ref(db, 'appointments');
        onValue(appointmentsRef, (snapshot) => {
            if (snapshot.exists()) {
                const appointmentData = Object.entries(snapshot.val()).map(([key, value]) => ({ ...value, id: key }));
                setAppointments(appointmentData.filter(appointment => appointment.status === 'confirmed'));
            }
        });

        fetchAppointments();
    }, [db]);

    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleCompleteAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setShowAddNotesModal(true);
    };

    const handleAddNotesModalClose = () => {
        setShowAddNotesModal(false);
    };

    const handleCompleteAppointmentWithNotes = async (notes) => {
        try {
            await update(ref(db, `appointments/${selectedAppointment.id}`), {
                status: 'completed',
                notes: notes
            });
            console.log('Appointment completed successfully');
            setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== selectedAppointment.id));
            setShowAddNotesModal(false); // Hide the add notes modal
        } catch (error) {
            console.error('Error completing appointment: ', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Navbar_1 />
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Indicator for Ticket Panel */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold">Ticket Panel</h2>
                    <p className="text-gray-600">You are viewing the Ticket Panel</p>
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
                                {/* Complete Button */}
                                <button onClick={() => handleCompleteAppointment(appointment)} className="px-4 py-2 rounded-md bg-yellow-500 text-white">Complete</button>
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
            {/* Ticket View Modal */}
            {!showAddNotesModal && selectedAppointment && (
                <AppointmentViewModal
                    appointment={selectedAppointment}
                    clients={clients}
                    pets={pets}
                    services={services}
                    onClose={() => setSelectedAppointment(null)}
                />
            )}
            {/* Add Notes Modal */}
            {showAddNotesModal && selectedAppointment && (
                <AddNotesModal
                    appointment={selectedAppointment}
                    onClose={handleAddNotesModalClose}
                    onComplete={handleCompleteAppointmentWithNotes}
                />
            )}
        </div>
    );
}

export default Tickets;