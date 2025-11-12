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
    email: "",
  });

  const [errors, setErrors] = useState({});

  const ngos = [
    "Jeevan Asha Foundation",
    "Anand Children Care",
    "Smiles NGO",
    "Helping Hands Trust",
    "Hope for Children"
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

  const validate = () => {
    const errs = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.organizer.trim() || !nameRegex.test(data.organizer))
      errs.organizer = "Enter a valid name (letters only).";

    if (!phoneRegex.test(data.contact))
      errs.contact = "Enter a valid 10-digit contact number.";

    if (!emailRegex.test(data.email))
      errs.email = "Enter a valid email address.";

    if (!data.eventType) errs.eventType = "Select an event type.";
    if (!data.ngoName) errs.ngoName = "Select an NGO.";
    if (!data.date) errs.date = "Choose a valid event date.";
    if (!data.hour || !data.minute || !data.ampm)
      errs.time = "Complete event time selection.";
    if (!data.location) errs.location = "Select a celebration area.";

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const finalTime = `${data.hour}:${data.minute} ${data.ampm}`;

    console.log("🎉 Event Booking Submitted:", { ...data, finalTime });
    alert("✅ Event booking successful!");
    navigate("/thank-you");
  };

  return (
    <div className="event-support-container">
      <h2>🎉 Celebration / Event Booking</h2>
      <p className="subtitle">
        Plan your special moments with us — celebrate with purpose and bring smiles to children’s lives!
      </p>

      <form className="event-support-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Type</label>
          <select name="eventType" onChange={handleChange} value={data.eventType} required>
            <option value="">-- Select Event Type --</option>
            {eventTypes.map((event, i) => (
              <option key={i} value={event}>{event}</option>
            ))}
          </select>
          {errors.eventType && <span className="error">{errors.eventType}</span>}
        </div>

        {data.eventType === "Other" && (
          <div className="form-group">
            <label>Reason / Purpose</label>
            <textarea
              name="otherReason"
              onChange={handleChange}
              placeholder="Describe purpose..."
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="organizer"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
          {errors.organizer && <span className="error">{errors.organizer}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Select NGO</label>
          <select name="ngoName" onChange={handleChange} required>
            <option value="">-- Select NGO --</option>
            {ngos.map((ngo, i) => (
              <option key={i} value={ngo}>{ngo}</option>
            ))}
          </select>
          {errors.ngoName && <span className="error">{errors.ngoName}</span>}
        </div>

        <div className="form-group">
          <label>Event Date</label>
          <input type="date" min={getMinDate()} name="date" onChange={handleChange} required />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="form-group">
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
          {errors.time && <span className="error">{errors.time}</span>}
        </div>

        <div className="form-group">
          <label>Celebration Area</label>
          <select name="location" onChange={handleChange} required>
            <option value="">-- Select Area --</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        {data.location === "Other Location" && (
          <input
            type="text"
            name="otherLocation"
            placeholder="Enter full address"
            onChange={handleChange}
            required
          />
        )}

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contact"
            maxLength="10"
            placeholder="Enter 10-digit mobile number"
            onChange={handleChange}
            required
          />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </div>

        <button type="submit" className="book-btn">📅 Book Event</button>
      </form>
    </div>
  );
};

export default EventSupport;
