import React from 'react';

const ClientViewModal = ({ client, closeModal, appointments }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <h2 className="text-2xl font-semibold mb-4">Client Details</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name:</label>
                    <p className="text-gray-800">{client.name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number:</label>
                    <p className="text-gray-800">{client.contactNumber}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Pets:</label>
                    <p className="text-gray-800">{client.numberOfPets}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Appointments:</label>
                    {appointments
                        .filter(appointment => appointment.clientID === client.id)
                        .map((appointment, index) => (
                            <div key={index} className="mb-2">
                                <p className="text-gray-800">{appointment.date}: {appointment.service} {appointment.time}</p>
                            </div>
                        ))}
                </div>
                <div className="flex justify-end">
                    <button onClick={closeModal} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-200 ease-in-out">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ClientViewModal;
