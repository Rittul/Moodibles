import React from 'react'
import { useState } from 'react';
import barbequeLogo from "./assets/barbeque2.svg";
import {  registeruser } from "./api";
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const navigate = useNavigate();
    
    const handleRegister=async()=>{
        try{
            await registeruser ({ username,email, password });
            alert("User Registered! Now log in.");
            navigate("/login");
        }catch(err){
            alert("Registration failed. Please try again."+err);
            console.log(err);
        }
    }
  return (
    <>

<div id="Outer-login" className="flex min-h-screen items-center justify-center bg-gradient-to-r from-yellow-100 via-red-100 to-green-100">
      {/* Left Section */}
      <div id="First-half" className="text-center p-8">
        <h3 id="welcome" className="text-3xl font-bold mb-6">Welcome to Moddibles!</h3>
        <div id="first-img">
          <img src={barbequeLogo} alt="Barbeque Logo" />
        </div>
      </div>

      {/* Registration Form */}
      <div className="form bg-white shadow-lg rounded-2xl p-8 max-w-md w-full" >
        <p className="title text-2xl font-semibold mb-4">Register</p>
        <p className="message text-gray-600 mb-6">Signup now and get full access to our app.</p>

        <label className="block mb-4">
          <input
            required
            placeholder=""
            type="text"
            className="input w-full border-2 p-3 rounded-md focus:outline-none focus:border-yellow-400"
            value={username}
            onChange={(e)=> setusername(e.target.value)}
          />
          <span className="block mt-2 text-gray-600">Username</span>
        </label>

        <label className="block mb-4">
          <input
            required
            placeholder=""
            type="text"
            className="input w-full border-2 p-3 rounded-md focus:outline-none focus:border-yellow-400"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />
          <span className="block mt-2 text-gray-600">Email</span>
        </label>

        <label className="block mb-4">
          <input
            required
            placeholder=""
            type="password"
            className="input w-full border-2 p-3 rounded-md focus:outline-none focus:border-yellow-400"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
          />
          <span className="block mt-2 text-gray-600">Password</span>
        </label>

        <button type="submit" className="submit w-full bg-yellow-400 text-white p-3 rounded-lg font-semibold hover:bg-yellow-500 transition" onClick={ handleRegister}>
          Submit
        </button>

        <p className="signin text-gray-600 mt-6">
          Already have an account? <a href="#" className="text-yellow-500 hover:underline" onClick={() => navigate("/")}>Login</a>
        </p>
      </div>
    </div>

    </>
  )
}

export default Register
