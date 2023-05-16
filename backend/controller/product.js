const express = require("express");
const Product = require("../model/product");
const Order = require("../model/order");
const catchAsyncError = require("../middleware/catchAsyncError");
const { validate } = require("../model/product");
const { isAuthenticatedUser } = require("../middleware/auth");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");
const router = express.Router();

// =============================== get all products ===============================
router.get(
  "/all-products",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find();

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== review product ===============================
router.put(
  "/review-product",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, rating, title, comment, recommend, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      const isReviewed = product.product_reviews.find((review) => review.user._id === req.user.id);

      if (isReviewed) {
        // User has already submitted a review will updat existing review
        return res.status(400).json({
          success: false,
          message: "You have already submitted a review for this product",
        });
      }

      product.product_reviews.push({
        user: {
          _id: req.user.id,
          fullName: req.user.fullName,
          email: req.user.email,
          phoneNumber: req.user.phoneNumber,
          role: req.user.role,
          avatar: req.user.avatar,
          birthday: req.user.birthday,
          createdAt: req.user.createdAt,
          addresses: req.user.addresses,
        },
        rating,
        title,
        comment,
        recommend,
      });

      let average = 0;

      product.product_reviews.forEach((review) => {
        average += review.rating;
      });

      product.product_rating = average / product.product_reviews.length;

      await product.save();

      // when review is created we need to update and create the field in the Order model that the product has been reviewed with "isReviewed" field
      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "orderItems.$[item].isReviewed": true } },
        { arrayFilters: [{ "item._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Review added successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== get single product ===============================
router.get(
  "/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
