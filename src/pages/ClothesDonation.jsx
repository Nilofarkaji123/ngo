import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClothesDonation.css";

const ClothesDonation = () => {
  const [form, setForm] = useState({
    donorName: "",
    city: "",
    ngoName: "",
    quantity: "",
    clothCondition: "",
    pickupAddress: "",
    pickupDate: "",
    contactNumber: "",
    message: "",
  });

  const [ngos, setNgos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Fetch NGOs by selected city
  useEffect(() => {
    if (form.city) {
      axios
        .get(`http://localhost:8082/ngo/get-ngos?city=${form.city}`)
        .then((res) => {
          if (res.data.status === "success") {
            setNgos(res.data.ngos);
          } else {
            setNgos([]);
          }
        })
        .catch((err) => console.error("Error fetching NGOs:", err));
    } else {
      setNgos([]);
    }
  }, [form.city]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.city || !form.ngoName) {
      alert("Please select both City and NGO Name");
      return;
    }

    try {
      await axios.post("http://localhost:8082/ngo/clothes-donation", form, {
        headers: { "Content-Type": "application/json" },
      });

      setSubmitted(true);
      setForm({
        donorName: "",
        city: "",
        ngoName: "",
        quantity: "",
        clothCondition: "",
        pickupAddress: "",
        pickupDate: "",
        contactNumber: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting donation:", err);
      alert("Failed to submit donation. Please try again later.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="clothes-donation-bg">
      <div className="clothes-donation-card">
        <h2 className="form-title">👕 Clothes Donation</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <label>Donor Name:</label>
              <input
                type="text"
                name="donorName"
                value={form.donorName}
                onChange={handleChange}
                required
              />

              <label>City:</label>
              <select name="city" value={form.city} onChange={handleChange} required>
                <option value="">Select City</option>
                <option value="Nashik">Nashik</option>
                <option value="Sinnar">Sinnar</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>

              <label>NGO Name:</label>
              <select
                name="ngoName"
                value={form.ngoName}
                onChange={handleChange}
                required
                disabled={!form.city}
              >
                <option value="">{form.city ? "Select NGO" : "Select City First"}</option>
                {ngos.map((ngo, i) => (
                  <option key={i} value={ngo.name}>
                    {ngo.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-section">
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
                name="clothCondition"
                value={form.clothCondition}
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
                placeholder="Full pickup location"
                required
              />

              <label>Preferred Pickup Date:</label>
              <input
                type="date"
                name="pickupDate"
                value={form.pickupDate}
                min={today}
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

              <label>Message (Optional):</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Any special instructions"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Donate Clothes 💝
              </button>
            </div>
          </form>
        ) : (
          <div className="thank-you">
            <h3>🎉 Thank You for Your Kindness!</h3>
            <p>Your donation will help children in need.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothesDonation;
