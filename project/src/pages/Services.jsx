import React, { useState, useEffect } from 'react';
import Navbar_1 from '../components/Navbar_1';
import { MdEdit, MdDelete } from 'react-icons/md';
import { getDatabase, ref, get, set, push, remove } from 'firebase/database';
import { initializeApp } from 'firebase/app';

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

const Services = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ name: "", price: "", description: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [editModalOpen, setEditModalOpen] = useState(false); // State for modal
    const [editServiceData, setEditServiceData] = useState({}); // State for editing service
    const servicesPerPage = 3;

    useEffect(() => {
        const servicesRef = ref(db, 'services');
        get(servicesRef).then((snapshot) => {
            if (snapshot.exists()) {
                const servicesData = [];
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    servicesData.push({ id: childSnapshot.key, ...data });
                });
                setServices(servicesData);
            }
        });
    }, []);

    const handleAddService = () => {
        if (newService.name && newService.price && newService.description) {
            const newServiceRef = push(ref(db, 'services'));
            set(newServiceRef, newService)
                .then(() => {
                    // Update local state after successful database update
                    const updatedServices = [...services, { ...newService, id: newServiceRef.key }];
                    setServices(updatedServices);
                    setNewService({ name: "", price: "", description: "" });
                })
                .catch(error => {
                    console.error("Error adding new service:", error);
                    // Handle error if needed
                });
        }
    };
    

    const handleEditService = (id, newName, newPrice, newDescription) => {
        const serviceRef = ref(db, `services/${id}`);
        set(serviceRef, { name: newName, price: newPrice, description: newDescription })
            .then(() => {
                // Update local state after successful database update
                const updatedServices = services.map(service =>
                    service.id === id ? { ...service, name: newName, price: newPrice, description: newDescription } : service
                );
                setServices(updatedServices);
                setEditModalOpen(false); // Close modal after editing
            })
            .catch(error => {
                console.error("Error updating service:", error);
                // Handle error if needed
            });
    };

    const handleDeleteService = (id) => {
        const serviceRef = ref(db, `services/${id}`);
        remove(serviceRef)
            .then(() => {
                // Update local state after successful database update
                const updatedServices = services.filter(service => service.id !== id);
                setServices(updatedServices);
            })
            .catch(error => {
                console.error("Error deleting service:", error);
                // Handle error if needed
            });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setEditServiceData({});
    };

    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    return (
        <div className="flex h-screen">
            <Navbar_1 />
            <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold">Services Panel</h2>
                        <p className="text-gray-600">You are viewing the Services Panel</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Add New Service</h3>
                        <input
                            type="text"
                            placeholder="Service Name"
                            value={newService.name}
                            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                            className="border border-gray-300 px-3 py-2 rounded-md mb-2"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newService.price}
                            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                            className="border border-gray-300 px-3 py-2 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newService.description}
                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            className="border border-gray-300 px-3 py-2 rounded-md mb-2"
                        />
                        <button onClick={handleAddService} className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Service</button>
                    </div>
                    <div>
                        {currentServices.map(service => (
                            <div key={service.id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                                    <p className="text-gray-600">Price: ₱{service.price}</p>
                                    <p className="text-gray-600">Description: {service.description}</p>
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => { setEditModalOpen(true); setEditServiceData(service); }} className="px-3 py-2 bg-yellow-500 text-white rounded-md"><MdEdit /></button>
                                    <button onClick={() => handleDeleteService(service.id)} className="px-3 py-2 bg-red-500 text-white rounded-md"><MdDelete /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {services.length > servicesPerPage && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md mr-2"
                            >
                                Previous
                            </button>
                            <span className="text-gray-600">Page {currentPage} of {Math.ceil(services.length / servicesPerPage)}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentServices.length < servicesPerPage}
                                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md ml-2"
                            >
                                Next
                            </button>
                        </div>
                    )}
                    {editModalOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 max-w-sm rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-4">Edit Service</h3>
                                <input
                                    type="text"
                                    placeholder="Service Name"
                                    value={editServiceData.name}
                                    onChange={(e) => setEditServiceData({ ...editServiceData, name: e.target.value })}
                                    className="border border-gray-300 px-3 py-2 rounded-md mb-2"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={editServiceData.price}
                                    onChange={(e) => setEditServiceData({ ...editServiceData, price: e.target.value })}
                                    className="border border-gray-300 px-3 py-2 rounded-md mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={editServiceData.description}
                                    onChange={(e) => setEditServiceData({ ...editServiceData, description: e.target.value })}
                                    className="border border-gray-300 px-3 py-2 rounded-md mb-2"
                                />
                                <div className="flex justify-end">
                                    <button onClick={() => handleEditService(editServiceData.id, editServiceData.name, editServiceData.price, editServiceData.description)} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Save</button>
                                    <button onClick={closeEditModal} className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md">Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;