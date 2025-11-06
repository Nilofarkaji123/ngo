import React, { useState } from "react";
import "./CelebrationBooking.css";

const OccasionBooking = () => {
  const [form, setForm] = useState({
    ngoName: "",
    occasionType: "",
    date: "",
    time: "",
    location: "",
    noOfPeople: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎊 Occasion celebration booking submitted successfully!");
    console.log("Occasion Booking:", form);
  };

  return (
    <div className="celebration-booking-container occasion-bg">
      <h1>🎊 Other Occasion Celebration Booking</h1>
      <p>Celebrate your special occasions by sharing happiness with others 🌈</p>

      <form className="celebration-form" onSubmit={handleSubmit}>
        <label>NGO Name:</label>
        <input
          type="text"
          name="ngoName"
          value={form.ngoName}
          onChange={handleChange}
          required
        />

        <label>Occasion Type:</label>
        <input
          type="text"
          name="occasionType"
          value={form.occasionType}
          onChange={handleChange}
          placeholder="e.g., Anniversary, Festival, Success Party"
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />

        <label>Celebration Location:</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Enter full address"
          required
        />

        <label>Number of People:</label>
        <input
          type="number"
          name="noOfPeople"
          value={form.noOfPeople}
          onChange={handleChange}
          min="1"
          required
        />

        <label>Special Message:</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message for this occasion..."
        ></textarea>

        <button type="submit">Submit Booking 🎁</button>
      </form>
    </div>
  );
};

export default OccasionBooking;
