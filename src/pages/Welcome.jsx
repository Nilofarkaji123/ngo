import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);

  const backgrounds = [
    "linear-gradient(135deg, #cce7ff, #e6f2ff)",
    "linear-gradient(135deg, #b3e6ff, #ccefff)",
    "linear-gradient(135deg, #99ddff, #c0e6ff)",
    "linear-gradient(135deg, #80d4ff, #b3e6ff)",
  ];

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 3000);

    const timer = setTimeout(() => {
      navigate("/home");
    }, 4000);

    return () => {
      clearInterval(bgTimer);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="welcome-container" style={{ background: backgrounds[bgIndex] }}>
      
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(40)].map((_, i) => (
          <span key={i} className="particle" />
        ))}
      </div>

      {/* Center text + logo */}
      <div className="welcome-content">
        <img src="/images/front.webp" alt="NGO Logo" className="welcome-logo" />
        <div className="welcome-texts">
          <p className="welcome-top-text">Welcome To</p>
          <h1 className="welcome-text">NGO-CONNECT</h1>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
