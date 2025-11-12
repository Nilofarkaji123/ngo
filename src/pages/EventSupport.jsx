import React, { useState } from "react";
import "./EventSupport.css";
import { useNavigate } from "react-router-dom";

const EventSupport = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    eventType: "",
    otherReason: "",
    organizer: "",
    ngoName: "",
    date: "",
    hour: "",
    minute: "",
    ampm: "",
    location: "",
    otherLocation: "",
    contact: "",
  });

  const ngos = [
    "Jeevan Asha Foundation",
    "Anand Children Care",
    "Smiles NGO",
    "Helping Hands Trust"
  ];

  const eventTypes = [
    "Birthday Celebration",
    "Children's Day Celebration",
    "Festival Celebration",
    "Motivational Program",
    "Success Party",
    "Social Gathering",
    "Other"
  ];

  const locations = [
    "NGO Hall",
    "Children Activity Room",
    "Open Ground Area",
    "Dining / Serving Area",
    "Other Location"
  ];

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTime = `${data.hour}:${data.minute} ${data.ampm}`;

    console.log("Submitted Data:", { ...data, finalTime });

    // ✅ Redirect to Thank You page
    navigate("/thank-you");
  };

  return (
    <div className="event-support-container">
      <h2>🎉 Celebration / Event Booking</h2>

      <form className="event-support-form" onSubmit={handleSubmit}>
        
        <label>Event Type</label>
        <select name="eventType" onChange={handleChange} required>
          <option value="">-- Select Event Type --</option>
          {eventTypes.map((event, i) => (
            <option key={i} value={event}>{event}</option>
          ))}
        </select>

        {data.eventType === "Other" && (
          <>
            <label>Reason / Purpose</label>
            <textarea
              name="otherReason"
              onChange={handleChange}
              placeholder="Describe purpose..."
              required
            />
          </>
        )}

        <label>Your Name</label>
        <input
          type="text"
          name="organizer"
          placeholder="Enter your name"
          onChange={handleChange}
          required
        />

        <label>Select NGO</label>
        <select name="ngoName" onChange={handleChange} required>
          <option value="">-- Select NGO --</option>
          {ngos.map((ngo, i) => (
            <option key={i} value={ngo}>{ngo}</option>
          ))}
        </select>

        <label>Event Date</label>
        <input type="date" min={getMinDate()} name="date" onChange={handleChange} required />

        <label>Event Time</label>
        <div className="time-row">
          <select name="hour" onChange={handleChange} required>
            <option value="">HH</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={String(i + 1).padStart(2, "0")}>{i + 1}</option>
            ))}
          </select>

          <select name="minute" onChange={handleChange} required>
            <option value="">MM</option>
            {["00", "15", "30", "45"].map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>

          <select name="ampm" onChange={handleChange} required>
            <option value="">AM / PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <label>Celebration Area</label>
        <select name="location" onChange={handleChange} required>
          <option value="">-- Select Area --</option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>{loc}</option>
          ))}
        </select>

        {data.location === "Other Location" && (
          <input
            type="text"
            name="otherLocation"
            placeholder="Enter full address"
            onChange={handleChange}
            required
          />
        )}

        <label>Contact Number</label>
        <input type="tel" name="contact" maxLength="10" onChange={handleChange} required />

        <button type="submit" className="book-btn">Book Event</button>
      </form>
    </div>
  );
};

export default EventSupport;
