import React, { useState } from "react";
import "./FoodDonation.css";

<<<<<<< HEAD
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
=======
const ngos = [
  { name: "Helping Hands", location: "Nearby", accepted: false },
  { name: "Bright Future", location: "Nearby", accepted: false },
  { name: "Care & Share", location: "Nearby", accepted: false },
];

const deliveryPartners = ["Zomato", "Swiggy", "Dunzo"];

function FoodDonation() {
  const [foodList, setFoodList] = useState([
    { foodName: "", quantity: "", quality: "Fresh", bestBefore: "" },
  ]);
  const [donations, setDonations] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState("");

  const addFoodItem = () => {
    setFoodList([...foodList, { foodName: "", quantity: "", quality: "Fresh", bestBefore: "" }]);
  };

  const handleChange = (index, e) => {
    const newList = [...foodList];
    newList[index][e.target.name] = e.target.value;
    setFoodList(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    for (let item of foodList) {
      if (!item.foodName || !item.quantity || !item.bestBefore || !item.quality) {
        alert("Please fill all fields for each food item.");
        return;
      }
      if (item.quantity <= 0 || item.quantity > 1000) {
        alert("Quantity must be between 1 and 1000.");
        return;
      }
    }
    
    if (!selectedPartner) {
      alert("Please select a delivery partner.");
      return;
    }

    const newDonation = {
      id: Date.now(),
      items: [...foodList],
      partner: selectedPartner,
      status: "Pending",
      ngo: null,
    };

    setDonations([...donations, newDonation]);
    setFoodList([{ foodName: "", quantity: "", quality: "Fresh", bestBefore: "" }]);
    setSelectedPartner("");
    alert("Food donation submitted!");
  };

  // Simulate NGO acceptance
  const acceptDonation = (donationId, ngoName) => {
    const donationIndex = donations.findIndex(d => d.id === donationId);
    if (donations[donationIndex].status === "Pending") {
      const updatedDonations = [...donations];
      updatedDonations[donationIndex].status = "Accepted";
      updatedDonations[donationIndex].ngo = ngoName;

      // Mark NGO as accepted
      const ngoIndex = ngos.findIndex(n => n.name === ngoName);
      ngos[ngoIndex].accepted = true;

      setDonations(updatedDonations);
    } else {
      alert("Donation already accepted by another NGO.");
    }
  };

  // Simulate delivery progress
  const deliverDonation = (donationId) => {
    const donationIndex = donations.findIndex(d => d.id === donationId);
    const updatedDonations = [...donations];
    if (updatedDonations[donationIndex].status === "Accepted") {
      updatedDonations[donationIndex].status = "In Transit";
      setDonations(updatedDonations);

      // Simulate delivery completion after 5 sec
      setTimeout(() => {
        const updated = [...updatedDonations];
        updated[donationIndex].status = "Delivered";
        setDonations(updated);
      }, 5000);
    } else {
      alert("Donation must be accepted first.");
    }
>>>>>>> 236add8be1fa8e4b91a4ea5fbc854e46e14dbd2e
  };

  // -------------------- RENDER --------------------
  return (
<<<<<<< HEAD
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
=======
    <div className="food-donation-page">
      <h2>Food Donation Form</h2>
      <form onSubmit={handleSubmit}>
        {foodList.map((item, index) => (
          <div key={index} className="food-item">
            <label>
              Food Name:
              <input
                type="text"
                name="foodName"
                value={item.foodName}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleChange(index, e)}
                required
                min={1}
                max={1000}
              />
            </label>
            <label>
              Quality:
              <select
                name="quality"
                value={item.quality}
                onChange={(e) => handleChange(index, e)}
              >
                <option>Fresh</option>
                <option>Good</option>
                <option>Average</option>
              </select>
            </label>
            <label>
              Best Before:
              <input
                type="date"
                name="bestBefore"
                value={item.bestBefore}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
          </div>
        ))}

        <button type="button" onClick={addFoodItem}>Add Another Food Item</button>

        <label>
          Delivery Partner:
          <select value={selectedPartner} onChange={(e) => setSelectedPartner(e.target.value)} required>
            <option value="">Select Partner</option>
            {deliveryPartners.map((p, i) => <option key={i}>{p}</option>)}
          </select>
        </label>

        <button type="submit">Donate Food</button>
      </form>

      {/* Donations Status */}
      <div className="donations-status">
        <h3>Donation Status</h3>
        {donations.map((d) => (
          <div key={d.id} className="donation-card">
            <p><strong>Partner:</strong> {d.partner}</p>
            <p><strong>Status:</strong> {d.status} {d.ngo && `(Accepted by ${d.ngo})`}</p>
            <ul>
              {d.items.map((item, i) => <li key={i}>{item.foodName} - {item.quantity} units ({item.quality})</li>)}
            </ul>
            <div>
              {d.status === "Pending" && ngos.filter(n => !n.accepted).map(n => (
                <button key={n.name} onClick={() => acceptDonation(d.id, n.name)}>Accept by {n.name}</button>
              ))}
              {d.status === "Accepted" && <button onClick={() => deliverDonation(d.id)}>Start Delivery</button>}
            </div>
          </div>
        ))}
      </div>
>>>>>>> 236add8be1fa8e4b91a4ea5fbc854e46e14dbd2e
    </div>
  );
}

export default FoodDonation;
