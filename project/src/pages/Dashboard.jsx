import React from 'react';
import Navbar_1 from '../components/Navbar_1';

const Dashboard = () => {
    return (
        <div className="flex">
            <Navbar_1 />
            <div className="flex-1 p-8">
                <div className="grid grid-cols-1 gap-8">
                    {/* Latest Appointment Schedule Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Latest Appointment</h3>
                            <p className="text-gray-600">Date: 12/03/2024</p>
                            <p className="text-gray-600">Time: 10:00 AM</p>
                        </div>
                        <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12" y2="16"></line>
                        </svg>
                    </div>
                    {/* Total Appointments Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Total Appointments</h3>
                            <p className="text-gray-600">Count: 50</p>
                        </div>
                        <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14l2 2 4-4"></path>
                        </svg>
                    </div>
                    {/* Total Patients Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Total Patients</h3>
                            <p className="text-gray-600">Count: 100</p>
                        </div>
                        <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 9V12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9"></path>
                            <path d="M16 5a4 4 0 0 1-4 4"></path>
                            <line x1="4" y1="9" x2="20" y2="9"></line>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
