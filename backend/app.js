const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("public/uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  // dev
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes from controller
const user = require("./controller/user"); // user/create-user

app.use("/api/v2", user); // localhost:8000/api/v2/user/create-user

// app error handler
app.use(ErrorHandler);

module.exports = app;
