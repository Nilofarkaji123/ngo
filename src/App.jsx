import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "aos/dist/aos.css";

// Pages
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import DonateOptions from "./pages/DonateOptions";
import FoodDonation from "./pages/FoodDonation";
import BooksDonation from "./pages/BooksDonation";
import ClothesDonation from "./pages/ClothesDonation";
import OldThingsDonation from "./pages/OldThingsDonation";
import MoneyDonation from "./pages/MoneyDonation";
import AdoptChild from "./pages/AdoptChild";
import EventSupport from "./pages/EventSupport";
import OccasionBooking from "./pages/OccasionBooking";
import Activities from "./pages/Activities";
import AboutUs from "./pages/AboutUs";
import Volunteers from "./pages/Volunteers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import ThankYouLetter from "./pages/ThankYouLetter";
import MedicalSupport from "./pages/MedicalSupport";
import EducationSupport from "./pages/EducationSupport";
import TrackingPage from "./pages/TrackingPage";
import GroceryDonation from "./components/GroceryDonation";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  const location = useLocation();
  const noHeaderFooterPaths = [
    "/", 
    "/thank-you", 
    "/admin-panel", 
    "/admin-login", 
    "/donate-options"
  ];
  const hideHeaderFooter = noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/volunteers" element={<Volunteers />} />

        {/* Donation Routes */}
        <Route path="/donate-options" element={<DonateOptions />} />
        <Route path="/food-donation" element={<FoodDonation />} />
        <Route path="/books-donation" element={<BooksDonation />} />
        <Route path="/clothes-donation" element={<ClothesDonation />} />
        <Route path="/oldthings-donation" element={<OldThingsDonation />} />
        <Route path="/money-donation" element={<MoneyDonation />} />
        <Route path="/medical-support" element={<MedicalSupport />} />
        <Route path="/education-support" element={<EducationSupport />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/grocery-donation" element={<GroceryDonation />} />

        {/* Other Functional Pages */}
        <Route path="/event-support" element={<EventSupport />} />
        <Route path="/occasion-booking" element={<OccasionBooking />} />
        <Route path="/adopt-child" element={<AdoptChild />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />

        {/* Thank You Page */}
        <Route path="/thank-you" element={<ThankYouLetter />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h1>404 Page Not Found</h1>
              <a href="/home" style={{ color: "#2e7d32", textDecoration: "underline" }}>
                Go Back Home
              </a>
            </div>
          }
        />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
