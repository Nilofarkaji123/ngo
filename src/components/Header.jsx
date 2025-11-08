import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide header on Welcome page
  if (location.pathname === "/") return null;

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-section">
        <img src="/images/spac.webp" alt="Earth Logo" className="earth-logo" />
        <h1 className="logo-title">NGO-CONNECT</h1>
      </div>

      {/* Navigation Links */}
      <nav className="main-nav">
        <NavLink className="nav" to="/activities">Activities</NavLink>
        <NavLink className="nav" to="/about">About Us</NavLink>
        <NavLink className="nav" to="/home">Home</NavLink>
        <NavLink className="nav" to="/volunteers">Volunteers</NavLink>
        <NavLink className="nav" to="/donate-options" >Donate Now</NavLink>
      </nav>

      {/* Combined Auth Buttons */}
      <div className="auth-buttons">
        <div className="auth-group">
          <NavLink id="login" to="/login">Login</NavLink>
          <NavLink id="register" to="/register">Register</NavLink>
          <NavLink id="admin" to="/admin">Admin</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
