import React from "react";
import { useParams, Link } from "react-router-dom";

function ThankYou() {
  const { donationId } = useParams();

  return (
    <div className="thankyou-page" style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎉 Thank You for Your Donation!</h1>
      <p>Your generous food donation helps feed someone in need ❤️</p>

      <h3>Donation ID: <span style={{ color: "green" }}>{donationId}</span></h3>

      <div style={{ marginTop: "20px" }}>
        <Link to="/food-tracking">
          <button className="track-btn">Track Your Donation 🚚</button>
        </Link>
        <br /><br />
        <Link to="/">
          <button className="home-btn">Go Back Home 🏠</button>
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
