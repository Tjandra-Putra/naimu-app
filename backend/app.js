const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// allow requests from localhost:3000
const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "https://naimu-app.vercel.app/",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/", express.static("public/uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // extracts the body of an incoming HTTP request and makes it available in the req.body object of the subsequent handlers.

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  // dev
  require("dotenv").config({
    path: "config/.env",
  });
}

// user routes
const user = require("./controller/user");
const product = require("./controller/product");
const promoCode = require("./controller/promoCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const favourite = require("./controller/favourite");

// admin routes
const adminDashboard = require("./controller/admin/adminDashboard");
const adminOrders = require("./controller/admin/adminOrders");

// routes
app.use("/api/v1/user", user); // localhost:8000/api/v1/user/create-user
app.use("/api/v1/product", product); // localhost:8000/api/v1/products
app.use("/api/v1/promo-code", promoCode); // localhost:8000/api/v1/promo-code
app.use("/api/v1/payment", payment); // localhost:8000/api/v1/payment
app.use("/api/v1/order", order); // localhost:8000/api/v1/order
app.use("/api/v1/favourite", favourite); // localhost:8000/api/v1/favourite

// admin routes
app.use("/api/v1/admin/dashboard", adminDashboard); // localhost:8000/api/v1/admin/dashboard
app.use("/api/v1/admin/orders", adminOrders); // localhost:8000/api/v1/admin/orders

// app error handler
app.use(ErrorHandler);

module.exports = app;
