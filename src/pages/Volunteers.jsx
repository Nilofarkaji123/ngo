import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Award } from "lucide-react";

const Volunteers = () => {
  const volunteers = [
    {
      name: "Aarav Sharma",
      role: "Food Distribution Lead",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Organizes weekly food drives and ensures fair distribution.",
    },
    {
      name: "Neha Patel",
      role: "Education Support Volunteer",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      description: "Teaches underprivileged children and manages book donations.",
    },
    {
      name: "Rahul Verma",
      role: "Clothing & Old Items Coordinator",
      image: "https://randomuser.me/api/portraits/men/74.jpg",
      description: "Leads collection and distribution of donated clothes and items.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-center text-blue-700 mb-8"
      >
        🌟 Our Volunteers – The Heart of <span className="text-blue-600">Helping Universe NGO</span>
      </motion.h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {volunteers.map((v, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl overflow-hidden p-5 border-t-4 border-blue-500"
          >
            <img
              src={v.image}
              alt={v.name}
              className="w-24 h-24 rounded-full mx-auto mt-2 border-4 border-blue-300"
            />
            <h2 className="text-xl font-bold text-center mt-4 text-blue-700">{v.name}</h2>
            <p className="text-center text-gray-500">{v.role}</p>
            <p className="text-center text-gray-600 mt-3 text-sm">{v.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">Want to Become a Volunteer?</h2>
        <p className="text-gray-600 mb-5">
          Join our mission to bring positive change in the world. You can help in events, education, and donations.
        </p>
        <a
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all"
        >
          Join Us Now
        </a>
      </div>

      <div className="mt-20 text-center text-gray-500">
        <p>© 2025 Helping Universe NGO | Empowering Lives Together 💙</p>
      </div>
    </div>
  );
};

export default Volunteers;
