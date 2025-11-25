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
    ngoRegNumber: "",
    ngoAddress: "",
    ngoContact: "",
    certificate: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "certificate") {
      setFormData({ ...formData, certificate: e.target.files[0] });
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
      // Use multipart form-data since file upload is included
      const formBody = new FormData();
      formBody.append("role", formData.role);
      formBody.append("name", formData.name);
      formBody.append("email", formData.email);
      formBody.append("password", formData.password);

      if (formData.role === "ngo") {
        formBody.append("ngoRegNumber", formData.ngoRegNumber);
        formBody.append("ngoAddress", formData.ngoAddress);
        formBody.append("ngoContact", formData.ngoContact);
        formBody.append("certificate", formData.certificate);
      }

      const response = await fetch("http://localhost:8082/ngo/api/register", {
        method: "POST",
        body: formBody, // do NOT add headers for multipart
      });

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
              <option value="user">🙋 User</option>
              <option value="ngo">🏢 NGO</option>
            </select>
          </div>

          {/* Name */}
          <div className="input-group">
            <label>{formData.role === "ngo" ? "NGO Name" : "Full Name"}</label>
            <input
              type="text"
              name="name"
              placeholder={
                formData.role === "ngo"
                  ? "Enter NGO Name"
                  : "Enter your full name"
              }
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
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
                  placeholder="Enter NGO Registration Number"
                  onChange={handleChange}
                  required={formData.role === "ngo"}
                />
              </div>

              <div className="input-group">
                <label>NGO Address</label>
                <textarea
                  name="ngoAddress"
                  placeholder="Enter NGO Address"
                  onChange={handleChange}
                  required={formData.role === "ngo"}
                ></textarea>
              </div>

              <div className="input-group">
                <label>NGO Contact Number</label>
                <input
                  type="number"
                  name="ngoContact"
                  placeholder="Enter contact number"
                  onChange={handleChange}
                  required={formData.role === "ngo"}
                />
              </div>

              <div className="input-group">
                <label>Upload Certificate (PDF/Image)</label>
                <input
                  type="file"
                  name="certificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  required={formData.role === "ngo"}
                />
              </div>
            </>
          )}

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
