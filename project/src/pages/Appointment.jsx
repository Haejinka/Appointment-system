import React, { useState } from 'react';
import Navbar_1 from '../components/Navbar_1';

const Appointment = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, date: "2024-03-15", time: "09:00 AM" },
        { id: 2, date: "2024-03-16", time: "02:00 PM" },
        { id: 3, date: "2024-03-17", time: "11:30 AM" },
        { id: 4, date: "2024-03-18", time: "04:00 PM" },
        { id: 5, date: "2024-03-19", time: "10:00 AM" },
        // Add more appointments if needed
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage] = useState(5);

    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleConfirm = (id) => {
        // Implement logic to confirm appointment with id
        console.log(`Confirm appointment with ID ${id}`);
    };

    const handleCancel = (id) => {
        // Implement logic to cancel appointment with id
        console.log(`Cancel appointment with ID ${id}`);
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
                                <button className="px-4 py-2 rounded-md bg-blue-500 text-white">View Details</button>
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
        </div>
    );
}

export default Appointment;
