import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./GroceryDonation.css";

const groceryIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
  iconSize: [35, 35],
});

const GroceryDonation = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [selectedNGO, setSelectedNGO] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => console.error("Location access denied:", err)
      );
    }
  }, []);

  const handleDonate = (e) => {
    e.preventDefault();

    if (!item || !quantity || !selectedNGO) {
      alert("Please fill all required fields before donating.");
      return;
    }

    alert("Thank you for your kind donation! Redirecting to tracking page...");
    navigate("/tracking");
  };

  return (
    <div className="grocery-donation-container" data-aos="fade-up">
      <h2>🛒 Grocery Donation for Children</h2>
      <p className="intro-text">
        Help nourish children by donating healthy groceries and essentials.
      </p>

      <form className="donation-form" onSubmit={handleDonate}>
        <div className="form-row">
          <label>Grocery Item:</label>
          <select value={item} onChange={(e) => setItem(e.target.value)}>
            <option value="">-- Select Item --</option>
            <option value="Milk Packets">Milk Packets</option>
            <option value="Fruits">Fresh Fruits</option>
            <option value="Cereals">Cereals / Grains</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Snacks">Healthy Snacks</option>
          </select>
        </div>

        <div className="form-row">
          <label>Quantity (in kg or items):</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 5 kg, 10 packs"
          />
        </div>

        <div className="form-row">
          <label>Additional Notes:</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any details about the groceries..."
          />
        </div>

        <div className="form-row">
          <label>Select NGO:</label>
          <select
            value={selectedNGO}
            onChange={(e) => setSelectedNGO(e.target.value)}
          >
            <option value="">-- Choose NGO --</option>
            <option value="ChildHope">Child Hope Foundation</option>
            <option value="FeedJoy">Feed Joy</option>
            <option value="LittleHearts">Little Hearts Trust</option>
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
                height: "340px",
                width: "100%",
                borderRadius: "12px",
                marginTop: "10px",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={userLocation} icon={groceryIcon}>
                <Popup>Your Location</Popup>
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

export default GroceryDonation;
