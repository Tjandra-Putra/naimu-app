const express = require("express");
const User = require("../model/user");
const ErrorHandler = require("../utils/errorHandler");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
const PromoCode = require("../model/promoCode");

// =============================== create promo code ===============================
router.post(
  "/create",
  isAdmin("admin"),
  catchAsyncError(async (req, res, next) => {
    const { code, discount, expiryDate } = req.body;
    const newPromoCode = {
      code,
      discount,
      expiryDate,
    };

    try {
      const promoCodeExist = await PromoCode.find({ code: code });

      if (promoCodeExist.length > 0) {
        return next(new ErrorHandler("Promo code already exists", 400));
      }

      const promoCode = await PromoCode.create(newPromoCode);

      res.status(201).json({
        success: true,
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

module.exports = router;
