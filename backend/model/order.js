const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    orderItems: {
      type: Array,
      required: true,
    },
    billingInfo: {
      type: Object,
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      paymentMethod: {
        type: String,
      },
    },
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
    deliveredAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
