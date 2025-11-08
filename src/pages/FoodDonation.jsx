import React, { useState } from "react";
import FoodTracking from "../components/FoodTracking";
import "./FoodDonation.css";

const FoodDonation = () => {
  // -------------------- STATE --------------------
  const [donationType, setDonationType] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [items, setItems] = useState([{ foodName: "", quantity: "", bestBefore: "" }]);
  const [submitted, setSubmitted] = useState(false);

  // -------------------- HANDLERS --------------------
  // Select donation type
  const handleTypeSelect = (type) => {
    setDonationType(type);
    setSubmitted(false);
    setNgoName("");
    setItems([{ foodName: "", quantity: "", bestBefore: "" }]);
  };

  // Handle dynamic food item input change
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setItems((prevItems) => {
      const updated = [...prevItems];
      updated[index][name] = value;
      return updated;
    });
  };

  // Add or remove food items
  const addItem = () => setItems([...items, { foodName: "", quantity: "", bestBefore: "" }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  // -------------------- VALIDATION --------------------
  const validateForm = () => {
    if (!ngoName.trim()) {
      alert("Please enter the NGO Name.");
      return false;
    }

    const today = new Date();
    for (const [i, item] of items.entries()) {
      const { foodName, quantity, bestBefore } = item;

      if (!foodName.trim() || !quantity || !bestBefore) {
        alert(`All fields are required for item ${i + 1}.`);
        return false;
      }

      const qty = Number(quantity);
      if (isNaN(qty) || qty <= 0) {
        alert(`Quantity must be a positive number for item ${i + 1}.`);
        return false;
      }

      const bestBeforeDate = new Date(bestBefore);
      if (bestBeforeDate < today.setHours(0, 0, 0, 0)) {
        alert(`Best Before date must be today or later for item ${i + 1}.`);
        return false;
      }

      // Type-specific validation
      if (donationType === "Ready-made Packed" && qty > 50) {
        alert(`Ready-made packed food cannot exceed 50 kg for item ${i + 1}.`);
        return false;
      }
      if (donationType === "Uncooked (Grains, Pulses, Oil)" && (qty < 1 || qty > 100)) {
        alert(`Uncooked food must be between 1 kg and 100 kg for item ${i + 1}.`);
        return false;
      }
      if (donationType === "Remaining Food (Hotels/Functions)" && qty > 20) {
        alert(`Remaining food donation cannot exceed 20 kg per pickup for item ${i + 1}.`);
        return false;
      }
    }

    return true;
  };

  // -------------------- SUBMIT --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // ✅ Correct fetch setup for JSON to Java Servlet
      const res = await fetch("http://localhost:8082/ngo/api/food-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ngoName, donationType, items }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      alert(data.message);

      if (data.message.toLowerCase().includes("success")) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while registering. Please try again.");
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div className="food-donation-container">
      <h2 className="title">🍱 Food Donation</h2>

      {/* ---------- Step 1: Select Donation Type ---------- */}
      <div className="donation-type-buttons">
        <button
          className={donationType === "Ready-made Packed" ? "active" : ""}
          onClick={() => handleTypeSelect("Ready-made Packed")}
        >
          Ready-made Packed
        </button>

        <button
          className={donationType === "Uncooked (Grains, Pulses, Oil)" ? "active" : ""}
          onClick={() => handleTypeSelect("Uncooked (Grains, Pulses, Oil)")}
        >
          Uncooked
        </button>

        <button
          className={donationType === "Remaining Food (Hotels/Functions)" ? "active" : ""}
          onClick={() => handleTypeSelect("Remaining Food (Hotels/Functions)")}
        >
          Remaining Food
        </button>
      </div>

      {/* ---------- Step 2: Donation Form ---------- */}
      {donationType && !submitted && (
        <form className="food-donation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>NGO Name:</label>
            <input
              type="text"
              placeholder="Enter NGO Name"
              value={ngoName}
              onChange={(e) => setNgoName(e.target.value)}
              required
            />
          </div>

          {items.map((item, index) => (
            <div key={index} className="food-item">
              <h4>🍽️ Item {index + 1}</h4>

              <label>
                Food Name:
                <input
                  type="text"
                  name="foodName"
                  placeholder="e.g. Rice, Chapati"
                  value={item.foodName}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
              </label>

              <label>
                Quantity (kg):
                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity in kg"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  min="1"
                  required
                />
              </label>

              <label>
                Best Before:
                <input
                  type="date"
                  name="bestBefore"
                  value={item.bestBefore}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
              </label>

              {items.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <div className="form-actions">
            <button type="button" onClick={addItem} className="add-btn">
              + Add Another Item
            </button>
            <button type="submit" className="submit-btn">
              Submit Donation
            </button>
          </div>
        </form>
      )}

      {/* ---------- Step 3: Tracking ---------- */}
      {submitted && (
        <div className="tracking-section">
          <h3>✅ Donation Submitted Successfully!</h3>
          <p>Thank you for your contribution to our cause.</p>
          <FoodTracking type={donationType} items={items} />
          <button className="back-btn" onClick={() => setDonationType("")}>
            Donate Again
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodDonation;
