import React from 'react';
import Navbar from '../components/Navbar';
import Logout from '../components/SignOut';

const Dashboard = () => {
    return (
        <div>
            <Logout/>
            <Navbar/>
            <h1>Dashboard (Protected)</h1>
            <p>Click the links to navigate</p>
      
            
        </div>
    )
}

export default Dashboard;
