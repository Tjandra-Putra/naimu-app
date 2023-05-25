const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
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

// =============================== get all orders for a specific user ===============================
router.get(
  "/get-orders/:userId",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== get order by id ===============================
router.get(
  "/get-order/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found", 404));
      }
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
