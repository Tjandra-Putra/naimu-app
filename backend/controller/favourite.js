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

// =============================== add to favourites ===============================
router.post(
  "/add-to-favourites",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const { productId, shopName, price, discountPrice, title, imageUrl, unitSold, rating } = req.body;

      const favourites = await Favourite.findOne({ "user._id": req.user.id });

      const item = {
        productId,
        shop: {
          name: shopName,
        },
        price,
        discountPrice,
        title,
        imageUrl,
        unitSold,
        rating,
      };

      if (favourites) {
        const isProductExist = favourites.favouriteItems.find((i) => i.productId === productId);

        if (isProductExist) {
          return next(new ErrorHandler("Product already exist", 400));
        }

        favourites.favouriteItems.push(item);
        await favourites.save();
      }
      // note: if favourites is not exist, create new favourites
      else {
        const favourite = await Favourite.create({
          user: {
            _id: req.user.id,
            email: req.user.email,
          },
          favouriteItems: [item],
        });
        await favourite.save();
      }

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
