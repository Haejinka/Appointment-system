import React, { useState } from 'react';

const PetInfoEditModal = ({ pet, closeModal, savePetInfo }) => {
    // State to hold editable values
    const [editedPet, setEditedPet] = useState({ ...pet });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPet((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        savePetInfo(editedPet);
        closeModal();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Edit Pet Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Name:</label>
                        <input className="text-gray-800 w-full p-2 border rounded" name="name" value={editedPet.name} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Breed:</label>
                        <input className="text-gray-800 w-full p-2 border rounded" name="breed" value={editedPet.breed} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Age:</label>
                        <input type="number" className="text-gray-800 w-full p-2 border rounded" name="age" value={editedPet.age} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Birthdate:</label>
                        <input type="date" className="text-gray-800 w-full p-2 border rounded" name="birthdate" value={editedPet.birthdate} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Gender:</label>
                        <select className="text-gray-800 w-full p-2 border rounded" name="gender" value={editedPet.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Weight:</label>
                        <input className="text-gray-800 w-full p-2 border rounded" name="weight" value={editedPet.weight} onChange={handleChange} />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 focus:outline-none">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PetInfoEditModal;
