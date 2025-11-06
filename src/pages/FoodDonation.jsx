import React, { useState } from "react";
import FoodTracking from "../components/FoodTracking";
import "./FoodDonation.css";

const FoodDonation = () => {
  const [donationType, setDonationType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [ngoName, setNgoName] = useState("");
  const [items, setItems] = useState([
    { foodName: "", quantity: "", bestBefore: "" },
  ]);

  const handleTypeSelect = (type) => {
    setDonationType(type);
    setSubmitted(false);
    setNgoName("");
    setItems([{ foodName: "", quantity: "", bestBefore: "" }]);
  };

  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { foodName: "", quantity: "", bestBefore: "" }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ngoName) {
      alert("Please enter NGO Name");
      return;
    }

    for (let item of items) {
      if (!item.foodName || !item.quantity || !item.bestBefore) {
        alert("All food item fields are required");
        return;
      }
      const quantity = Number(item.quantity);
      if (isNaN(quantity) || quantity <= 0) {
        alert("Quantity must be positive number");
        return;
      }
      const today = new Date();
      const bestBefore = new Date(item.bestBefore);
      if (bestBefore < today) {
        alert("Best Before date must be today or later");
        return;
      }

      // Type-specific validations
      if (donationType === "Ready-made Packed" && quantity > 50) {
        alert("Ready-made packed food cannot exceed 50 kg.");
        return;
      }
      if (donationType === "Uncooked (Grains, Pulses, Oil)" && (quantity < 1 || quantity > 100)) {
        alert("Uncooked food must be between 1 kg and 100 kg.");
        return;
      }
      if (donationType === "Remaining Food (Hotels/Functions)" && quantity > 20) {
        alert("Remaining food donation cannot exceed 20 kg per pickup.");
        return;
      }
    }

    setSubmitted(true);
    console.log("Donation Submitted:", { ngoName, donationType, items });
  };

  return (
    <div className="food-donation-container">
      <h2>Food Donation</h2>
      <div className="donation-type-buttons">
        <button onClick={() => handleTypeSelect("Ready-made Packed")}>Ready-made Packed</button>
        <button onClick={() => handleTypeSelect("Uncooked (Grains, Pulses, Oil)")}>Uncooked</button>
        <button onClick={() => handleTypeSelect("Remaining Food (Hotels/Functions)")}>Remaining Food</button>
      </div>

      {donationType && !submitted && (
        <form className="food-donation-form" onSubmit={handleSubmit}>
          <label>
            NGO Name:
            <input
              type="text"
              value={ngoName}
              onChange={(e) => setNgoName(e.target.value)}
              required
            />
          </label>

          {items.map((item, index) => (
            <div key={index} className="food-item">
              <h4>Item {index + 1}</h4>
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
                <button type="button" onClick={() => removeItem(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addItem}>Add Another Item</button>
          <button type="submit">Submit Donation</button>
        </form>
      )}

      {submitted && (
        <div className="tracking-section">
          <h3>Track Your Food Donation</h3>
          <FoodTracking type={donationType} items={items} />
        </div>
      )}
    </div>
  );
};

export default FoodDonation;
