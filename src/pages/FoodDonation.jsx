import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./FoodDonation.css";

const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [30, 30],
});

const FoodDonation = () => {
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [selectedNGO, setSelectedNGO] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  // ✅ Get user's current location (auto-detect)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Location access denied:", err);
        }
      );
    }
  }, []);

  const handleDonate = (e) => {
    e.preventDefault();

    if (!selectedType || !quantity || !selectedNGO) {
      alert("Please fill all required fields.");
      return;
    }

    // Simulate donation save, then redirect to tracking
    alert("Donation request submitted successfully!");
    navigate("/tracking");
  };

  return (
    <div className="food-donation-container" data-aos="fade-up">
      <h2>🍱 Food Donation Portal</h2>
      <p className="intro-text">
        Donate food to nearby NGOs and make a difference in your community.
      </p>

      <form className="donation-form" onSubmit={handleDonate}>
        <div className="form-row">
          <label>Food Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="Cooked">Cooked Food</option>
            <option value="Packed">Packed Food</option>
            <option value="Raw">Raw Grains / Vegetables</option>
          </select>
        </div>

        <div className="form-row">
          <label>Quantity (in kg or items):</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 10 kg or 50 packs"
          />
        </div>

        <div className="form-row">
          <label>Description:</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Additional details (optional)"
          />
        </div>

        <div className="form-row">
          <label>Select NGO:</label>
          <select
            value={selectedNGO}
            onChange={(e) => setSelectedNGO(e.target.value)}
          >
            <option value="">-- Choose NGO --</option>
            <option value="FoodForAll">Food For All</option>
            <option value="HelpingHands">Helping Hands</option>
            <option value="SmileFoundation">Smile Foundation</option>
          </select>
        </div>

        <div className="map-section">
          <h3>Your Current Location</h3>
          {userLocation ? (
            <MapContainer
              center={userLocation}
              zoom={14}
              scrollWheelZoom={false}
              style={{
                height: "350px",
                width: "100%",
                borderRadius: "12px",
                marginTop: "10px",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={userLocation} icon={locationIcon}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p className="loading-text">Fetching your location...</p>
          )}
        </div>

        <button type="submit" className="donate-btn">
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default FoodDonation;
