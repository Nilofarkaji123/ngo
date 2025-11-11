import React, { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import "./MoneyDonation.css";

const MoneyDonation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  // Load Razorpay script dynamically
  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Generate PDF receipt after successful payment
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Helping Universe NGO", 60, 20);
    doc.setFontSize(14);
    doc.text("Donation Receipt", 80, 35);

    doc.setFontSize(12);
    doc.text(`Donor Name: ${name}`, 20, 60);
    doc.text(`Email: ${email}`, 20, 70);
    doc.text(`Amount Donated: ₹${amount}`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 90);
    doc.text("Thank you for your generous support!", 20, 110);

    doc.save(`Donation_Receipt_${name}.pdf`);
  };

  // Handle donation payment
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!name || !email || !amount || amount <= 0) {
      alert("Please fill all fields with valid data");
      return;
    }

    // Load Razorpay checkout script
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // ✅ Create order on backend (POST JSON)
      const orderResponse = await axios.post(
        "https://georgene-croakier-tasha.ngrok-free.dev/ngo/create-order",
        { amount: parseInt(amount) }, // Ensure number
        { headers: { "Content-Type": "application/json" } }
      );

      const { id: order_id, amount: orderAmount, currency } = orderResponse.data;

      const options = {
        key: "rzp_test_ReQ9r02OUUmcZl", // Public Razorpay key
        amount: orderAmount,
        currency,
        name: "Helping Universe NGO",
        description: "Donation Transaction",
        order_id: order_id,
        prefill: { name, email },
        theme: { color: "#1e90ff" },

        handler: async function (response) {
          try {
            // ✅ Verify payment on backend
            const verifyResponse = await axios.post(
              "https://georgene-croakier-tasha.ngrok-free.dev/ngo/verify-payment",
              new URLSearchParams({
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
              { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );

            if (verifyResponse.data.status === "success") {
              alert("🎉 Payment Successful!");
              generatePDF();
            } else {
              alert("❌ Payment verification failed!");
            }
          } catch (verifyError) {
            console.error("Verification error:", verifyError);
            alert("❌ Payment verification failed due to server error");
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed by user");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Server error:", error);
      alert(
        "❌ Server error occurred while creating order. Make sure backend is running."
      );
    }
  };

  return (
    <div className="money-donation-container">
      <h2>💰 Money Donation</h2>
      <p>Your small contribution can make a big difference 🌍</p>

      <form className="money-donation-form" onSubmit={handlePayment}>
        <label>
          Full Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Donation Amount (₹):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </label>

        <button type="submit">Donate Securely via Razorpay 💳</button>
      </form>
    </div>
  );
};

export default MoneyDonation;
