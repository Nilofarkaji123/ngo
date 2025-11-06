// src/pages/FoodDonation.jsx
import React, { useState } from "react";

function FoodDonation() {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    quality: "",
    bestBefore: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Food donation submitted:", formData);
    alert("Thank you for donating food!");
    setFormData({ foodName: "", quantity: "", quality: "", bestBefore: "" });
  };

  return (
    <div className="food-donation-page">
      <h2>Food Donation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Food Name:
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quality:
          <input
            type="text"
            name="quality"
            value={formData.quality}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Best Before:
          <input
            type="date"
            name="bestBefore"
            value={formData.bestBefore}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Donate Food</button>
      </form>
    </div>
  );
}

export default FoodDonation;
