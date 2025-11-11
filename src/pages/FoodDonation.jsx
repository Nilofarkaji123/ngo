import React, { useState } from "react";
import "./FoodDonation.css";

const FoodDonation = () => {
  const [donationType, setDonationType] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [items, setItems] = useState([{ foodName: "", quantity: "", bestBefore: "" }]);
  const [submitted, setSubmitted] = useState(false);

  const handleTypeSelect = (type) => {
    setDonationType(type);
    setSubmitted(false);
    setNgoName("");
    setItems([{ foodName: "", quantity: "", bestBefore: "" }]);
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setItems((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  const addItem = () => setItems([...items, { foodName: "", quantity: "", bestBefore: "" }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

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
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
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

  return (
    <div className="food-donation-container">
      <h2 className="title">🍱 Food Donation</h2>
      <div className="donation-type-buttons">
        <button onClick={() => handleTypeSelect("Ready-made Packed")}>
          Ready-made Packed
        </button>
        <button onClick={() => handleTypeSelect("Uncooked (Grains, Pulses, Oil)")}>
          Uncooked
        </button>
        <button onClick={() => handleTypeSelect("Remaining Food (Hotels/Functions)")}>
          Remaining Food
        </button>
      </div>

      {donationType && !submitted && (
        <form className="food-donation-form" onSubmit={handleSubmit}>
          <label>
            NGO Name:
            <input
              type="text"
              placeholder="Enter NGO Name"
              value={ngoName}
              onChange={(e) => setNgoName(e.target.value)}
              required
            />
          </label>

          {items.map((item, index) => (
            <div key={index} className="food-item">
              <label>
                Food Name:
                <input
                  type="text"
                  name="foodName"
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
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
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
                <button type="button" onClick={() => removeItem(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addItem}>
            + Add Another Item
          </button>
          <button type="submit">Submit Donation</button>
        </form>
      )}

      {submitted && (
        <div className="thank-you">
          <h3>✅ Donation Submitted Successfully!</h3>
          <p>Thank you for your generous food donation.</p>
        </div>
      )}
    </div>
  );
};

export default FoodDonation;
