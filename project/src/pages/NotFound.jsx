import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h1 className="text-4xl text-gray-800 font-bold mb-8">404 - Page Not Found</h1>
            <Link to="/" className="text-blue-500 hover:underline">Back to Dashboard</Link>
        </div>
    );
}

export default NotFound;
