import React from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYouLetter.css";

const ThankYouLetter = () => {
  const navigate = useNavigate();

  return (
    <div className="thankyou-wrapper">
      <div className="floating-confetti"></div>

      <div className="thankyou-box">
        <h1>🎉 Thank You! 🎉</h1>
        <p className="msg">
          Your kind gesture has added joy and hope to children's lives.
        </p>

        <p className="line">
          ❤️ *Your support makes the world a better place.* ❤️
        </p>

        <button className="home-btn" onClick={() => navigate("/home")}>
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouLetter;
