const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticatedUser } = require("../middleware/auth");
const Order = require("../model/order");

// =============================== create new order ===============================
router.post(
  "/create-order",
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, orderItems, billingInfo, paymentInfo, totalPrice } = req.body;
      const order = await Order.create({
        user: user,
        orderItems,
        billingInfo,
        paymentInfo,
        totalPrice,
        paidAt: Date.now(),
      });
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
