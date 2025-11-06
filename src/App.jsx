import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import DonateOptions from "./pages/DonateOptions";
import FoodDonation from "./pages/FoodDonation";
import BooksDonation from "./pages/BooksDonation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BirthdayBooking from "./pages/BirthdayBooking";
import OccasionBooking from "./pages/OccasionBooking";
import ClothesDonation from "./pages/ClothesDonation";
import OldThingsDonation from "./pages/OldThingsDonation";
import MoneyDonation from "./pages/MoneyDonation";
import Activities from "./pages/Activities";
import AboutUs from "./pages/AboutUs";
import Volunteers from "./pages/Volunteers";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Hide Header on welcome page */}
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activities" element={<Activities />} />

        <Route path="/donate-options" element={<DonateOptions />} />
        <Route path="/food-donation" element={<FoodDonation />} />
        <Route path="/books-donation" element={<BooksDonation />} />
        <Route path="/clothes-donation" element={<ClothesDonation />} />
        <Route path="/oldthings-donation" element={<OldThingsDonation />} />
        <Route path="/money-donation" element={<MoneyDonation />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/volunteers" element={<Volunteers />} />

        <Route path="/birthday-booking" element={<BirthdayBooking />} />
        <Route path="/occasion-booking" element={<OccasionBooking />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*"
          element={
            <h1 style={{ textAlign: "center", marginTop: "50px" }}>
              404 Page Not Found
            </h1>
          }
        />
      </Routes>

      {/* Hide Footer on welcome page */}
      {location.pathname !== "/" && <Footer />}
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
