import React, { useState } from "react";
import "./EventBooking.css"; // create this CSS file (optional)

const EventBooking = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    organizerName: "",
    date: "",
    time: "",
    venue: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Event Booked Successfully!");
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="event-container">
      <h2>🎉 Book Event / Celebration</h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          type="text"
          name="eventName"
          placeholder="e.g. Birthday, Anniversary, Social Activity"
          value={formData.eventName}
          onChange={handleChange}
          required
        />

        <label>Organizer Name</label>
        <input
          type="text"
          name="organizerName"
          placeholder="Enter your name"
          value={formData.organizerName}
          onChange={handleChange}
          required
        />

        <label>Select Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Select Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label>Venue</label>
        <input
          type="text"
          name="venue"
          placeholder="Enter venue / place"
          value={formData.venue}
          onChange={handleChange}
          required
        />

        <label>Contact Number</label>
        <input
          type="tel"
          name="contact"
          placeholder="Enter contact number"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <button type="submit" className="event-btn">Submit</button>
      </form>
    </div>
  );
};

export default EventBooking;
