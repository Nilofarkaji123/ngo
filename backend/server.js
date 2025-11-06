const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: "YOUR_RAZORPAY_KEY_ID",        // replace with your key
    key_secret: "YOUR_RAZORPAY_SECRET"     // replace with your secret
});

app.post("/create-order", async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, // in smallest currency unit (paise)
        currency: currency || "INR",
        receipt: `receipt_${Date.now()}`
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
