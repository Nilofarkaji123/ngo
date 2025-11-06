import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodDonation from "./src/pages/FoodDonation";

// Wrap your JSX with <Router>:
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/food-donation" element={<FoodDonation />} />
  </Routes>
</Router>
