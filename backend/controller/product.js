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

      const isReviewed = product.reviews.find((review) => review.user._id === req.user.id);

      if (isReviewed) {
        // User has already submitted a review will updat existing review
        return res.status(400).json({
          success: false,
          message: "You have already submitted a review for this product",
        });
      }

      product.reviews.push({
        user: {
          _id: req.user.id,
          fullName: req.user.fullName,
          email: req.user.email,
          role: req.user.role,
          avatar: req.user.avatar,
        },
        rating,
        title,
        comment,
        recommend,
      });

      let average = 0;

      product.reviews.forEach((review) => {
        average += review.rating;
      });

      product.rating = average / product.reviews.length;

      await product.save();

      // when review is created we need to update and create the field in the Order model that the product has been reviewed with "isReviewed" field
      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "orderItems.$[item].isReviewed": true } }, // creating a new field
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

// =============================== create product ===============================
router.post(
  "/create-product",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const {
        title,
        brand,
        category,
        productImagesUrl,
        price,
        discountedPrice,
        brandImageUrl,
        quantityInStock,
        description,
      } = req.body;

      console.log(req.body);

      // get comma separated productImagesUrl and store into array of objects
      const productImagesSplit = productImagesUrl.split(",");
      const productImagesArray = [];

      productImagesSplit.forEach((image) => {
        productImagesArray.push({
          url: image,
        });
      });

      const product = await Product.create({
        title,
        shop: {
          name: brand,
          avatar: {
            url: brandImageUrl,
          },
          ratings: 0,
        },
        category,
        imageUrl: productImagesArray,
        price,
        discountPrice: discountedPrice,
        quantityInStock,
        description,
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
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

// =============================== delete product ===============================
router.delete(
  "/delete-product/:id",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await Product.deleteOne({ _id: product._id });

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== update product ===============================
router.put(
  "/update-product/:id",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const {
        title,
        brand,
        category,
        productImagesUrl,
        price,
        discountedPrice,
        brandImageUrl,
        quantityInStock,
        description,
      } = req.body;

      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // get comma separated productImagesUrl and store into array of objects
      // const productImagesSplit = productImagesUrl.split(",");
      // const productImagesArray = [];

      // productImagesSplit.forEach((image) => {
      //   productImagesArray.push({
      //     url: image,
      //   });
      // });

      product.title = title;
      product.shop.name = brand;
      product.category = category;
      // product.imageUrl = productImagesArray;
      product.price = price;
      product.discountPrice = discountedPrice;
      product.shop.avatar.url = brandImageUrl;
      product.quantityInStock = quantityInStock;
      product.description = description;

      await product.save();

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== make product published toggle ===============================
router.put(
  "/publish-product/:id",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    let message = "";

    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.published = !product.published;

      if (product.published) {
        message = "Product published successfully";
      }

      if (!product.published) {
        message = "Product unpublished successfully";
      }

      await product.save();

      res.status(200).json({
        success: true,
        message: message,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
