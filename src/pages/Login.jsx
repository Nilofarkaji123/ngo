import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data for backend
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      // Send POST request to backend
      const response = await fetch("http://localhost:8082/ngo/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      // Handle backend response
      if (response.ok) {
        const data = await response.json();

        if (data.status === "success") {
          alert("Login Successful 🎉");
          navigate("/home");
        } else {
          alert(data.message || "Invalid credentials ❌");
        }
      } else {
        alert("Server error. Please try again later ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to connect to the server 🚫");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to your Helping Universe NGO account</p>
        <form onSubmit={handleLogin}>
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

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="register-link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
