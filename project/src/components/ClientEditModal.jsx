import React, { useState } from 'react';
import { getDatabase, ref, update } from 'firebase/database';

const ClientEditModal = ({ client, closeModal }) => {
    const [editedClient, setEditedClient] = useState(client);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedClient(prevClient => ({
            ...prevClient,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const db = getDatabase();
        const clientRef = ref(db, `clients/${client.id}`); // Assuming client.id exists as the unique identifier
        update(clientRef, editedClient)
            .then(() => {
                console.log("Client updated successfully:", editedClient);
                closeModal();
            })
            .catch(error => {
                console.error("Error updating client:", error);
            });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-4">Edit Client</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <input type="text" name="name" value={editedClient.name} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Pets:</label>
                    <input type="number" name="numberOfPets" value={editedClient.numberOfPets} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number:</label>
                    <input type="text" name="contactNumber" value={editedClient.contactNumber} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-green-500 text-white">Save</button>
                    <button onClick={closeModal} className="px-4 py-2 rounded-md bg-red-500 text-white ml-2">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ClientEditModal;
