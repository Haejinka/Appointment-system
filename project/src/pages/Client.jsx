import React, { useState, useEffect } from 'react';
import Navbar_1 from '../components/Navbar_1';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import EditModal from '../components/ClientEditModal'; 
import ClientViewModal from '../components/ClientViewModal';

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

const Client = () => {
    const [clients, setClients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(5);
    const [editingClient, setEditingClient] = useState(null);
    const [viewingClient, setViewingClient] = useState(null);

    useEffect(() => {
        const clientsRef = ref(db, 'clients');
        onValue(clientsRef, (snapshot) => {
            const data = snapshot.val();
            const clientList = [];
            for (let id in data) {
                clientList.push({ id, ...data[id] });
            }
            setClients(clientList);
        });

        const appointmentsRef = ref(db, 'appointments');
        onValue(appointmentsRef, (snapshot) => {
            const data = snapshot.val();
            const appointmentList = [];
            for (let id in data) {
                appointmentList.push({ id, ...data[id] });
            }
            setAppointments(appointmentList);
        });
    }, []);

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEditClick = (client) => {
        setEditingClient(client);
    };

    const handleViewClick = (client) => {
        setViewingClient(client);
    };

    const closeEditModal = () => {
        setEditingClient(null);
    };

    const closeViewModal = () => {
        setViewingClient(null);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Navbar_1 />
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold">Client Panel</h2>
                    <p className="text-gray-600">You are viewing the Client Panel</p>
                </div>
                <div className="flex flex-col space-y-4">
                    {currentClients.map(client => (
                        <div key={client.id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{client.name}</h3>
                                <p className="text-gray-600">Number of Pets: {client.numberOfPets}</p>
                                <p className="text-gray-600">Contact Number: {client.contactNumber}</p>
                            </div>
                            <div className="space-x-2">
                                <button className="px-4 py-2 rounded-md bg-blue-500 text-white" onClick={() => handleViewClick(client)}>View</button>
                                <button onClick={() => handleEditClick(client)} className="px-4 py-2 rounded-md bg-green-500 text-white">Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded-md bg-blue-500 text-white">Previous</button>
                    <span className="text-gray-600">Page {currentPage} of {Math.ceil(clients.length / clientsPerPage)}</span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentClients.length < clientsPerPage} className="px-4 py-2 rounded-md bg-blue-500 text-white">Next</button>
                </div>
            </div>
            {editingClient && <ClientEditModal client={editingClient} closeModal={closeEditModal} />}
            {viewingClient && <ClientViewModal client={viewingClient} closeModal={closeViewModal} appointments={appointments} />}
        </div>
    );
}

export default Client;
