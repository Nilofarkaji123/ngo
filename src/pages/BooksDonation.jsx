import React, { useState } from "react";
import axios from "axios";
import "./BooksDonation.css";

const BooksDonation = () => {
  const [ngoName, setNgoName] = useState("");
  const [items, setItems] = useState([{ category: "", quantity: "" }]);
  const [submitted, setSubmitted] = useState(false);

  const addItem = () => {
    setItems([...items, { category: "", quantity: "" }]);
  };

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
    if (!ngoName) {
      alert("Please enter NGO Name");
      return;
    }

    try {
      await axios.post("http://localhost:8082/ngo/books-donation", {
        ngoName,
        items,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting donation:", err);
      alert("Failed to submit donation. Check backend connection.");
    }
  };

  return (
    <div className="books-donation-container">
      <h2>Books Donation</h2>
      {!submitted ? (
        <form className="books-donation-form" onSubmit={handleSubmit}>
          <label>
            NGO Name:
            <input
              type="text"
              value={ngoName}
              onChange={(e) => setNgoName(e.target.value)}
              required
            />
          </label>

          {items.map((item, index) => (
            <div key={index} className="book-item">
              <h4>Book {index + 1}</h4>
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
                <button type="button" onClick={() => removeItem(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addItem} className="add-btn">
            Add Another Book
          </button>
          <button type="submit" className="submit-btn">
            Submit Donation
          </button>
        </form>
      ) : (
        <div className="thank-you">
          <h3>Thank you for your donation!</h3>
          <p>Your book donation will reach the children soon.</p>
        </div>
      )}
    </div>
  );
};

export default BooksDonation;
