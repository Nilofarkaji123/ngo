import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./EducationSupport.css";

const EducationSupport = () => {
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [donorName, setDonorName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const [ngos, setNgos] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Fetch all NGOs
    fetch("http://localhost:8082/ngo/fetch-ngo-list")
      .then((res) => res.json())
      .then((data) => {
        setNgos(data); // expects [{name: "NGO Name", city: "City"}]
        const uniqueCities = [...new Set(data.map((n) => n.city))];
        setCities(uniqueCities); // set unique cities
      })
      .catch((err) => console.error(err));
  }, []);

  const donationOptions = [
    { name: "📚 Books & Notebooks", type: "books" },
    { name: "🎒 School Uniforms", type: "uniform" },
    { name: "✏️ Stationery Kits", type: "stationery" },
    { name: "💻 Learning Gadgets", type: "gadgets" },
    { name: "🪑 Classroom Furniture", type: "furniture" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donorName || !contact || !email || !selectedType || !quantity || !ngoName || !city) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    const payload = {
      donor_name: donorName,
      contact_number: contact,
      email,
      support_item: selectedType,
      quantity,
      message,
      ngo_name: ngoName,
      city,
      status: "PENDING"
    };

    try {
      const res = await fetch("http://localhost:8082/ngo/add-education-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("🎉 Thank you! Your donation has been recorded.");
        // Reset form
        setSelectedType("");
        setQuantity("");
        setMessage("");
        setNgoName("");
        setDonorName("");
        setContact("");
        setEmail("");
        setCity("");
      } else {
        alert("❌ Failed to submit donation.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  // Filter NGOs by selected city
  const filteredNgos = city ? ngos.filter((n) => n.city === city) : [];

  return (
    <div className="education-support-container" data-aos="fade-up">
      <h1>🎒 Education Support Drive</h1>

      <div className="education-grid">
        {donationOptions.map((option, idx) => (
          <div
            key={idx}
            className={`education-card ${selectedType === option.type ? "active" : ""}`}
            onClick={() => setSelectedType(option.type)}
          >
            <h2>{option.name}</h2>
            <button type="button">
              {selectedType === option.type ? "Selected ✓" : "Select"}
            </button>
          </div>
        ))}
      </div>

      {selectedType && (
        <form className="education-form" onSubmit={handleSubmit}>
          <h2>📦 Donation Details</h2>

          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact Number"
            maxLength="10"
            required
          />

          {/* Dynamic City Dropdown */}
          <label>
            City:
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setNgoName(""); // reset NGO when city changes
              }}
              required
            >
              <option value="">Select City</option>
              {cities.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          {/* Dynamic NGO Dropdown */}
          <label>
            NGO Name:
            <select
              value={ngoName}
              onChange={(e) => setNgoName(e.target.value)}
              required
              disabled={!city}
            >
              <option value="">{city ? "Select NGO" : "Select City First"}</option>
              {filteredNgos.map((n, i) => (
                <option key={i} value={n.name}>
                  {n.name}
                </option>
              ))}
            </select>
          </label>

          <input type="text" value={selectedType} disabled />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message (Optional)"
          />

          <button type="submit" className="donate-submit-btn">
            🤝 Confirm Donation
          </button>
        </form>
      )}
    </div>
  );
};

export default EducationSupport;
