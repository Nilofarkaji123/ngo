import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>
          NGO Connect <br /> Connecting Hearts, <br /> Changing Lives.
        </h1>
        <p>
          Join hands with us to spread kindness, hope, and support to those who
          need it most.
        </p>

        <div className="hero-buttons">
          <button className="donate-btn">💖 Donate Now</button>
          <button className="know-btn">📌 Know More</button>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="/images/helping-children.jpg"
          alt="Helping"
          className="slide-img"
        />
      </div>
    </div>
  );
};

export default Hero;
