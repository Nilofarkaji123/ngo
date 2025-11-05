import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

     

      // For Register
const response = await fetch("http://localhost:8082/ngo/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: formData.toString(),
});



      const data = await response.json();

      if (data.status === "success") {
        alert("Registration Successful 🎉");
        navigate("/login");
      } else {
        alert(data.message || "Registration Failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Your Account ✨</h2>
        <p>Join Helping Universe NGO to make a difference!</p>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-btn">Register</button>

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
