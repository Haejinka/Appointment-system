import React from 'react';

const PetInfoViewModal = ({ pet, closeModal }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Pet Information</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name:</label>
                    <p className="text-gray-800">{pet.name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Breed:</label>
                    <p className="text-gray-800">{pet.breed}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Age:</label>
                    <p className="text-gray-800">{pet.age}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Birthdate:</label>
                    <p className="text-gray-800">{pet.birthdate}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Gender:</label>
                    <p className="text-gray-800">{pet.gender}</p>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Weight:</label>
                    <p className="text-gray-800">{pet.weight}</p>
                </div>
                <div className="flex justify-end">
                    <button onClick={closeModal} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Close</button>
                </div>
            </div>
        </div>
    );
};

export default PetInfoViewModal;
