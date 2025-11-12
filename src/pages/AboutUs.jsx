import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>🌍 NGO-CONNECT </h1>
        <p>Empowering lives through compassion, education, and hope.</p>
      </header>

      <section className="about-section">
        <h2>💖 Our Mission</h2>
        <p>
          NGO-CONNECT is dedicated to uplifting underprivileged communities
          by providing access to food, education, and healthcare. We believe small
          acts of kindness can bring about big change.
        </p>
      </section>

      <section className="about-section">
        <h2>🎯 Our Vision</h2>
        <p>
          To build a compassionate world where every child has access to education,
          every family has food, and every person lives with dignity.
        </p>
      </section>

      <section className="about-team">
        <h2>👥 Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <img src="/images/founder.jpg" alt="Founder" />
            <h3>Roshani Gawai</h3>
            <p>Founder & Director</p>
          </div>
          <div className="team-card">
            <img src="/images/cofounder.jpg" alt="Co-founder" />
            <h3>Rahul Sharma</h3>
            <p>Co-Founder & Operations Head</p>
          </div>
          <div className="team-card">
            <img src="/images/volunteer.jpg" alt="Volunteer Lead" />
            <h3>Anjali Patel</h3>
            <p>Volunteer Coordinator</p>
          </div>
        </div>
      </section>

      <section className="about-contact">
        <h2>📞 Get in Touch</h2>
        <p>Email: <a href="mailto:helpinguniverse@ngo.org">helpinguniverse@ngo.org</a></p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 123 Kindness Street, Pune, Maharashtra</p>
      </section>
    </div>
  );
}

export default AboutUs;
