import React, { useState } from 'react';
import Navbar_1 from '../components/Navbar_1';

const Client = () => {
    const [clients, setClients] = useState([
        { id: 1, name: "John Doe", contactNumber: "123-456-7890", numPets: 2, petsListed: ["Dog", "Cat"] },
        { id: 2, name: "Jane Smith", contactNumber: "987-654-3210", numPets: 1, petsListed: ["Bird"] },
        { id: 3, name: "Michael Johnson", contactNumber: "456-789-0123", numPets: 3, petsListed: ["Dog", "Fish", "Rabbit"] },
        { id: 4, name: "Emily Williams", contactNumber: "789-012-3456", numPets: 0, petsListed: [] },
        { id: 5, name: "David Brown", contactNumber: "321-654-0987", numPets: 2, petsListed: ["Cat", "Snake"] },
        // Add more clients if needed
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(5);

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRemove = (id) => {
        const updatedClients = clients.filter(client => client.id !== id);
        setClients(updatedClients);
    };

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
                        <div key={client.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{client.name}</h3>
                                    <p className="text-gray-600">Contact Number: {client.contactNumber}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Number of Pets: {client.numPets}</p>
                                    <p className="text-gray-600">Pets Listed: {client.petsListed.join(', ')}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 rounded-md bg-green-500 text-white">Edit</button>
                                <button className="px-4 py-2 rounded-md bg-red-500 text-white" onClick={() => handleRemove(client.id)}>Remove</button>
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
