import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1 className="welcome-text">NGO-CONNECT</h1>
      <p className="welcome-subtext">Welcome</p>
    </div>
  );
};

export default Welcome;
