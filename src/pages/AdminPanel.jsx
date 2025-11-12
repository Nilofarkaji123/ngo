import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [donations, setDonations] = useState([]);

  // Fetch donations from backend or use mock data
  useEffect(() => {
    // Example mock data
    const mock = [
      {
        id: 1,
        type: "Food",
        items: [{ name: "Rice", quantity: "10kg" }],
        status: "Pending",
        donor: "Roshani",
      },
      {
        id: 2,
        type: "Clothes",
        items: [{ name: "Shirts", quantity: "20" }],
        status: "Accepted",
        donor: "John",
      },
    ];
    setDonations(mock);
  }, []);

  const acceptDonation = (id) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Accepted" } : d))
    );
  };

  const rejectDonation = (id) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Rejected" } : d))
    );
  };

  return (
    <div className="admin-panel-container">
      <h2>🌐 Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Donation ID</th>
            <th>Type</th>
            <th>Items</th>
            <th>Donor</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.type}</td>
              <td>
                {d.items.map((i, idx) => (
                  <div key={idx}>
                    {i.name} - {i.quantity}
                  </div>
                ))}
              </td>
              <td>{d.donor}</td>
              <td>{d.status}</td>
              <td>
                {d.status === "Pending" && (
                  <>
                    <button onClick={() => acceptDonation(d.id)}>Accept</button>
                    <button onClick={() => rejectDonation(d.id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
