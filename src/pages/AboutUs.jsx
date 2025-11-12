import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Users, Mail } from "lucide-react";
import "./AboutUs.css";

const AboutUs = () => {
  const team = [
    {
      name: "Nilofar Kaji",
      role: "Founder & Director",
      image: "/images/nilofar.jpg",
    },
    {
      name: "Shubhangi Dholi",
      role: "Operations Manager",
      image: "/images/shubhangi.png",
    },
    {
      name: "Aishwarya Lute",
      role: "Volunteer Coordinator",
      image: "/images/aishwarya.jpg",
    },
  ];

  return (
    <div className="about-container">
      {/* Floating Icons */}
      <motion.div
        className="floating-icon left"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <Users size={70} />
      </motion.div>

      <motion.div
        className="floating-icon right"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <HeartHandshake size={70} />
      </motion.div>

      {/* Header Section */}
      <motion.header
        className="about-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>🌍 NGO-CONNECT</h1>
        <p>Empowering lives through compassion, education, and hope.</p>
      </motion.header>

      {/* Mission Section */}
      <motion.section
        className="about-section"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>💖 Our Mission</h2>
        <p>
          NGO-CONNECT is dedicated to uplifting underprivileged communities by
          providing access to food, education, and healthcare. We believe small
          acts of kindness can bring about big change.
        </p>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        className="about-section"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2>🎯 Our Vision</h2>
        <p>
          To build a compassionate world where every child has access to
          education, every family has food, and every person lives with dignity.
        </p>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="about-team"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h2>👥 Meet Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="about-contact"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h2>📞 Get in Touch</h2>
        <p>
          <Mail className="mail-icon" />{" "}
          <a href="mailto:ngoconnect@ngo.org">ngoconnect@ngo.org</a>
        </p>
        <p>📱 +91 98765 43210</p>
        <p>📍 123 Kindness Street, Nashik, Maharashtra</p>
      </motion.section>

      {/* Footer */}
      <footer className="about-footer">
        <p>© 2025 NGO-CONNECT | Together, We Create Change 💙</p>
      </footer>
    </div>
  );
};

export default AboutUs;
