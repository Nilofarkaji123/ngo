import React, { useState } from "react";
import "./DonationForm.css";

const ClothesDonation = () => {
  const [form, setForm] = useState({
    donorName: "",
    ngoName: "",
    quantity: "",
    condition: "",
    pickupAddress: "",
    pickupDate: "",
    contactNumber: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (connect to Java backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8082/ngo/clothesDonation",
 {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(form).toString(),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("👕 Clothes donation request submitted successfully!");
        console.log("Clothes Donation Data:", form);

        // Reset form after successful submission
        setForm({
          donorName: "",
          ngoName: "",
          quantity: "",
          condition: "",
          pickupAddress: "",
          pickupDate: "",
          contactNumber: "",
          message: "",
        });
      } else {
        alert("❌ Failed to submit donation. Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Server not reachable! Please start your Tomcat server.");
    }
  };

  return (
    <div className="donation-container clothes-bg">
      <h1>👕 Clothes Donation</h1>
      <p>Give your pre-loved clothes a second life — donate and spread warmth 💖</p>

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

        <label>Quantity of Clothes:</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <label>Condition of Clothes:</label>
        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          required
        >
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Gently Used">Gently Used</option>
          <option value="Good">Good</option>
        </select>

        <label>Pickup Address:</label>
        <textarea
          name="pickupAddress"
          value={form.pickupAddress}
          onChange={handleChange}
          placeholder="Enter full pickup location"
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

        <button type="submit">Donate Clothes 💝</button>
      </form>
    </div>
  );
};


export default ClothesDonation;
