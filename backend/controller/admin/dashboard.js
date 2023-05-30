const express = require("express");
const catchAsyncError = require("../../middleware/catchAsyncError");
const { isAuthenticatedUser, isAdmin } = require("../../middleware/auth");
const Order = require("../../model/order");
const ErrorHandler = require("../../utils/errorHandler");
const mongoose = require("mongoose");
const router = express.Router();

// =============================== get total sales from total orders combined ===============================
router.get(
  "/sales",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const totalSales = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalPrice" },
          },
        },
      ]);

      res.status(200).json({
        success: true,
        totalSales: totalSales.pop().totalSales,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== get montly total sales from total orders combined ===============================
router.get(
  "/monthly-sales",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const monthlySales = await Order.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalSales: { $sum: "$totalPrice" },
          },
        },
      ]);

      res.status(200).json({
        success: true,
        monthlySales,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
