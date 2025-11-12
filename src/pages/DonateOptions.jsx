import React from "react";
import { useNavigate } from "react-router-dom";
import "./DonateOptions.css";

const DonateOptions = () => {
  const navigate = useNavigate();

  const donationOptions = [
    {
      name: "🍲 Food Donation",
      path: "/food-donation",
      description: "Donate cooked, uncooked, or leftover food to feed the needy.",
      className: "food-shape",
    },
    {
      name: "📚 Books Donation",
      path: "/books-donation",
      description: "Share knowledge by donating your old books.",
      className: "book-shape",
    },
    {
      name: "👕 Clothes Donation",
      path: "/clothes-donation",
      description: "Help others stay warm with your unused clothes.",
      className: "clothes-shape",
    },
    {
      name: "🎁 Old Things Donation",
      path: "/oldthings-donation",
      description: "Give new life to old toys, furniture, and electronics.",
      className: "oldthings-shape",
    },
    {
      name: "💰 Money Donation",
      path: "/money-donation",
      description: "Support education, health, and hunger programs by donating funds.",
      className: "money-shape",
    },
  ];

  return (
    <div className="donate-options-container">
      <h1>Choose a Donation Type</h1>
      <p>Every act of kindness matters. Select a way to help others.</p>

      <div className="donation-grid">
        {donationOptions.map((option, index) => (
          <div
            key={index}
            className={`donation-card ${option.className}`}
            onClick={() => navigate(option.path)}
          >
            <h2>{option.name}</h2>
            <p>{option.description}</p>
            <button className="donate-btn">Donate Now ➜</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonateOptions;
