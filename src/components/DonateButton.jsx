import React from "react";
import axios from "axios";

const DonateButton = () => {
  const handlePayment = async () => {
    try {
      // 1️⃣ Create order on backend
      const { data } = await axios.post("http://localhost:5000/create-order", { amount: 500 }); // ₹500 donation

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: "YOUR_KEY_ID", // Test Key ID
        amount: data.amount,
        currency: data.currency,
        name: "NGO-CONNECT",
        description: "Donation",
        order_id: data.id,
        handler: function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          // Optionally, save payment info to database
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: { color: "#4169E1" } // Royal Blue
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again!");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{ padding: "8px 15px", backgroundColor: "#87CEEB", color: "#003B8E", border: "none", borderRadius: "5px", cursor: "pointer" }}
    >
      💖 Donate Now
    </button>
  );
};

export default DonateButton;
