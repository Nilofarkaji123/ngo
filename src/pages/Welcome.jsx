import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);

  // Background gradients
  const backgrounds = [
    "linear-gradient(135deg, #cce7ff, #e6f2ff)",
    "linear-gradient(135deg, #b3e6ff, #ccefff)",
    "linear-gradient(135deg, #99ddff, #c0e6ff)",
    "linear-gradient(135deg, #80d4ff, #b3e6ff)",
  ];

  useEffect(() => {
    // Change background every 3s
    const bgTimer = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgrounds.length);
    }, 3000);

    // Redirect to Home after 10 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(bgTimer);
    };
  }, [navigate]);

  return (
    <div className="welcome-container" style={{ background: backgrounds[bgIndex] }}>
      {/* Random Particles */}
      <div className="particles">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 8 + 4; // 4px to 12px
          const delay = Math.random() * 5; // stagger
          const duration = Math.random() * 8 + 5; // 5s to 13s
          const left = Math.random() * 100 + "%";
          const color = `rgba(${Math.floor(Math.random()*100)}, ${Math.floor(Math.random()*180 + 50)}, 255, 0.7)`;
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
            ></span>
          );
        })}
      </div>

      {/* Center Content */}
      <div className="welcome-content">
        <p className="welcome-top-text">Welcome</p>
        <img src="/images/front.webp" alt="NGO Logo" className="welcome-logo" />
        <h1 className="welcome-text">NGO-CONNECT</h1>
      </div>
    </div>
  );
};

export default Welcome;
