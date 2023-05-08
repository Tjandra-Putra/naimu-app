const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// allow requests from localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
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

// import routes from controller
const user = require("./controller/user"); // user/create-user
const product = require("./controller/product"); // products

app.use("/api/v1", user); // localhost:8000/api/v1/user/create-user
app.use("/api/v1", product); // localhost:8000/api/v1/products

// app error handler
app.use(ErrorHandler);

module.exports = app;
