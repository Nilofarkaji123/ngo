import React, { useState } from "react";
import FoodTracking from "../components/FoodTracking";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./FoodDonation.css";

// NGO sample data
const ngos = [
  { id: 1, name: "Helping Hands NGO", lat: 19.081, lng: 72.882 },
  { id: 2, name: "Feed the Hungry", lat: 19.078, lng: 72.88 },
  { id: 3, name: "Care & Share", lat: 19.079, lng: 72.879 },
];

// Leaflet icon for NGOs
const ngoIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const FoodDonation = () => {
  const [selectedType, setSelectedType] = useState("");
  const [donationDetails, setDonationDetails] = useState({ name: "", quantity: "", quality: "", ngoId: null });
  const [trackingItems, setTrackingItems] = useState([]);
  const [trackingType, setTrackingType] = useState("");

  const foodOptions = [
    { name: "🍛 Cooked Food", type: "Cooked" },
    { name: "🥦 Uncooked Food", type: "Uncooked" },
    { name: "🥡 Leftover Food", type: "Leftover" },
  ];

  const handleDonateClick = (type) => {
    setSelectedType(type);
    setDonationDetails({ name: "", quantity: "", quality: "", ngoId: null });
  };

  const handleInputChange = (e) => {
    setDonationDetails({ ...donationDetails, [e.target.name]: e.target.value });
  };

  const handleSelectNGO = (id) => {
    setDonationDetails({ ...donationDetails, ngoId: id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!donationDetails.name || !donationDetails.quantity || !donationDetails.quality || !donationDetails.ngoId) {
      alert("Please fill all details and select an NGO!");
      return;
    }

    const ngo = ngos.find((n) => n.id === parseInt(donationDetails.ngoId));
    const item = {
      foodName: donationDetails.name,
      quantity: donationDetails.quantity,
      ngoName: ngo.name,
      lat: 19.076 + Math.random() * 0.02,
      lng: 72.8777 + Math.random() * 0.02,
      targetLat: ngo.lat,
      targetLng: ngo.lng,
    };

    setTrackingType(selectedType);
    setTrackingItems([item]); // for demo, one item at a time
    setSelectedType(""); // hide form
  };

  return (
    <div className="food-donation-container">
      <h1>🍲 Food Donation</h1>
      <p>Share the joy of food and help feed the hungry.</p>

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
            <input
              type="text"
              name="name"
              placeholder="Food Name / Description"
              value={donationDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (kg)"
              value={donationDetails.quantity}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="quality"
              placeholder="Quality / Condition"
              value={donationDetails.quality}
              onChange={handleInputChange}
            />

            <h3>Select Nearby NGO</h3>
            <MapContainer center={[19.076, 72.8777]} zoom={13} style={{ height: "300px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              {ngos.map((ngo) => (
                <Marker
                  key={ngo.id}
                  position={[ngo.lat, ngo.lng]}
                  icon={ngoIcon}
                  eventHandlers={{
                    click: () => handleSelectNGO(ngo.id),
                  }}
                >
                  <Popup>{ngo.name} (Click marker to select)</Popup>
                </Marker>
              ))}
            </MapContainer>
            <p>Selected NGO: {donationDetails.ngoId ? ngos.find(n => n.id === parseInt(donationDetails.ngoId)).name : "None"}</p>

            <button type="submit" className="donate-btn">Submit Donation</button>
          </form>
        </div>
      )}

      {/* Tracking Map */}
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
