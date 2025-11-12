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
<<<<<<< HEAD
    // Background animation
=======
>>>>>>> 44a06b37971cf9074ed9c6b99ccf355e829cf019
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 3000);

    // Redirect to Home after 10 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 6000);

    return () => {
      clearInterval(bgTimer);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="welcome-container" style={{ background: backgrounds[bgIndex] }}>
<<<<<<< HEAD
      {/* Particles */}
      <div className="particles">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 8 + 4;
          const delay = Math.random() * 5;
          const duration = Math.random() * 8 + 5;
          const left = Math.random() * 100 + "%";
          const color = `rgba(${Math.floor(Math.random() * 100)}, ${
            Math.floor(Math.random() * 180 + 50)
          }, 255, 0.7)`;
          return (
            <span
              key={i}
              className="particle"
              style={{
                width: size + "px",
                height: size + "px",
                left: left,
                background: color,
                animationDelay: delay + "s",
                animationDuration: duration + "s",
              }}
            />
          );
        })}
      </div>

      {/* Trees background */}
      <div className="trees">
        <div className="tree tree1"></div>
        <div className="tree tree2"></div>
        <div className="tree tree3"></div>
        <div className="tree tree4"></div>
        <div className="tree tree5"></div>
      </div>

      {/* Waves behind logo */}
      <div className="waves">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Center Content */}
=======
      
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(40)].map((_, i) => (
          <span key={i} className="particle" />
        ))}
      </div>

      {/* Center text + logo */}
>>>>>>> 44a06b37971cf9074ed9c6b99ccf355e829cf019
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
