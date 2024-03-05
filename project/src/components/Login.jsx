import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      // Add redirect logic if needed, e.g:
     navigate ('/'); 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="imgcontainer">
        <img src="img_avatar2.png" alt="Avatar" className="avatar" />
      </div>
      <div className="container">
        <label htmlFor="uname"><b>Username</b></label> 
        <input 
          type="text" 
          placeholder="Enter Username" 
          name="uname" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        /> 

        <label htmlFor="psw"><b>Password</b></label> 
        <input 
          type="password" 
          placeholder="Enter Password" 
          name="psw"  
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        /> 

        <button type="submit">Login</button> 
        <label> 
          <input type="checkbox" checked="checked" name="remember" /> Remember me 
        </label> 
      </div>
      <div className="container" style={{ backgroundColor: '#f1f1f1' }}> 
        <button type="button" className="cancelbtn">Cancel</button> 
        <span className="psw">Forgot <a href="#">password?</a></span> 
        <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
      </div> 
    </form>
  );
};

export default Login;
