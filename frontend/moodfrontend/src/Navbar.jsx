import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
// Dropdown Component
const Dropdown = ({ title, items }) => (
  <div className="dropdown">
    <a href="#">{title}</a>
    <div className="dropdown-menu">
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle sidebar dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Toggle profile dropdown
  const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);

  // Close dropdowns when clicking outside
  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown-content") && !e.target.closest("#landing-hamburger")) {
      setIsOpen(false);
    }
    if (!e.target.closest(".profile-dropdown") && !e.target.closest(".profile-button")) {
      setIsProfileOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    alert("log out successfully");
    window.location.href = "/login"; 
};

  useEffect(() => {
    if (isOpen || isProfileOpen) {
      document.addEventListener("click", closeDropdown);
    } else {
      document.removeEventListener("click", closeDropdown);
    }
    return () => document.removeEventListener("click", closeDropdown);
  }, [isOpen, isProfileOpen]);

  return (
    <div className={`content ${isOpen ? "blurred" : ""}`}>
      {/* Navbar */}
      <nav>
        <div id="First-landing">
          {/* Sidebar Toggle Button */}
          <div id="landing-hamburger">
            <button onClick={toggleDropdown}>
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
          </div>
          <h1 onClick={() => navigate("/home")}>
            Moodibles<span>.</span>
          </h1>
        </div>

        {/* Navbar Menu */}
        <div className="menu">
          <Dropdown title="RECIPES" items={["Breakfast & Brunch", "Lunch", "Appetizers", "Dinner"]} />
          <Dropdown title="POPULAR" items={["Trending Now", "Casserole", "Chili", "Soup"]} />
          <Dropdown title="MEAT & SEAFOOD" items={["Chicken", "Salmon", "Pork", "Beef"]} />
          <Dropdown title="HEALTHY & DIET" items={["Keto", "Healthy", "Vegetarian", "Vegan"]} />
        </div>

        {/* Profile Icon with Dropdown */}
        <div className="icons-landing">
          <button className="profile-button" onClick={toggleProfileDropdown}>
            <FontAwesomeIcon icon={faUser} />
          </button>
          {isProfileOpen && (
            <div className="profile-dropdown show">
              <a href="#">View Profile</a>
              <a href="#" onClick={handleLogout} >Logout</a>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Links */}
      {isOpen && (
        <div className="dropdown-content show">
          <a href="#" className="page-logout">Mood Tracker</a>
          <a href="#" className="page-logout" onClick={() => navigate("/mtrace")}>Mood Tracker</a>
          <a href="#" className="page-logout" onClick={() => navigate("/Suggest")}>Suggest</a>
          <a href="#" className="page-logout"  onClick={() => navigate("/witk")}>What's in the Kitchen</a>
          <a href="#" className="page-logout"  onClick={() => navigate("/Recipe")}>Get Recipe</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
