const express = require("express");
const app = express();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  // dev
  require("dotenv").config({
    path: "config/.env",
  });
}

module.exports = app;
