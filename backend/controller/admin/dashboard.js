const express = require("express");
const catchAsyncError = require("../../middleware/catchAsyncError");
const { isAuthenticatedUser, isAdmin } = require("../../middleware/auth");
const Order = require("../../model/order");
const Product = require("../../model/product");
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

// =============================== group totalPrice from order based on month and year ===============================
router.get(
  "/monthly-sales",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const monthlySales = await Order.aggregate([
        {
          $group: {
            // _id: { $month: "$createdAt" },
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
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

// =============================== get total pending orders ===============================
router.get(
  "/pending-orders",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const pendingOrders = await Order.find({ orderStatus: "Processing" }).countDocuments();

      res.status(200).json({
        success: true,
        pendingOrders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== get total order delivered ===============================
router.get(
  "/customers",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const customers = await Order.find({ orderStatus: "Delivered" }).countDocuments();

      res.status(200).json({
        success: true,
        customers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== get total products ===============================
router.get(
  "/products",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find().countDocuments();

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== get total unit product sold by brand, month and year from order ===============================
router.get(
  "/products-sold-by-brand",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const productsSoldByBrand = await Order.aggregate([
        {
          $unwind: "$orderItems", // Unwind the orderItems array
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              brand: "$orderItems.shopName",
            },
            totalQuantity: { $sum: "$orderItems.quantity" }, // Calculate total quantity
          },
        },
      ]);

      res.status(200).json({
        success: true,
        productsSoldByBrand,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
