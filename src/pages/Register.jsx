import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    role: "user",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // NGO verification fields
    ngoRegNumber: "",
    ngoAddress: "",
    ngoContact: "",
    registrationCert: null,
    certificate12A: null,
    certificate80G: null,
    ngoPanCard: null,
    ownerIdProof: null,
    addressProof: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (
      e.target.type === "file"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    try {
      const formBody = new FormData();
      formBody.append("role", formData.role);
      formBody.append("name", formData.name);
      formBody.append("email", formData.email);
      formBody.append("password", formData.password);

      // Append NGO documents if role is NGO
      if (formData.role === "ngo") {
        formBody.append("ngoRegNumber", formData.ngoRegNumber);
        formBody.append("ngoAddress", formData.ngoAddress);
        formBody.append("ngoContact", formData.ngoContact);

        formBody.append("registrationCert", formData.registrationCert);
        formBody.append("certificate12A", formData.certificate12A);
        formBody.append("certificate80G", formData.certificate80G);
        formBody.append("ngoPanCard", formData.ngoPanCard);
        formBody.append("ownerIdProof", formData.ownerIdProof);
        formBody.append("addressProof", formData.addressProof);
      }

      const response = await fetch(
        "http://localhost:8082/ngo/api/register",
        {
          method: "POST",
          body: formBody,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("🎉 Registration Successful! Please login.");
        navigate("/login");
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>🌍 NGO-CONNECT 🌍</h2>
        <p>Become part of a change-making community</p>

        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="input-group">
            <label>Register As</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">🙋 User / Donor</option>
              <option value="ngo">🏢 NGO</option>
            </select>
          </div>

          {/* Name */}
          <div className="input-group">
            <label>{formData.role === "ngo" ? "NGO Name" : "Full Name"}</label>
            <input
              type="text"
              name="name"
              placeholder={formData.role === "ngo" ? "Enter NGO Name" : "Enter full name"}
              required
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
            />
          </div>

          {/* NGO Extra Fields */}
          {formData.role === "ngo" && (
            <>
              <div className="input-group">
                <label>NGO Registration Number</label>
                <input
                  type="text"
                  name="ngoRegNumber"
                  placeholder="Enter NGO registration number"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>NGO Address</label>
                <textarea
                  name="ngoAddress"
                  placeholder="Enter full NGO address"
                  required
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="input-group">
                <label>NGO Contact Number</label>
                <input
                  type="number"
                  name="ngoContact"
                  placeholder="Enter NGO phone number"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* File Uploads For Verification */}
              <div className="input-group">
                <label>NGO Registration Certificate</label>
                <input type="file" name="registrationCert" accept=".pdf,.jpg,.png" required onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>12A Certificate</label>
                <input type="file" name="certificate12A" accept=".pdf,.jpg,.png" required onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>80G Certificate</label>
                <input type="file" name="certificate80G" accept=".pdf,.jpg,.png" required onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>NGO PAN Card</label>
                <input type="file" name="ngoPanCard" accept=".pdf,.jpg,.png" required onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Owner Aadhaar / PAN</label>
                <input type="file" name="ownerIdProof" accept=".pdf,.jpg,.png" required onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>NGO Address Proof (Electricity Bill / Rent Agreement)</label>
                <input type="file" name="addressProof" accept=".pdf,.jpg,.png" required onChange={handleChange} />
              </div>
            </>
          )}

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter password" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              required
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="register-btn">Register</button>

          <p className="login-link">
            Already have an account? <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
