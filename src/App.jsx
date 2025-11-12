import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import MedicalSupport from "./pages/MedicalSupport"; // ✅ Added new page
import EducationSupport from "./pages/EducationSupport";


import Header from "./components/Header";
import Footer from "./components/Footer";
import "aos/dist/aos.css";

function Layout() {
  const location = useLocation();

  // ✅ Hide Header & Footer on specific pages
  const hideHeaderFooter =
    location.pathname === "/" ||
    location.pathname === "/thank-you" ||
    location.pathname === "/admin-panel" ||
    location.pathname === "/admin-login" ||
    location.pathname === "/donate-options";

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/volunteers" element={<Volunteers />} />

        {/* ✅ Donation Related Routes */}
        <Route path="/donate-options" element={<DonateOptions />} />
        <Route path="/food-donation" element={<FoodDonation />} />
        <Route path="/books-donation" element={<BooksDonation />} />
        <Route path="/clothes-donation" element={<ClothesDonation />} />
        <Route path="/oldthings-donation" element={<OldThingsDonation />} />
        <Route path="/money-donation" element={<MoneyDonation />} />
        <Route path="/medical-support" element={<MedicalSupport />} /> {/* ✅ New route */}
        <Route path="/education-support" element={<EducationSupport />} />


        {/* ✅ Other Functional Pages */}
        <Route path="/event-support" element={<EventSupport />} />
        <Route path="/occasion-booking" element={<OccasionBooking />} />
        <Route path="/adopt-child" element={<AdoptChild />} />

        {/* ✅ Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />

        {/* ✅ Others */}
        <Route path="/thank-you" element={<ThankYouLetter />} />
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", marginTop: "50px" }}>
              404 Page Not Found
            </h1>
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
