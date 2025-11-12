import React, { useState } from "react";
import "./MedicalSupport.css";

const MedicalSupport = () => {
  const [selectedSupport, setSelectedSupport] = useState("");
  const [formData, setFormData] = useState({ name: "", quantity: "", details: "" });

  const supportOptions = [
    { name: "💊 Medicine Donation", type: "medicine", description: "Donate unused or extra medicines to help patients." },
    { name: "🩺 Equipment Donation", type: "equipment", description: "Provide medical equipment to hospitals or clinics." },
    { name: "🩸 Blood Donation", type: "blood", description: "Donate blood and save lives." },
    { name: "💰 Financial Help", type: "money", description: "Support medical treatment with financial aid." },
  ];

  const handleSupportClick = (type) => {
    setSelectedSupport(type);
    setFormData({ name: "", quantity: "", details: "" });
  };

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.quantity || !formData.details) {
      alert("Please fill all fields!");
      return;
    }
    alert(`Thank you! Your ${selectedSupport} support has been recorded.`);
    setSelectedSupport("");
  };

  return (
    <div className="medical-support-container">
      <h1>🩺 Medical Support</h1>
      <p>Help provide essential medical aid to those in need.</p>

      <div className="support-grid">
        {supportOptions.map((option, index) => (
          <div key={index} className="support-card" onClick={() => handleSupportClick(option.type)}>
            <h2>{option.name}</h2>
            <p>{option.description}</p>
            <button className="support-btn">Support Now ➜</button>
          </div>
        ))}
      </div>

      {selectedSupport && (
        <div className="support-form">
          <h2>Provide {selectedSupport} Support</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder={selectedSupport === "blood" ? "Units (ml)" : "Quantity"}
              value={formData.quantity}
              onChange={handleInputChange}
            />
            <textarea
              name="details"
              placeholder="Additional Details"
              value={formData.details}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" className="support-btn">Submit Support</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MedicalSupport;
