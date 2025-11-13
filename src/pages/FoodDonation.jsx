import React, { useState } from "react";
import FoodTracking from "../components/FoodTracking";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./FoodDonation.css";

// Fix Leaflet default icon for React-Leaflet 4+
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom blue icon (optional)
const ngoIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const FoodDonation = () => {
  const [selectedType, setSelectedType] = useState("");
  const [donationDetails, setDonationDetails] = useState({
    foodName: "",
    quantity: "",
    bestBefore: "",
    ngoId: null,
  });
  const [city, setCity] = useState("");
  const [ngos, setNgos] = useState([]);
  const [trackingItems, setTrackingItems] = useState([]);
  const [trackingType, setTrackingType] = useState("");

  const foodOptions = [
    { name: "🍛 Cooked Food", type: "Cooked" },
    { name: "🥦 Uncooked Food", type: "Uncooked" },
    { name: "🥡 Leftover Food", type: "Leftover" },
  ];

  // Fetch NGOs by city
  const fetchNgos = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8082/ngo/get-ngos?city=${city}`);
      const data = await res.json();

      if (data.status === "success" && data.ngos.length > 0) {
        setNgos(data.ngos);
      } else {
        alert("No NGOs found in this city.");
        setNgos([]);
      }
    } catch (err) {
      console.error("Error fetching NGOs:", err);
      alert("Failed to fetch NGOs. Check your backend connection.");
    }
  };

  const handleDonateClick = (type) => {
    setSelectedType(type);
    setDonationDetails({ foodName: "", quantity: "", bestBefore: "", ngoId: null });
  };

  const handleInputChange = (e) => {
    setDonationDetails({ ...donationDetails, [e.target.name]: e.target.value });
  };

  const handleSelectNGO = (e) => {
    setDonationDetails({ ...donationDetails, ngoId: e.target.value });
  };

  const selectedNgoCoords = () => {
    const ngo = ngos.find((n) => n.id === parseInt(donationDetails.ngoId));
    return ngo ? [ngo.lat || 19.076, ngo.lng || 72.877] : null;
  };

  // Submit donation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !donationDetails.foodName ||
      !donationDetails.quantity ||
      !donationDetails.bestBefore ||
      !donationDetails.ngoId
    ) {
      alert("Please fill all details and select an NGO!");
      return;
    }

    const ngo = ngos.find((n) => n.id === parseInt(donationDetails.ngoId));
    const item = {
      foodName: donationDetails.foodName,
      quantity: donationDetails.quantity,
      ngoName: ngo.name,
      targetLat: ngo.lat || 19.076,
      targetLng: ngo.lng || 72.877,
    };

    try {
      const response = await fetch("http://localhost:8082/ngo/foodDonation", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          donorName: "Anonymous",
          ngoName: ngo.name,
          donationType: selectedType,
          foodName: donationDetails.foodName,
          quantity: donationDetails.quantity,
          bestBefore: donationDetails.bestBefore,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Donation recorded successfully!");
        setTrackingType(selectedType);
        setTrackingItems([item]);
        setSelectedType("");
        setDonationDetails({ foodName: "", quantity: "", bestBefore: "", ngoId: null });
      } else {
        alert(result.message || "Failed to record donation.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to connect to backend.");
    }
  };

  return (
    <div className="food-donation-container">
      <h1>🍲 Food Donation</h1>
      <p>Share the joy of food and help feed the hungry.</p>

      {/* City Search Section */}
      <div className="city-search-container">
        <h3>Find NGOs in your city</h3>
        <div className="city-search-box">
          <input
            type="text"
            placeholder="Enter your city (e.g. Nashik, Sinnar, Pune)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-btn" onClick={fetchNgos}>
            🔍 Search NGOs
          </button>
        </div>
      </div>

      {/* Attractive NGO Dropdown */}
      {ngos.length > 0 && (
        <div className="ngo-dropdown-container">
          <label>Select NGO in {city}:</label>
          <select
            value={donationDetails.ngoId || ""}
            onChange={handleSelectNGO}
            className="styled-dropdown"
          >
            <option value="">-- Select an NGO --</option>
            {ngos.map((ngo) => (
              <option key={ngo.id} value={ngo.id}>
                {ngo.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Food Type Options */}
      <div className="food-grid">
        {foodOptions.map((option, index) => (
          <div key={index} className="food-card">
            <h2>{option.name}</h2>
            <p>Donate this type of food to help those in need.</p>
            <button className="donate-btn" onClick={() => handleDonateClick(option.type)}>
              Donate Now ➜
            </button>
          </div>
        ))}
      </div>

      {/* Donation Form */}
      {selectedType && (
        <div className="donation-form">
          <h2>Donate {selectedType} Food</h2>
          <form onSubmit={handleSubmit}>
            <label>Food Name / Description</label>
            <input
              type="text"
              name="foodName"
              placeholder="Enter food name (e.g. Rice, Roti)"
              value={donationDetails.foodName}
              onChange={handleInputChange}
            />

            <label>Quantity (kg)</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity in kg"
              value={donationDetails.quantity}
              onChange={handleInputChange}
            />

            <label>Best Before Date</label>
            <input
              type="date"
              name="bestBefore"
              value={donationDetails.bestBefore}
              onChange={handleInputChange}
            />

            {/* Map Display */}
            {donationDetails.ngoId && selectedNgoCoords() && (
              <MapContainer
                key={`${donationDetails.ngoId}-${Date.now()}`} // unique key per render
                center={selectedNgoCoords()}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={selectedNgoCoords()} icon={ngoIcon}>
                  <Popup>{ngos.find((n) => n.id === parseInt(donationDetails.ngoId))?.name}</Popup>
                </Marker>
              </MapContainer>
            )}

            <button type="submit" className="donate-btn">
              Submit Donation
            </button>
          </form>
        </div>
      )}

      {/* Tracking Section */}
      {trackingItems.length > 0 && (
        <>
          <h2 style={{ marginTop: "40px", color: "#014f86" }}>
            🚚 Tracking Your {trackingType} Donation
          </h2>
          <FoodTracking type={trackingType} items={trackingItems} />
        </>
      )}
    </div>
  );
};

export default FoodDonation;
