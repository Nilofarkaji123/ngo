import React, { useState } from "react";
import "./FoodDonation.css";

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
  };

  return (
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
    </div>
  );
}

export default FoodDonation;
