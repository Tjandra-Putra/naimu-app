const app = require("./app");
const connectDatabase = require("./database/database");

// handle uncaught exceptions
process.on("uncaughtException", (err) => (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  // dev
  require("dotenv").config({
    path: "config/.env",
  });
}

// connect database
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
