import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

  return (
    <header className="header">

      <div className="logo-section">
        <img src="/images/spac.webp" alt="Earth Logo" className="earth-logo" />
        <h1 className="logo-title">NGO-CONNECT</h1>
      </div>

      <nav className="main-nav">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/volunteers">Volunteers</NavLink>

        <button onClick={() => navigate("/donate-options")} className="donate-now">
          💖 Donate Now
        </button>
      </nav>

      <div className="auth-buttons">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </div>

    </header>
  );
};

export default Header;
