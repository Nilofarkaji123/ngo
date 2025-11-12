// src/components/FoodTracking.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icons = {
  Good: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  Average: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  Leftover: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
};

const FoodTracking = ({ type, items }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const data = items.map((item, index) => ({
      id: index + 1,
      name: `${item.foodName} (${item.quality})`,
      lat: 19.076 + Math.random() * 0.02,
      lng: 72.8777 + Math.random() * 0.02,
      targetLat: 19.08 + Math.random() * 0.01,
      targetLng: 72.88 + Math.random() * 0.01,
      quantity: item.quantity,
      ngoName: item.ngoName,
    }));
    setLocations(data);

    const interval = setInterval(() => {
      setLocations((prev) =>
        prev.map((loc) => {
          const step = 0.0005;
          let newLat = loc.lat;
          let newLng = loc.lng;
          if (loc.lat < loc.targetLat) newLat += step;
          if (loc.lat > loc.targetLat) newLat -= step;
          if (loc.lng < loc.targetLng) newLng += step;
          if (loc.lng > loc.targetLng) newLng -= step;
          return { ...loc, lat: newLat, lng: newLng };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [items, type]);

  return (
    <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
      <MapContainer center={[19.076, 72.8777]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={icons[type]}>
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              Quantity: {loc.quantity} kg
              <br />
              NGO: {loc.ngoName}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FoodTracking;
