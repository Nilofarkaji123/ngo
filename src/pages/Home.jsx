import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Slideshow from "../components/Slideshow";
import { 
  FaBookOpen, FaUtensils, FaTshirt, FaMoneyBillWave, 
  FaClinicMedical, FaBirthdayCake, FaChild, FaSchool, FaCartPlus 
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const donations = [
    { icon: <FaUtensils />, title: "Food Donation", desc: "Donate leftover or surplus food with details of quantity, expiry date, and source.", route: "/food-donation" },
    { icon: <FaBookOpen />, title: "Book Donation", desc: "Donate books by category: Story, Academic, Reference to empower children.", route: "/books-donation" },
    { icon: <FaTshirt />, title: "Clothes Donation", desc: "Donate clothes by gender and size for children, women, and men.", route: "/clothes-donation" },
    { icon: <FaMoneyBillWave />, title: "Money Donation", desc: "Financial support for NGO projects, school supplies, and family aid.", route: "/money-donation" },
    { icon: <FaClinicMedical />, title: "Medical Support", desc: "Donate medical supplies or funds linked with partner hospitals.", route: "/medical-donation" },
    { icon: <FaBirthdayCake />, title: "Event Celebration", desc: "Support birthday parties, celebrations, and special events for children.", route: "/event-support" },
    { icon: <FaChild />, title: "Adopt a Child", desc: "Support a child: specify age, gender, and contact support for more info.", route: "/adopt-child" },
    { icon: <FaSchool />, title: "Education Support", desc: "Donate for school fees, stationery, scholarships, or online learning programs.", route: "/education-support" },
    { icon: <FaCartPlus />, title: "Grocery Donation", desc: "Donate groceries for families in need, providing real-time tracking of items.", route: "/grocery-donation" },
  ];

  return (
    <div className="home-container">
      {/* Hero / Slideshow */}
      <section className="hero-section" data-aos="fade-up">
        <Slideshow />
      </section>

      {/* About Section */}
      <section className="about-section" data-aos="fade-right">
        <h2>Who We Are</h2>
        <p>
          <strong>HelpingHand</strong> is a non-profit organization dedicated to
          supporting children and families in need. Our mission is to create a world where
          every child has access to education, nutrition, and care.
        </p>
      </section>

      {/* Donations Section */}
      <section className="donations-section">
        <h2 data-aos="fade-left">Donate & Support</h2>
        <div className="donation-grid">
          {donations.map((item, index) => (
            <div
              className="donation-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button onClick={() => navigate(item.route)}>Donate / Support</button>
            </div>
          ))}
        </div>
      </section>

      {/* Inspirational Quotes */}
      <section className="quotes-section" data-aos="fade-up">
        <h2>Inspirational Thoughts</h2>
        <p>“Education is the most powerful weapon which you can use to change the world.” — Nelson Mandela</p>
        <p>“An investment in knowledge pays the best interest.” — Benjamin Franklin</p>
        <p>“Every child deserves a happy and healthy childhood.” — Anonymous</p>
      </section>
    </div>
  );
};

export default Home;
