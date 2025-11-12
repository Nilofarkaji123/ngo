import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./TrackingPage.css";

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [35, 35],
});

const partnerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [35, 35],
});

const TrackingPage = () => {
  const [ngoStatus, setNgoStatus] = useState("Pending");
  const [partner, setPartner] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [partnerLocation, setPartnerLocation] = useState(null);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  // Simulate NGO response after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const accepted = Math.random() > 0.3;
      if (accepted) {
        setNgoStatus("Accepted");
        setPartner({
          name: "Rahul Sharma",
          contact: "+91 9876543210",
        });
        // Assign a random nearby starting point for delivery partner
        if (userLocation) {
          setPartnerLocation({
            lat: userLocation.lat + 0.01,
            lng: userLocation.lng - 0.01,
          });
        }
      } else {
        setNgoStatus("Rejected");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [userLocation]);

  // Simulate real-time partner movement toward user
  useEffect(() => {
    if (partnerLocation && userLocation && ngoStatus === "Accepted") {
      const interval = setInterval(() => {
        setPartnerLocation((prev) => {
          if (!prev) return prev;
          const latDiff = userLocation.lat - prev.lat;
          const lngDiff = userLocation.lng - prev.lng;

          // Move step by step toward the user
          return {
            lat: prev.lat + latDiff * 0.1,
            lng: prev.lng + lngDiff * 0.1,
          };
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [partnerLocation, userLocation, ngoStatus]);

  return (
    <div className="tracking-wrapper">
      <h2>Donation Tracking</h2>
      <div className="status-box">
        <p><strong>NGO Status:</strong> {ngoStatus}</p>
        {ngoStatus === "Pending" && <p className="pending">Waiting for NGO confirmation...</p>}
        {ngoStatus === "Accepted" && partner && (
          <div className="partner-info">
            <p><strong>Delivery Partner:</strong> {partner.name}</p>
            <p><strong>Contact:</strong> {partner.contact}</p>
          </div>
        )}
        {ngoStatus === "Rejected" && <p className="rejected">Sorry, NGO rejected this donation.</p>}
      </div>

      {ngoStatus === "Accepted" && userLocation && partnerLocation && (
        <div className="map-container">
          <MapContainer
            center={userLocation}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%", borderRadius: "10px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={userLocation} icon={userIcon}>
              <Popup>Your Location</Popup>
            </Marker>
            <Marker position={partnerLocation} icon={partnerIcon}>
              <Popup>Delivery Partner</Popup>
            </Marker>
            <Polyline positions={[partnerLocation, userLocation]} color="green" />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
