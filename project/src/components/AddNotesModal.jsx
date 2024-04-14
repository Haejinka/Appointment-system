import React, { useState } from 'react';

const AddNotesModal = ({ appointment, onClose, onComplete }) => {
    const [notes, setNotes] = useState('');

    const handleChange = (e) => {
        setNotes(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onComplete(notes); // Pass appointment along with notes to handle completion
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Add Notes</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Notes:</label>
                        <textarea
                            className="text-gray-800 w-full p-2 border rounded"
                            name="notes"
                            value={notes}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNotesModal;
