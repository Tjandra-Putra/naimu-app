const express = require("express");
const catchAsyncError = require("../../middleware/catchAsyncError");
const { isAuthenticatedUser, isAdmin } = require("../../middleware/auth");
const Order = require("../../model/order");
const Product = require("../../model/product");
const User = require("../../model/user");
const ErrorHandler = require("../../utils/errorHandler");
const router = express.Router();

// =============================== delete product by id ===============================

module.exports = router;
