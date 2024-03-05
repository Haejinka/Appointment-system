import React from 'react';
import ReactDOM from 'react-dom/client';
import  UserProvider  from './context/UserContext';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Client from './pages/Client.jsx';
import Appointment from './pages/Appointment.jsx';
import Services from './pages/Services.jsx';
import PetInfo from './pages/PetInfo.jsx';
import  NotFound  from './pages/NotFound.jsx';
import  ProtectedRoute  from './components/ProtectedRoute';
import Login from './components/Login'; 
import Signup from './components/SignUp.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/client',
    element: (
      <ProtectedRoute>
        <Client />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/pet',
    element: (
      <ProtectedRoute>
        <PetInfo />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/services',
    element: (
      <ProtectedRoute>
        <Services />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/appointment',
    element: (
      <ProtectedRoute>
        <Appointment />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />, 
  },
  {
    path: '/signup',
    element: <Signup />, 
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
