import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./EducationSupport.css";

const EducationSupport = () => {
  const [selectedType, setSelectedType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedNGO, setSelectedNGO] = useState("");

  const donationOptions = [
    { name: "🎓 School Fees", type: "fees", info: "Help a child continue their education by contributing to their school fees." },
    { name: "✏️ Stationery", type: "stationery", info: "Donate notebooks, pens, and other essentials for students." },
    { name: "🏅 Scholarships", type: "scholarship", info: "Support talented students with merit-based scholarships." },
    { name: "💻 Online Learning", type: "online", info: "Contribute to devices or subscriptions for online education." },
  ];

  const ngoList = [
    "Bright Future Foundation",
    "Education For All Trust",
    "Smile Learning NGO",
    "Sanjivani Children Foundation",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedType || !amount || !selectedNGO) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      alert("💰 Please enter a valid donation amount.");
      return;
    }

    alert(`🎉 Thank you for supporting education through ${selectedNGO}!`);
    setSelectedType("");
    setAmount("");
    setDescription("");
    setSelectedNGO("");
  };

  return (
    <div className="education-support-container" data-aos="fade-up">
      <h1>🎒 Education Support</h1>
      <p>Donate for school fees, stationery, scholarships, or online learning programs to empower education for every child.</p>

      <div className="education-grid">
        {donationOptions.map((option, index) => (
          <div
            key={index}
            className={`education-card ${selectedType === option.type ? "active" : ""}`}
            data-aos="zoom-in"
            data-aos-delay={index * 150}
          >
            <h2>{option.name}</h2>
            <p>{option.info}</p>
            <button onClick={() => setSelectedType(option.type)}>
              {selectedType === option.type ? "Selected ✓" : "Select"}
            </button>
          </div>
        ))}
      </div>

      {selectedType && (
        <form className="education-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="300">
          <h2>📋 Donation Details</h2>

          <label>Donation Type:</label>
          <input type="text" value={selectedType} disabled />

          <label>Amount (₹):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (₹)"
            required
          />

          <label>NGO / Beneficiary:</label>
          <select
            value={selectedNGO}
            onChange={(e) => setSelectedNGO(e.target.value)}
            required
          >
            <option value="">-- Select NGO --</option>
            {ngoList.map((ngo, idx) => (
              <option key={idx} value={ngo}>{ngo}</option>
            ))}
          </select>

          <label>Message (Optional):</label>
          <textarea
            placeholder="Write a note or message for your donation..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" className="donate-submit-btn">
            💖 Confirm Donation
          </button>
        </form>
      )}
    </div>
  );
};

export default EducationSupport;
