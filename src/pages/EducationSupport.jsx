import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./EducationSupport.css";

const EducationSupport = () => {
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [selectedNGO, setSelectedNGO] = useState("");
  const [donorName, setDonorName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // 🎒 Donation options (items, not money)
  const donationOptions = [
    { 
      name: "📚 Books & Notebooks", 
      type: "books", 
      info: "Donate storybooks, textbooks, or notebooks to enhance learning." 
    },
    { 
      name: "🎒 School Uniforms", 
      type: "uniform", 
      info: "Provide neat school uniforms for children in need." 
    },
    { 
      name: "✏️ Stationery Kits", 
      type: "stationery", 
      info: "Include pens, pencils, erasers, rulers, and other supplies." 
    },
    { 
      name: "💻 Learning Gadgets", 
      type: "gadgets", 
      info: "Help children access online education with tablets or used laptops." 
    },
    { 
      name: "🪑 Classroom Furniture", 
      type: "furniture", 
      info: "Support by donating desks, chairs, or whiteboards for better learning spaces." 
    },
  ];

  const ngoList = [
    "Bright Future Foundation",
    "Education For All Trust",
    "Smile Learning NGO",
    "Sanjivani Children Foundation",
  ];

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    if (!donorName.trim()) return "Please enter your name.";
    if (!phoneRegex.test(contact)) return "Enter a valid 10-digit contact number.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    if (!selectedType) return "Select an item to donate.";
    if (!quantity || quantity <= 0) return "Enter a valid quantity.";
    if (!selectedNGO) return "Select an NGO or beneficiary.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      alert("⚠️ " + error);
      return;
    }

    alert(
      `🎉 Thank you ${donorName}! 
Your donation of ${quantity} ${selectedType}(s) has been pledged successfully to ${selectedNGO}. 
They will contact you soon for collection or drop-off details.`
    );

    // Reset form
    setSelectedType("");
    setQuantity("");
    setDescription("");
    setSelectedNGO("");
    setDonorName("");
    setContact("");
    setEmail("");
  };

  return (
    <div className="education-support-container" data-aos="fade-up">
      <h1>🎒 Education Support Drive</h1>
      <p>
        Be a reason for a child’s smile. Contribute learning items like books,
        uniforms, or gadgets — and empower their future!
      </p>

      <div className="education-grid">
        {donationOptions.map((option, index) => (
          <div
            key={index}
            className={`education-card ${selectedType === option.type ? "active" : ""}`}
            data-aos="zoom-in"
            data-aos-delay={index * 120}
            onClick={() => setSelectedType(option.type)}
          >
            <h2>{option.name}</h2>
            <p>{option.info}</p>
            <button type="button">
              {selectedType === option.type ? "Selected ✓" : "Select"}
            </button>
          </div>
        ))}
      </div>

      {selectedType && (
        <form
          className="education-form"
          onSubmit={handleSubmit}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2>📦 Donation Details</h2>

          <label>Your Full Name:</label>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Contact Number:</label>
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter 10-digit number"
            maxLength="10"
            required
          />

          <label>Selected Item:</label>
          <input type="text" value={selectedType} disabled />

          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter number of items"
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
              <option key={idx} value={ngo}>
                {ngo}
              </option>
            ))}
          </select>

          <label>Message (Optional):</label>
          <textarea
            placeholder="Write a short message or note..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
