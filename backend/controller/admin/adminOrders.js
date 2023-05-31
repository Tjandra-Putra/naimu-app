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
  "/",
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

// =============================== get customer order by order id ===============================
router.get(
  "/:id",
  isAuthenticatedUser,
  isAdmin("admin"),
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

// =============================== update order status ===============================
router.put(
  "/:id",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found", 404));
      }

      // if (order.orderStatus === "Delivered") {
      //   return next(new ErrorHandler("You have already delivered this order", 400));
      // }

      // order.orderItems.forEach(async (item) => {
      //   await updateStock(item.product, item.quantity);
      // });

      order.orderStatus = req.body.status;
      order.deliveredAt = Date.now();

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order status updated",
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
