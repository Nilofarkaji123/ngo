import React from "react";

const Donation = () => {
  return (
    <div className="donation">
      <h2>Support Our Cause</h2>
      <p>
        Donate food, clothes, books, money, or support children’s education.
      </p>
      <button onClick={() => alert("Donation functionality coming soon!")}>
        Donate Now
      </button>
    </div>
  );
};

export default Donation;
