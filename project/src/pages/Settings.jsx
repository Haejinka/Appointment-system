import React from 'react';
import Navbar_1 from '../components/Navbar_1';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

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
                    <div className="flex flex-col space-y-4">
                        {/* Logout Button */}
                        <div className="flex justify-end">
                        <div className="flex justify-end">
                            <button onClick={handleLogout} className="px-4 py-2 bg-blue-500 text-white rounded-md">Log Out</button>
                        </div>
                        </div>
                        {/* Change Password Button */}
                        <div className="flex justify-end">
                            <button onClick={handleChangePassword} className="px-4 py-2 bg-blue-500 text-white rounded-md">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
