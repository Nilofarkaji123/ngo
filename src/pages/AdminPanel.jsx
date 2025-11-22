import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
        "http://localhost:8082/ngo/fetch-medical-support",
        "http://localhost:8082/ngo/api/event",
        "http://localhost:8082/ngo/fetch-book-donations",
        "http://localhost:8082/ngo/fetch-clothes-donations",
        "http://localhost:8082/ngo/fetch-education-support"
      ];

      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const jsons = await Promise.all(responses.map(async (res) => {
          if (!res.ok) throw new Error(`Failed to fetch: ${res.url}`);
          const text = await res.text();
          try {
            return JSON.parse(text);
          } catch {
            console.error("❌ Not JSON from:", res.url, text.slice(0, 100));
            return [];
          }
        }));

        const allData = jsons.flatMap(j => Array.isArray(j) ? j : j.data || []);

        const normalizedData = allData.map(item => {
          switch(item.type) {
            case "Book Donation":
              return {
                id: item.id,
                type: "Book Donation",
                category: item.category,
                quantity: item.quantity,
                city: item.city,
                ngoName: item.ngoName,
                donorName: item.donor_name || item.donorName,
                status: item.status || "PENDING",
                createdAt: item.createdAt,
              };
            case "Clothes Donation":
              return {
                id: item.id,
                type: "Clothes Donation",
                city: item.city,
                ngoName: item.ngoName,
                donorName: item.donorName || item.donor_name,
                quantity: item.quantity,
                condition: item.condition || item.cloth_condition,
                pickupAddress: item.pickupAddress,
                pickupDate: item.pickupDate,
                status: item.status || "PENDING",
                createdAt: item.createdAt,
              };
            case "Medical Support":
              return {
                id: item.id,
                type: "Medical Support",
                city: item.city,
                ngoName: item.ngoName,
                donorName: item.donorName,
                supportType: item.supportType,
                quantity: item.quantity,
                details: item.details,
                status: item.status || "PENDING",
                createdAt: item.createdAt
              };
            case "Education Support":
              return {
                id: item.id,
                type: "Education Support",
                city: item.city,
                ngoName: item.ngoName,
                donorName: item.donorName,
                supportItem: item.supportItem,
                quantity: item.quantity,
                message: item.message,
                contact: item.contact,
                email: item.email,
                status: item.status || "PENDING",
                createdAt: item.createdAt
              };
            default:
              return {
                id: item.id,
                type: "Event",
                eventType: item.eventType,
                ngoName: item.ngoName,
                organizer: item.organizer,
                eventDate: item.eventDate,
                eventTime: item.eventTime,
                status: item.status || "PENDING",
              };
          }
        });

        setRequests(normalizedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const updateStatus = (id, type, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id && r.type === type ? { ...r, status } : r))
    );
  };

  return (
    <div className="admin-panel-container">
      <h2>🌐 Admin Panel</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Details</th>
            <th>Requester</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((r) => (
              <tr key={`${r.id}-${r.type || r.eventType}`}>
                <td>{r.id}</td>
                <td>{r.type}</td>
                <td className="details-cell">
                  {r.type === "Book Donation" && (
                    <>
                      📚 <strong>{r.category}</strong> - {r.quantity} pcs
                      <br />🏙️ {r.city} @ {r.ngoName}
                      <br />📅 Submitted: {r.createdAt}
                    </>
                  )}
                  {r.type === "Clothes Donation" && (
                    <>
                      👕 {r.quantity} pcs ({r.condition})
                      <br />🏙️ {r.city} @ {r.ngoName}
                      <br />📍 {r.pickupAddress}
                      <br />📅 Pickup: {r.pickupDate}
                      <br />📅 Submitted: {r.createdAt}
                    </>
                  )}
                  {r.type === "Medical Support" && (
                    <>
                      🩺 <strong>{r.supportType}</strong> - {r.quantity}
                      <br />🏙️ {r.city} @ {r.ngoName}
                      <br />📄 {r.details}
                      <br />📅 Submitted: {r.createdAt}
                    </>
                  )}
                  {r.type === "Education Support" && (
                    <>
                      🎓 <strong>{r.supportItem}</strong> - {r.quantity} pcs
                      <br />🏙️ {r.city} @ {r.ngoName}
                      <br />📄 {r.message}
                      <br />📧 {r.email} 📞 {r.contact}
                      <br />📅 Submitted: {r.createdAt}
                    </>
                  )}
                  {r.type === "Event" && (
                    <>
                      <strong>{r.eventType}</strong> @ {r.ngoName}
                      <br />📅 {r.eventDate} 🕒 {r.eventTime}
                    </>
                  )}
                </td>
                <td>
                  {["Book Donation","Clothes Donation","Medical Support","Education Support"].includes(r.type)
                    ? r.donorName
                    : r.organizer}
                </td>
                <td>{r.status}</td>
                <td>
                  {r.status === "PENDING" && (
                    <div className="action-buttons">
                      <button className="accept-btn" onClick={() => updateStatus(r.id, r.type, "APPROVED")}>
                        Accept
                      </button>
                      <button className="reject-btn" onClick={() => updateStatus(r.id, r.type, "REJECTED")}>
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
