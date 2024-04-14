import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

const AppointmentViewModal = ({ appointment, onClose }) => {
    const { clientID, date, petId, serviceID, status, time, notes } = appointment; // Updated petId to petID
    const [client, setClient] = useState(null);
    const [pet, setPet] = useState(null);
    const [service, setService] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();
            try {
                // Fetch client data
                const clientRef = ref(db, `clients/${clientID}`);
                const clientSnapshot = await get(clientRef);
                if (clientSnapshot.exists()) {
                    setClient(clientSnapshot.val());
                }

                // Fetch pet data
                const petRef = ref(db, `pets/${petId}`); // Updated to use petId
                const petSnapshot = await get(petRef);
                if (petSnapshot.exists()) {
                    setPet(petSnapshot.val());
                }

                // Fetch service data
                const serviceRef = ref(db, `services/${serviceID}`);
                const serviceSnapshot = await get(serviceRef);
                if (serviceSnapshot.exists()) {
                    setService(serviceSnapshot.val());
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [clientID, petId, serviceID]); // Updated to use petId

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date:</label>
                    <p className="text-gray-800">{date}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Time:</label>
                    <p className="text-gray-800">{time}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Client Name:</label>
                    <p className="text-gray-800">{client ? client.name : 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Pet Name:</label>
                    <p className="text-gray-800">{pet ? pet.name : 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Breed:</label>
                    <p className="text-gray-800">{pet ? pet.breed : 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Service:</label>
                    <p className="text-gray-800">{service ? service.name : 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status:</label>
                    <p className="text-gray-800">{status}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Notes:</label>
                    <p className="text-gray-800">{notes || 'No available notes'}</p>
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-200 ease-in-out">Close</button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentViewModal;
