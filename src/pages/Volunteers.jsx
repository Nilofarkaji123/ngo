import React from "react";
import { motion } from "framer-motion";
import { Heart, Users } from "lucide-react";
import "./Volunteers.css";

const Volunteers = () => {
  const volunteers = [
    {
      name: "Siddhi Kale",
      role: "Food Distribution Lead",
      image: "/images/siddhi.jpg",
      description:
        "Coordinates weekly food drives and ensures every meal reaches those in need.",
    },
    {
      name: "Prerana Warunkashe",
      role: "Education Support Volunteer",
      image: "/images/prerana.jpg",
      description:
        "Guides underprivileged students and helps in distributing learning materials.",
    },
    {
      name: "Aarya Gholap",
      role: "Clothing & Old Items Coordinator",
      image: "/images/aarya.png",
      description:
        "Manages collection drives for clothing and essential items for needy families.",
    },
  ];

  return (
    <div className="volunteers-container">

      {/* Floating Icons */}
      <motion.div
        className="icon-floating icon-left"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <Users size={70} />
      </motion.div>

      <motion.div
        className="icon-floating icon-right"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <Heart size={70} />
      </motion.div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="volunteers-title"
      >
        🌟 Our Volunteers – The Heart of <span>NGO-CONNECT</span>
      </motion.h1>

      {/* Cards */}
      <div className="volunteer-grid">
        {volunteers.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.08 }}
            className="volunteer-card"
          >
            <img src={v.image} alt={v.name} />
            <h2>{v.name}</h2>
            <h4>{v.role}</h4>
            <p>{v.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Join Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="join-section"
      >
        <h2>Want to Become a Volunteer?</h2>
        <p>
          Join our mission to bring positive change. Contribute your time and skills
          to help in education, donation drives, or community support programs.
        </p>
        <a href="/register" className="join-button">
          Join Us Now
        </a>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="volunteer-footer"
      >
        <p>© 2025 NGO-CONNECT | Empowering Lives Together 💙</p>
      </motion.div>
    </div>
  );
};

export default Volunteers;
