import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./src/pages/Home";
import DonateOptions from "./src/pages/DonateOptions";
import FoodDonation from "./src/pages/FoodDonation";

function App() {
  return (
    <Router>
      <header className="navbar">
        <div className="logo">Helping Universe</div>
        <div className="auth-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<DonateOptions />} />
        <Route path="/donate/food" element={<FoodDonation />} />
      </Routes>

      <footer className="footer">
        <p>© 2025 Helping Universe | All Rights Reserved</p>
      </footer>
    </Router>
  );
}

export default App;
