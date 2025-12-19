import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksDonation.css";

const BooksDonation = () => {
  const [city, setCity] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [donorName, setDonorName] = useState(""); // <-- Added
  const [ngos, setNgos] = useState([]);
  const [items, setItems] = useState([{ category: "", quantity: "" }]);
  const [submitted, setSubmitted] = useState(false);

  // Fetch NGOs by selected city
  useEffect(() => {
    if (city) {
      axios
        .get(`http://localhost:8082/ngo/get-ngos?city=${city}`)
        .then((res) => {
          if (res.data.status === "success") {
            setNgos(res.data.ngos);
          } else {
            setNgos([]);
          }
        })
        .catch((err) => console.error("Error fetching NGOs:", err));
    } else {
      setNgos([]);
    }
  }, [city]);

  const addItem = () => setItems([...items, { category: "", quantity: "" }]);

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city || !ngoName || !donorName) {
      alert("Please fill City, NGO Name, and Donor Name");
      return;
    }

    // Prepare array of donations
    const payload = items.map((item) => ({
      city,
      ngo_name: ngoName,
      donor_name: donorName, // <-- now included
      category: item.category,
      quantity: parseInt(item.quantity),
    }));

    try {
      await axios.post("http://localhost:8082/ngo/books-donation", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSubmitted(true);
      setCity("");
      setNgoName("");
      setDonorName(""); // reset donor name
      setItems([{ category: "", quantity: "" }]);
    } catch (err) {
      console.error("Error submitting donation:", err);
      alert("Failed to submit donation. Please try again later.");
    }
  };

  return (
    <div className="books-donation-bg">
      <div className="books-donation-card">
        <h2 className="form-title">📚 Books Donation</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label>
              Donor Name:
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
              />
            </label>

            <label>
              City:
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select City</option>
                <option value="Nashik">Nashik</option>
                <option value="Sinnar">Sinnar</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </label>

            <label>
              NGO Name:
              <select
                value={ngoName}
                onChange={(e) => setNgoName(e.target.value)}
                required
                disabled={!city}
              >
                <option value="">
                  {city ? "Select NGO" : "Select City First"}
                </option>
                {ngos.map((ngo, i) => (
                  <option key={i} value={ngo.name}>
                    {ngo.name}
                  </option>
                ))}
              </select>
            </label>

            {items.map((item, index) => (
              <div key={index} className="book-item">
                <h4>📖 Book {index + 1}</h4>
                <label>
                  Category:
                  <select
                    name="category"
                    value={item.category}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Story">Story</option>
                    <option value="Academic">Academic</option>
                    <option value="Reference">Reference</option>
                    <option value="Others">Others</option>
                  </select>
                </label>

                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    min="1"
                    required
                  />
                </label>

                {items.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <div className="form-actions">
              <button type="button" className="add-btn" onClick={addItem}>
                ➕ Add More Books
              </button>
              <button type="submit" className="submit-btn">
                📤 Submit Donation
              </button>
            </div>
          </form>
        ) : (
          <div className="thank-you">
            <h3>🎉 Thank You for Your Kindness!</h3>
            <p>
              Your book donation will bring knowledge and smiles to many
              children.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksDonation;
