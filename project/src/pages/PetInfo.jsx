import React, { useState } from 'react';
import Navbar_1 from '../components/Navbar_1';

const PetInfo = () => {
    const [pets, setPets] = useState([
        { id: 1, name: "Buddy", age: 5, breed: "Labrador Retriever" },
        { id: 2, name: "Max", age: 3, breed: "German Shepherd" },
        { id: 3, name: "Lucy", age: 2, breed: "Poodle" },
        { id: 4, name: "Charlie", age: 4, breed: "Golden Retriever" },
        { id: 5, name: "Daisy", age: 1, breed: "Beagle" },
        // Add more pets if needed
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [petsPerPage] = useState(5);

    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Navbar_1 />
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Indicator for Pet Info */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold">Pet Information</h2>
                    <p className="text-gray-600">You are viewing Pet Information</p>
                </div>
                {/* Horizontal Cards */}
                <div className="flex flex-col space-y-4">
                    {currentPets.map(pet => (
                        <div key={pet.id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
                                <p className="text-gray-600">Age: {pet.age}</p>
                                <p className="text-gray-600">Breed: {pet.breed}</p>
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
                    <span className="text-gray-600">Page {currentPage} of {Math.ceil(pets.length / petsPerPage)}</span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPets.length < petsPerPage} className="px-4 py-2 rounded-md bg-blue-500 text-white">Next</button>
                </div>
            </div>
        </div>
    );
}

export default PetInfo;
