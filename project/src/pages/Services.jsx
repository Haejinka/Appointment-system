import React, { useState } from 'react';
import Navbar_1 from '../components/Navbar_1';
import { MdEdit, MdDelete } from 'react-icons/md';

const Services = () => {
    // Dummy data for services
    const [services, setServices] = useState([
        { id: 1, name: "Service 1", price: 50 },
        { id: 2, name: "Service 2", price: 75 },
        { id: 3, name: "Service 3", price: 100 },
        // Add more services if needed
    ]);

    // State for adding new service
    const [newService, setNewService] = useState({ name: "", price: "" });

    // State for current page
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 3;

    // Function to handle adding a new service
    const handleAddService = () => {
        if (newService.name && newService.price) {
            setServices([...services, { id: services.length + 1, ...newService }]);
            setNewService({ name: "", price: "" });
        }
    };

    // Function to handle editing a service
    const handleEditService = (id, newName, newPrice) => {
        const updatedServices = services.map(service =>
            service.id === id ? { ...service, name: newName, price: newPrice } : service
        );
        setServices(updatedServices);
    };

    // Function to handle deleting a service
    const handleDeleteService = (id) => {
        const updatedServices = services.filter(service => service.id !== id);
        setServices(updatedServices);

        // Adjust current page if necessary
        if (updatedServices.length % servicesPerPage === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Calculate indexes of the first and last service on the current page
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Navbar_1 />
            <div className="flex-1 p-8">
                {/* Indicator for Services Panel */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold">Services Panel</h2>
                    <p className="text-gray-600">You are viewing the Services Panel</p>
                </div>
                {/* Add New Service Form */}
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
                    <button onClick={handleAddService} className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Service</button>
                </div>
                {/* List of Services */}
                <div>
                    {currentServices.map(service => (
                        <div key={service.id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                                <p className="text-gray-600">Price: ${service.price}</p>
                            </div>
                            <div className="space-x-2">
                                <button className="px-3 py-2 bg-yellow-500 text-white rounded-md"><MdEdit /></button>
                                <button onClick={() => handleDeleteService(service.id)} className="px-3 py-2 bg-red-500 text-white rounded-md"><MdDelete /></button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
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
            </div>
        </div>
    );
}

export default Services;
