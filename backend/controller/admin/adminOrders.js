const express = require("express");
const catchAsyncError = require("../../middleware/catchAsyncError");
const { isAuthenticatedUser, isAdmin } = require("../../middleware/auth");
const Order = require("../../model/order");
const Product = require("../../model/product");
const User = require("../../model/user");
const ErrorHandler = require("../../utils/errorHandler");
const router = express.Router();

// =============================== get all customer orders ===============================
router.get(
  "/all-orders",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({}).sort("-createdAt");

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
