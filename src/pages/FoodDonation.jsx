import React, { useState } from "react";
import "./FoodDonation.css";

const FoodDonation = () => {
  const [ngoName, setNgoName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Donation Submitted ✅\n\nNGO: ${ngoName}\nFood: ${foodName}\nQuantity: ${quantity}`);
  };

  return (
    <div className="food-donation-container">
      <h2 className="title">🍱 Simple Food Donation</h2>

      <form className="food-donation-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>NGO / Organization Name</label>
          <input
            type="text"
            value={ngoName}
            onChange={(e) => setNgoName(e.target.value)}
            placeholder="Enter NGO name"
            required
          />
        </div>

        <div className="form-group">
          <label>Food Name</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food name"
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit Donation</button>
      </form>
    </div>
  );
};

export default FoodDonation;
