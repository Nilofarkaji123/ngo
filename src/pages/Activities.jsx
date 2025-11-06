import React from "react";
import "./Activities.css";

const activities = [
  {
    title: "🍱 Food Donation Drives",
    image: "/images/food-donation.jpg",
    description:
      "Providing nutritious meals to underprivileged children, homeless individuals, and families in need across multiple cities.",
  },
  {
    title: "📚 Education for All",
    image: "/images/education.jpg",
    description:
      "Empowering children through free education, stationery support, and mentorship programs to build a brighter future.",
  },
  {
    title: "🏥 Medical Assistance Camps",
    image: "/images/medical-help.jpg",
    description:
      "Organizing health checkups, blood donation camps, and providing medicines to rural and urban poor communities.",
  },
  {
    title: "🌳 Environment & Cleanliness",
    image: "/images/clean-drive.jpg",
    description:
      "Conducting tree plantation drives and cleanliness campaigns to promote sustainable living and eco-awareness.",
  },
  {
    title: "🎂 Celebration with Kids",
    image: "/images/children-smile.jpg",
    description:
      "Celebrate birthdays and special days with orphanage children — bring joy and smiles through your small efforts!",
  },
];

function Activities() {
  return (
    <div className="activities-container">
      <h1 className="page-title">🌟 Our Activities 🌟</h1>
      <p className="page-subtitle">
        We believe in creating a world full of kindness, care, and opportunity.  
        Here's how *Helping Universe NGO* is making a difference every day.
      </p>

      <div className="activities-grid">
        {activities.map((activity, index) => (
          <div key={index} className="activity-card">
            <img src={activity.image} alt={activity.title} />
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>

      <div className="join-section">
        <h2>💖 Want to Be Part of the Change?</h2>
        <p>
          Join our movement to make the world a better place.  
          Donate, Volunteer, or Celebrate with us — every effort matters!
        </p>
        <div className="join-buttons">
          <button onClick={() => (window.location.href = "/donate-options")}>
            Donate Now
          </button>
          <button onClick={() => (window.location.href = "/register")}>
            Become a Volunteer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Activities;
