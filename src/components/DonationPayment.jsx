import React from "react";

const DonationPayment = ({ amount }) => {
  const handlePayment = () => {
    const options = {
      key: "rzp_test_YourKeyHere", // Replace with your Razorpay key
      amount: amount * 100, // in paise
      currency: "INR",
      name: "HelpingHand NGO",
      description: "Donation",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#27ae60",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>Donate ₹{amount}</button>
    </div>
  );
};

export default DonationPayment;
