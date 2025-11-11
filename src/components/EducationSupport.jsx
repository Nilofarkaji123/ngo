import React, { useState } from "react";
import "./EventSupport.css";

const EventSupport = () => {
  const [ngoName, setNgoName] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");

  const ngoList = [
    "Smile Foundation",
    "Helping Hands NGO",
    "Care & Share Trust",
    "Sunrise Children Home",
  ];

  const submitBooking = (e) => {
    e.preventDefault();
    if (!ngoName || !eventType || !date) {
      alert("Please fill all details!");
      return;
    }
    alert(
      `🎉 Celebration Booked Successfully! \nNGO: ${ngoName}\nEvent: ${eventType}\nDate: ${date}`
    );
  };

  return (
    <div className="event-support-container">
      <h1>🎉 Event Celebration Support</h1>
      <p className="subtitle">
        Support birthday parties, celebrations, and special events for children.
      </p>

      <form className="event-form" onSubmit={submitBooking}>
        {/* Select NGO */}
        <label>Choose NGO to Celebrate With:</label>
        <select value={ngoName} onChange={(e) => setNgoName(e.target.value)}>
          <option value="">-- Select NGO --</option>
          {ngoList.map((ngo, index) => (
            <option key={index} value={ngo}>
              {ngo}
            </option>
          ))}
        </select>

        {/* Select Event Type */}
        <label>Select Celebration Type:</label>
        <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="">-- Choose Event --</option>
          <option value="Birthday Celebration">Birthday Celebration 🎂</option>
          <option value="Festival Celebration">Festival Celebration 🎊</option>
          <option value="Achievement Party">Achievement Party 🏅</option>
        </select>

        {/* Calendar */}
        <label>Select Celebration Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <button type="submit">Book Celebration</button>
      </form>
    </div>
  );
};

export default EventSupport;
