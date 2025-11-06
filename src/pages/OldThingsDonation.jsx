import React, { useState } from "react";
import "./DonationForm.css";

const OldThingsDonation = () => {
  const [form, setForm] = useState({
    donorName: "",
    ngoName: "",
    itemType: "",
    quantity: "",
    condition: "",
    pickupAddress: "",
    pickupDate: "",
    contactNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎁 Old things donation request submitted successfully!");
    console.log("Old Things Donation Data:", form);
  };

  return (
    <div className="donation-container oldthings-bg">
      <h1>🎁 Old Things Donation</h1>
      <p>Give your old belongings a new purpose — donate and spread smiles 💖</p>

      <form className="donation-form" onSubmit={handleSubmit}>
        <label>Donor Name:</label>
        <input
          type="text"
          name="donorName"
          value={form.donorName}
          onChange={handleChange}
          required
        />

        <label>NGO Name:</label>
        <input
          type="text"
          name="ngoName"
          value={form.ngoName}
          onChange={handleChange}
          required
        />

        <label>Item Type:</label>
        <select name="itemType" value={form.itemType} onChange={handleChange} required>
          <option value="">Select Item</option>
          <option value="Books">📚 Books</option>
          <option value="Toys">🧸 Toys</option>
          <option value="Furniture">🪑 Furniture</option>
          <option value="Electronics">💻 Electronics</option>
          <option value="Others">Other Items</option>
        </select>

        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <label>Condition:</label>
        <select name="condition" value={form.condition} onChange={handleChange} required>
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Good">Good</option>
          <option value="Usable">Usable</option>
          <option value="Needs Repair">Needs Repair</option>
        </select>

        <label>Pickup Address:</label>
        <textarea
          name="pickupAddress"
          value={form.pickupAddress}
          onChange={handleChange}
          placeholder="Enter pickup location"
          required
        ></textarea>

        <label>Preferred Pickup Date:</label>
        <input
          type="date"
          name="pickupDate"
          value={form.pickupDate}
          onChange={handleChange}
          required
        />

        <label>Contact Number:</label>
        <input
          type="tel"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />

        <label>Message (optional):</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Any special notes or instructions?"
        ></textarea>

        <button type="submit">Donate Old Items 🎁</button>
      </form>
    </div>
  );
};

export default OldThingsDonation;
