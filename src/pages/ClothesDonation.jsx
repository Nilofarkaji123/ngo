import React, { useState, useEffect } from "react";
import "./ClothesDonation.css";

const ClothesDonation = () => {
  const [form, setForm] = useState({
    donorName: "",
    ngoId: "",
    quantity: "",
    condition: "",
    ageGroup: "",
    gender: "",
    pickupAddress: "",
    pickupDate: "",
    contactNumber: "",
    message: "",
    image: null,
  });

  const [nearbyNgos, setNearbyNgos] = useState([]);

  // Sample NGO data with coordinates
  const ngos = [
    { id: 1, name: "Jeevan Asha Foundation", lat: 19.081, lng: 72.882 },
    { id: 2, name: "Anand Children Care", lat: 19.078, lng: 72.88 },
    { id: 3, name: "Smiles NGO", lat: 19.079, lng: 72.879 },
    { id: 4, name: "Helping Hands Trust", lat: 19.075, lng: 72.885 },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // Sort NGOs by distance
          const sortedNgos = ngos
            .map((ngo) => ({
              ...ngo,
              distance: Math.sqrt((latitude - ngo.lat) ** 2 + (longitude - ngo.lng) ** 2),
            }))
            .sort((a, b) => a.distance - b.distance);

          setNearbyNgos(sortedNgos);
        },
        () => setNearbyNgos(ngos) // fallback
      );
    } else {
      setNearbyNgos(ngos);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8082/ngo/clothesDonation", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(form).toString(),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("👕 Clothes donation request submitted successfully!");
        console.log("Clothes Donation Data:", form);

        setForm({
          donorName: "",
          ngoId: "",
          quantity: "",
          condition: "",
          ageGroup: "",
          gender: "",
          pickupAddress: "",
          pickupDate: "",
          contactNumber: "",
          message: "",
          image: null,
        });
      } else {
        alert("❌ Failed to submit donation. Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Server not reachable! Please start your Tomcat server.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="donation-container">
      <h1>👕 Clothes Donation</h1>
      <p>Donate clothes for children and young adults 💖</p>

      <form className="donation-form" onSubmit={handleSubmit}>
        <label>Donor Name:</label>
        <input
          type="text"
          name="donorName"
          value={form.donorName}
          onChange={handleChange}
          required
        />

        <label>Select NGO (Nearby NGOs first):</label>
        <select name="ngoId" value={form.ngoId} onChange={handleChange} required>
          <option value="">-- Select NGO --</option>
          {nearbyNgos.map((ngo) => (
            <option key={ngo.id} value={ngo.id}>
              {ngo.name} {ngo.distance ? `(~${ngo.distance.toFixed(2)})` : ""}
            </option>
          ))}
        </select>

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
        <select name="condition" value={form.condition} onChange={handleChange} required>
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Gently Used">Gently Used</option>
          <option value="Good">Good</option>
        </select>

        <label>Recipient Age Group:</label>
        <select name="ageGroup" value={form.ageGroup} onChange={handleChange} required>
          <option value="">Select Age Group</option>
          <option value="1-8">1-8 years</option>
          <option value="9-12">9-12 years</option>
          <option value="13-17">13-17 years</option>
          <option value="18-22">18-22 years</option>
        </select>

        <label>Recipient Gender:</label>
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Both">Both</option>
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

        <label>Upload Image of Clothes (optional):</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        <label>Message (optional):</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Any special notes or instructions?"
        />

        <button type="submit">Donate Clothes 💝</button>
      </form>
    </div>
  );
};

export default ClothesDonation;
