import React from 'react';
import Navbar_1 from '../components/Navbar_1';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FiLogOut, FiLock } from 'react-icons/fi'; // Import icons

const Settings = () => {
    const handleChangePassword = () => {
        // Implement logic for changing password
        console.log("Change Password");
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="flex">
            <Navbar_1 />
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                    <div className="space-y-4">
                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
                        >
                            <FiLogOut className="mr-2" /> Log Out
                        </button>

                        {/* Change Password Button */}
                        <button
                            onClick={handleChangePassword}
                            className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
                        >
                            <FiLock className="mr-2" /> Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
