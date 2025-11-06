import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const FoodTracking = ({ type, items }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Initialize locations with random nearby start positions
    const data = items.map((item, index) => ({
      id: index + 1,
      name: `${type} Donation - ${item.foodName}`,
      lat: 19.076 + Math.random() * 0.02, // start latitude
      lng: 72.8777 + Math.random() * 0.02, // start longitude
      quantity: `${item.quantity} kg`,
      targetLat: 19.08 + Math.random() * 0.01, // NGO latitude
      targetLng: 72.88 + Math.random() * 0.01, // NGO longitude
    }));
    setLocations(data);

    const interval = setInterval(() => {
      setLocations((prev) =>
        prev.map((loc) => {
          const step = 0.0005; // movement step
          let newLat = loc.lat;
          let newLng = loc.lng;

          // Move latitude toward target
          if (loc.lat < loc.targetLat) newLat += step;
          if (loc.lat > loc.targetLat) newLat -= step;

          // Move longitude toward target
          if (loc.lng < loc.targetLng) newLng += step;
          if (loc.lng > loc.targetLng) newLng -= step;

          return { ...loc, lat: newLat, lng: newLng };
        })
      );
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, [items, type]);

  return (
    <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
      <MapContainer
        center={[19.076, 72.8777]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              Quantity: {loc.quantity}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FoodTracking;
