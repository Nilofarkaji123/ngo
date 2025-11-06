import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    { title: "Food Donation", desc: "Donate leftover or surplus food with details.", route: "/food-donation" },
    { title: "Book Donation", desc: "Donate books by category: Story, Academic, Reference.", route: "/books-donation" },
    { title: "Clothes Donation", desc: "Donate clothes by gender and size for children, women, and men.", route: "/clothes-donation" },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content" data-aos="fade-up">
          <h1>Empowering Lives Through Kindness</h1>
          <p>Together, we build a world where every child and family thrives.</p>
          <button onClick={() => navigate("/donate-options")}>Donate Now</button>
        </div>
      </section>

      <section className="about-section" data-aos="fade-up">
        <h2>Who We Are</h2>
        <p>
          HelpingHand is a non-profit organization dedicated to supporting children and families in need.
          Our mission is to create a world where every child has access to education, nutrition, and care.
        </p>
      </section>

      <section className="services-section" data-aos="fade-up">
        <h2>What We Do</h2>
        <div className="services-grid">
          {services.map((sv, idx) => (
            <div key={idx} className="service-card" data-aos="zoom-in" data-aos-delay={idx*150}>
              <h3>{sv.title}</h3>
              <p>{sv.desc}</p>
              <button onClick={() => navigate(sv.route)}>Learn More</button>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section" data-aos="fade-up">
        <h2>Join Our Mission</h2>
        <p>Become a volunteer, support a child, or donate towards our cause.</p>
        <button onClick={() => navigate("/volunteers")}>Get Involved</button>
      </section>

      <footer className="footer-section" data-aos="fade-up">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>NGO-CONNECT</h3>
            <p>Connecting hearts to help those in need.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={()=>navigate("/home")}>Home</li>
              <li onClick={()=>navigate("/donate-options")}>Donate</li>
              <li onClick={()=>navigate("/about")}>About Us</li>
              <li onClick={()=>navigate("/contact")}>Contact</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>📞 +91 9876543210<br/>📧 info@ngo-connect.org</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 NGO-CONNECT | All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
