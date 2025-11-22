import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MedicalSupport.css";

const MedicalSupport = () => {
  const [city, setCity] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [ngos, setNgos] = useState([]);
  const [supportType, setSupportType] = useState("");
  const [donorName, setDonorName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Fetch NGOs by city
  useEffect(() => {
    if (city) {
      axios
        .get(`http://localhost:8082/ngo/get-ngos?city=${city}`)
        .then((res) => setNgos(res.data.ngos || []))
        .catch((err) => console.error(err));
    } else {
      setNgos([]);
    }
  }, [city]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !ngoName || !donorName || !supportType || !quantity) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await axios.post(
  "http://localhost:8082/ngo/add-medical-support",
  {
    city,
    ngo_name: ngoName,
    donor_name: donorName,
    support_type: supportType,
    quantity: parseInt(quantity),
    details,
  },
  { headers: { "Content-Type": "application/json" } }
);


      setSubmitted(true);
      setCity("");
      setNgoName("");
      setDonorName("");
      setSupportType("");
      setQuantity("");
      setDetails("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit support!");
    }
  };

  return (
    <div className="medical-support-bg">
      <div className="medical-support-card">
        <h2>🩺 Medical Support Donation</h2>
        <p>Help provide essential medical aid to those in need.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label>Donor Name:</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label>City:</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} required>
              <option value="">Select City</option>
              <option value="Nashik">Nashik</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>

            <label>NGO Name:</label>
            <select value={ngoName} onChange={(e) => setNgoName(e.target.value)} required disabled={!city}>
              <option value="">{city ? "Select NGO" : "Select City First"}</option>
              {ngos.map((ngo) => (
                <option key={ngo.id} value={ngo.name}>{ngo.name}</option>
              ))}
            </select>

            <label>Support Type:</label>
            <select value={supportType} onChange={(e) => setSupportType(e.target.value)} required>
              <option value="">Select Support</option>
              <option value="medicine">💊 Medicine Donation</option>
              <option value="equipment">🩺 Equipment Donation</option>
              <option value="blood">🩸 Blood Donation</option>
              <option value="money">💰 Financial Help</option>
            </select>

            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              placeholder="Enter quantity / units"
              required
            />

            <label>Details:</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Additional details or instructions (optional)"
            />

            <button type="submit" className="submit-btn">Submit Support</button>
          </form>
        ) : (
          <div className="thank-you">
            <h3>🎉 Thank You!</h3>
            <p>Your medical support will help save lives.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalSupport;
