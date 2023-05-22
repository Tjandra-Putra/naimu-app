const express = require("express");
const Favourite = require("../model/favourite");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticatedUser } = require("../middleware/auth");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");
const router = express.Router();

// =============================== get all favourites by user id ===============================
router.get(
  "/:userId",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const favourites = await Favourite.find({ "user._id": req.params.userId });

      res.status(200).json({
        success: true,
        favourites,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== remove from favourites based on userId and productId ===============================
router.put(
  "/remove/:productId",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const favourites = await Favourite.findOneAndUpdate(
        { "user._id": req.user.id },
        { $pull: { favouriteItems: { productId: req.params.productId } } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        favourites,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

// =============================== get all favourites ===============================
router.get(
  "/all-favourites",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const favourites = await Favourite.find();

      res.status(200).json({
        success: true,
        favourites,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
