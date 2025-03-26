import React from 'react'
import { useState } from "react";
import barbequeLogo from "./assets/barbeque1.svg";
import { loginuser } from "./api";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handlelogin= async(e)=>{
        // e.preventdefault();
        try {
            const res = await loginuser({ username, password }); 
            console.log(res.data);
            localStorage.setItem("token", res.data.access); 
            alert("Logged in Successfully!");
            navigate("/home");
          } catch (error) {
            console.error("Login failed", error);
            alert("Login failed! Check credentials.");
          }
    }
  
  return (
    <>
      
      <div id="Outer-login">
      {/* First Half - Logo Section */}
      <div id="First-half">
        <h3 id="welcome">Welcome to Moodibles!</h3>
        <div id="first-img">
          <img src={barbequeLogo} alt="Barbeque Logo" />
        </div>
      </div>

      {/* Second Half - Login Form */}
      <div id="second-half">
        <div className="card">
          <h4 className="title">Log In!</h4>
          <div >
            {/* Username Field */}
            <div className="field">
              <input
                autoComplete="off"
                placeholder="Username"
                className="input-field"
                type="text"
                // value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="field">
              <input
                autoComplete="off"
                placeholder="Password"
                className="input-field"
                type="password"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button className="btn" type="submit" onClick={handlelogin}>
              Login
            </button>

            {/* Links */}
            <a href="#" className="btn-link">Forgot your password?</a>
            <Link to="/register" id="Account">Don't have an account?</Link>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Login
