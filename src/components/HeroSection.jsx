import React from "react";
import "./HeroSection.css";
import heroImg from "../assets/hero-children.png"; // make sure to update image path

function HeroSection() {
  return (
    <section className="hero-container">
      <div className="hero-text">
        <h1>Join Hands to Make Lives Better</h1>
        <p>We connect donors, volunteers, and communities to bring positive change.</p>
        <button className="primary-btn">Donate Now</button>
        <button className="secondary-btn">Get Involved</button>
      </div>

      <div className="hero-image">
        <img src={heroImg} alt="Helping Children" />
      </div>
    </section>
  );
}

export default HeroSection;
