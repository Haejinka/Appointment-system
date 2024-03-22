import React, { useState } from 'react';
import Navbar_1 from '../components/Navbar_1';

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
    const [clients, setClients] = useState([
        { id: 1, name: "John Doe", numPets: 2, contactNumber: "123-456-7890" },
        { id: 2, name: "Jane Smith", numPets: 1, contactNumber: "456-789-0123" },
        { id: 3, name: "Michael Johnson", numPets: 3, contactNumber: "789-012-3456" },
        { id: 4, name: "Emily Williams", numPets: 0, contactNumber: "012-345-6789" },
        { id: 5, name: "David Brown", numPets: 2, contactNumber: "345-678-9012" },
        // Add more clients if needed
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(5);

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Navbar_1 />
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Indicator for Client Panel */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold">Client Panel</h2>
                    <p className="text-gray-600">You are viewing the Client Panel</p>
                </div>
                {/* Horizontal Cards */}
                <div className="flex flex-col space-y-4">
                    {currentClients.map(client => (
                        <div key={client.id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{client.name}</h3>
                                <p className="text-gray-600">Number of Pets: {client.numPets}</p>
                                <p className="text-gray-600">Contact Number: {client.contactNumber}</p>
                            </div>
                            <div className="space-x-2">
                                <button className="px-4 py-2 rounded-md bg-blue-500 text-white">View</button>
                                <button className="px-4 py-2 rounded-md bg-green-500 text-white">Edit</button>
                                <button className="px-4 py-2 rounded-md bg-red-500 text-white">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="mt-8 flex justify-between items-center">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded-md bg-blue-500 text-white">Previous</button>
                    <span className="text-gray-600">Page {currentPage} of {Math.ceil(clients.length / clientsPerPage)}</span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentClients.length < clientsPerPage} className="px-4 py-2 rounded-md bg-blue-500 text-white">Next</button>
                </div>
            </div>
        </div>
    );
}

export default Client;
