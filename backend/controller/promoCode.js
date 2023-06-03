const express = require("express");
const User = require("../model/user");
const ErrorHandler = require("../utils/errorHandler");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
const PromoCode = require("../model/promoCode");

// =============================== get all promocodes ===============================
router.get(
  "/all-promo-codes",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const promoCodes = await PromoCode.find();

      res.status(200).json({
        success: true,
        promoCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// =============================== create promo code ===============================
router.post(
  "/create",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    const { code, discount, expiryDate, selectedProduct } = req.body;

    // add productId property to selectedProduct array items
    processedSelectedProduct = selectedProduct.map((productId) => {
      return { productId };
    });

    const newPromoCode = {
      code,
      discount,
      expiryDate,
      selectedProduct: processedSelectedProduct,
    };

    try {
      const promoCodeExist = await PromoCode.find({ code: code });

      if (promoCodeExist.length > 0) {
        return next(new ErrorHandler("Promo code already exists", 400));
      }

      const promoCode = await PromoCode.create(newPromoCode);

      res.status(201).json({
        success: true,
        message: "Promo code created successfully",
        promoCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// =============================== get promo code by code name ===============================
router.get(
  "/:code",
  catchAsyncError(async (req, res, next) => {
    try {
      const promoCode = await PromoCode.find({ code: req.params.code });

      if (promoCode.length === 0) {
        return next(new ErrorHandler("Promo code not found", 404));
      }

      res.status(200).json({
        success: true,
        promoCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// =============================== delete promocode ===============================
router.delete(
  "/:id",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const promoCode = await PromoCode.findById(req.params.id);

      if (!promoCode) {
        return next(new ErrorHandler("Promo code not found", 404));
      }

      await PromoCode.deleteOne({ _id: promoCode._id });

      res.status(200).json({
        success: true,
        message: "Promo code deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// =============================== update promocode ===============================
router.put(
  "/:id",
  isAuthenticatedUser,
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    const { code, discount, expiryDate, selectedProduct } = req.body;

    // add productId property to selectedProduct array items
    const processedSelectedProduct = selectedProduct.map((obj) => {
      return { productId: obj.productId };
    });

    const newPromoCode = {
      code,
      discount,
      expiryDate,
      selectedProduct: processedSelectedProduct,
    };

    try {
      const promoCode = await PromoCode.findById(req.params.id);

      if (!promoCode) {
        return next(new ErrorHandler("Promo code not found", 404));
      }

      await PromoCode.updateOne({ _id: promoCode._id }, newPromoCode);

      // Retrieve the updated promo code after the update operation
      const updatedPromoCode = await PromoCode.findById(req.params.id);

      res.status(200).json({
        success: true,
        message: "Promo code updated successfully",
        promoCode: updatedPromoCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
