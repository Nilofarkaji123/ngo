import React, { useState } from "react";
import "./EventSupport.css";

const EventSupport = () => {
  const [data, setData] = useState({
    eventType: "",
    organizer: "",
    ngoName: "",
    date: "",
    time: "",
    venue: "",
    contact: "",
  });

  const ngos = [
    "Jeevan Asha Foundation",
    "Anand Children Care",
    "Smiles NGO",
    "Helping Hands Trust"
  ];

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Celebration Event Booked Successfully!");
    console.log("Booking Details:", data);
  };

  return (
    <div className="event-support-container">
      <h2>🎉 Event & Celebration Support</h2>
      <p>Support birthday parties, celebrations, and special events for children.</p>

      <form onSubmit={handleSubmit} className="event-support-form">

        <label>Event Type</label>
        <input
          type="text"
          name="eventType"
          placeholder="Birthday / Festival / Celebration"
          value={data.eventType}
          onChange={handleChange}
          required
        />

        <label>Your Name</label>
        <input
          type="text"
          name="organizer"
          placeholder="Enter your name"
          value={data.organizer}
          onChange={handleChange}
          required
        />

        <label>Select NGO</label>
        <select
          name="ngoName"
          value={data.ngoName}
          onChange={handleChange}
          required
        >
          <option value="">-- Select NGO --</option>
          {ngos.map((ngo, index) => (
            <option key={index} value={ngo}>{ngo}</option>
          ))}
        </select>

        <label>Date</label>
        <input type="date" name="date" value={data.date} onChange={handleChange} required />

        <label>Time</label>
        <input type="time" name="time" value={data.time} onChange={handleChange} required />

        <label>Venue</label>
        <input
          type="text"
          name="venue"
          placeholder="Enter event venue"
          value={data.venue}
          onChange={handleChange}
          required
        />

        <label>Contact Number</label>
        <input
          type="tel"
          name="contact"
          placeholder="Enter your contact number"
          value={data.contact}
          onChange={handleChange}
          required
        />

        <button type="submit" className="book-btn">Book Event</button>
      </form>
    </div>
  );
};

export default EventSupport;
