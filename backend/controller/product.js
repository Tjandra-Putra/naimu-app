const express = require("express");
const Product = require("../model/product");
const catchAsyncError = require("../middleware/catchAsyncError");
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

module.exports = router;
