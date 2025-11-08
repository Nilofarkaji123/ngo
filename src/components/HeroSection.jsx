import React from "react";
import "./HeroSection.css";
import heroImg from "../assets/hero-children.png"; // update path

function HeroSection() {
  return (
    <section className="hero-container">
      <img src={heroImg} alt="Helping Children" className="hero-bg" />
      <div className="hero-overlay">
        <h1>Join Hands to Make Lives Better</h1>
        <p>We connect donors, volunteers, and communities to bring positive change.</p>
        <div className="hero-buttons">
          <button className="primary-btn">Donate Now</button>
          <button className="secondary-btn">Get Involved</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
