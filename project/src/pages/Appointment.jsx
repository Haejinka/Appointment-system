import React, { useState, useEffect } from 'react';
import Navbar_1 from '../components/Navbar_1';
import { getDatabase, ref, update, onValue } from 'firebase/database';
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
    const [isLoading, setIsLoading] = useState(true); // State to track loading
    const [isEmpty, setIsEmpty] = useState(false); // State to track if appointments are empty
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage] = useState(5);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        const appointmentsRef = ref(db, 'appointments');
        setIsLoading(true); // Begin loading
        const unsubscribe = onValue(appointmentsRef, (snapshot) => {
            setIsLoading(false); // Loading finished
            if (snapshot.exists()) {
                const appointmentData = Object.entries(snapshot.val())
                    .map(([key, value]) => ({ ...value, id: key }))
                    .filter(appointment => appointment.status === 'pending');
                setAppointments(appointmentData);
                setIsEmpty(appointmentData.length === 0); // Check if the data is empty
            } else {
                setAppointments([]);
                setIsEmpty(true); // Mark as empty since no data exists
            }
        }, {
            onlyOnce: false
        });
    
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleConfirm = async (id) => {
        console.log(`Confirm appointment with ID ${id}`);
        try {
            await update(ref(db, `appointments/${id}`), {
                status: 'confirmed'
            });
            console.log('Appointment confirmed successfully');
            // Remove the appointment from local state since its status is no longer pending
            setAppointments(prevAppointments =>
                prevAppointments.filter(appointment => appointment.id !== id)
            );
        } catch (error) {
            console.error('Error confirming appointment: ', error);
        }
    };
    
    const handleCancel = async (id) => {
        console.log(`Cancel appointment with ID ${id}`);
        try {
            const remark = prompt('Please provide a remark for cancellation:');
            if (remark === null) return; // User canceled the prompt
            await update(ref(db, `appointments/${id}`), {
                status: 'cancelled',
                notes: remark // Add the remark as notes
            });
            console.log('Appointment cancelled successfully');
            // Remove the appointment from local state since its status is no longer pending
            setAppointments(prevAppointments =>
                prevAppointments.filter(appointment => appointment.id !== id)
            );
        } catch (error) {
            console.error('Error cancelling appointment: ', error);
        }
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
                {isLoading ? (
                    // Loading State
                    <div className="text-center py-5">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                        <p>Loading appointments...</p>
                    </div>
                ) : isEmpty ? (
                    // Empty State
                    <div className="text-center py-5">
                        <p>No appointments to display.</p>
                    </div>
                ) : (
                    <>
                        {/* Appointment Panel and Cards as before */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold">Appointment Panel</h2>
                            <p className="text-gray-600">You are viewing the Appointment Panel</p>
                        </div>
                        <div className="flex flex-col space-y-4">
                            {currentAppointments.map(appointment => (
                                <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{appointment.date}</h3>
                                        <p className="text-gray-600">Time: {appointment.time}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button onClick={() => handleViewDetails(appointment)} className="px-4 py-2 rounded-md bg-blue-500 text-white">View Details</button>
                                        <button onClick={() => handleConfirm(appointment.id)} className="px-4 py-2 rounded-md bg-green-500 text-white">Confirm</button>
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
                    </>
                )}
            </div>
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
