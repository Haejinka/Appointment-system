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
import ForgotPassword from './components/ForgotPassword.jsx';
import MyComponent from './components/MyComponent.jsx';
import Navbar_1 from './components/Navbar_1.jsx';

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
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />, 
  },
  {
    path: '/test',
    element: <Navbar_1/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
