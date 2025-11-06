import React, { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import "./MoneyDonation.css";

const MoneyDonation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!name || !email || !amount) {
      alert("Please fill all fields");
      return;
    }

    // Load Razorpay script dynamically
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    try {
      // Create order on backend
      const orderResponse = await axios.post("http://localhost:5000/create-order", {
        amount,
      });

      const { id: order_id, amount: orderAmount, currency } = orderResponse.data;

      const options = {
        key: "rzp_test_1234567890abcdef", // 🧠 Replace with your Razorpay Test Key
        amount: orderAmount,
        currency,
        name: "Helping Universe NGO",
        description: "Donation Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            donor: { name, email, amount },
          };

          const verifyResponse = await axios.post("http://localhost:5000/verify-payment", data);

          if (verifyResponse.data.status === "success") {
            alert("🎉 Payment Successful!");
            generatePDF();
          } else {
            alert("❌ Payment verification failed!");
          }
        },
        prefill: {
          name,
          email,
        },
        theme: {
          color: "#1e90ff",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

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
    doc.text("Thank you for your contribution!", 20, 110);

    doc.save(`Donation_Receipt_${name}.pdf`);
  };

  return (
    <div className="money-donation-container">
      <h2>💰 Money Donation</h2>
      <p>Your small contribution can make a big difference 🌍</p>

      <form className="money-donation-form" onSubmit={handlePayment}>
        <label>
          Full Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Donation Amount (₹):
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <button type="submit">Donate Securely via Razorpay 💳</button>
      </form>
    </div>
  );
};

export default MoneyDonation;
