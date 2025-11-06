import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>NGO-Connect</h3>
        <p>Connecting hearts to help those in need. Together, we can build a better tomorrow.</p>
      </div>

      <div className="footer-section">
        <h4>Quick Links</h4>
        <a href="/">Home</a>
        <a href="/donate">Donate</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="footer-section">
        <h4>Contact</h4>
        <p>📞 +91 9876543210</p>
        <p>📧 info@ngo-connect.org</p>
      </div>

      <p className="footer-bottom">© 2025 NGO-Connect | All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
