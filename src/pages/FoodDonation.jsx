import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./FoodDonation.css";

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom blue icon for NGOs
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
  const [trackingType, setTrackingType] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => console.error("Location access denied:", err)
      );
    }
  }, []);

  // Fetch NGOs by city
  const fetchNgos = async () => {
    if (!city.trim()) return alert("Please enter a city name.");

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

  const handleDonateClick = (type) => {
    setSelectedType(type);
    setDonationDetails({ foodName: "", quantity: "", bestBefore: "", ngoId: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !donationDetails.foodName ||
      !donationDetails.quantity ||
      !donationDetails.bestBefore ||
      !donationDetails.ngoId
    ) {
      return alert("Please fill all details and select an NGO!");
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

  const foodOptions = [
    { name: "Cooked Food", type: "Cooked" },
    { name: "Packed Food", type: "Packed" },
    { name: "Raw Grains / Vegetables", type: "Raw" },
  ];

  return (
    <div className="food-donation-container">
      <h2>🍱 Food Donation Portal</h2>
      <p>Donate food to nearby NGOs and make a difference in your community.</p>

      {/* City Search */}
      <div className="city-search-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchNgos}>🔍 Search NGOs</button>
      </div>

      {/* NGO Dropdown */}
      {ngos.length > 0 && (
        <div className="ngo-dropdown-container">
          <label>Select NGO in {city}:</label>
          <select value={donationDetails.ngoId || ""} onChange={handleSelectNGO}>
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
            <button onClick={() => handleDonateClick(option.type)}>Donate Now ➜</button>
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
              value={donationDetails.foodName}
              onChange={handleInputChange}
            />

            <label>Quantity (kg)</label>
            <input
              type="number"
              name="quantity"
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

            {/* NGO Map */}
            {donationDetails.ngoId && selectedNgoCoords() && (
              <MapContainer
                key={`${donationDetails.ngoId}-${Date.now()}`}
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

            <button type="submit" className="donate-btn">Submit Donation</button>
          </form>
        </div>
      )}

      {/* Tracking Section */}
      {trackingItems.length > 0 && (
        <div>
          <h2>🚚 Tracking Your {trackingType} Donation</h2>
          {/* FoodTracking component can be added here */}
        </div>
      )}
    </div>
  );
};

export default FoodDonation;
