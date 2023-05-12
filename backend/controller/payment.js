// https://dashboard.stripe.com/test/developers

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticatedUser } = require("../middleware/auth");

// =============================== create payment intent ===============================
router.post(
  "/create-payment-intent",
  catchAsyncError(async (req, res, next) => {
    const { amount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: { company: "Naimu" },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  })
);

// =============================== get stripe api key ===============================
router.get(
  "/stripe-api-key",
  catchAsyncError(async (req, res, next) => {
    res.status(200).json({
      success: true,
      stripeApiKey: process.env.STRIPE_API_KEY, // publishable key from dashboard.stripe.com/test/developers
    });
  })
);

module.exports = router;
