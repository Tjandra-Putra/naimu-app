const express = require("express");
const path = require("path");
const User = require("../model/user");
const ErrorHandler = require("../utils/errorHandler");
const router = express.Router();
const fs = require("fs");
const { upload } = require("../multer");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncError");

// =============================== send email confirmation before create ===============================
router.post("/user/create-user", upload.single("avatarFile"), async (req, res, next) => {
  try {
    const { fullName, email, password, birthday } = req.body; // coming from frontend, these propertieshave to follow client side
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const fileName = req.file.filename;
      const filePath = `public/uploads/${fileName}`;

      // note: fs.unlink is used to delete file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Error deleting file",
          });
        }
      });

      // note: return res is used to stop the code for frontend
      res.status(400).json({
        success: false,
        message: "User already exists",
      });

      // note: return next is used to stop the code for backend
      return next(new ErrorHandler("User already exists", 400));
    }

    // note: SUCCESSFUL CASE
    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);

    // these properties have to follow the model
    const user = {
      fullName: fullName,
      email: email,
      password: password,
      birthday: birthday,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activate/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Welcome to NAIMU",
        message: `Please click this link to activate your account: \n ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: "5m" });
};

// =============================== activate user account ===============================
router.post(
  "/user/activate",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body; // coming from frontend, these properties have to follow client side

      const newUser = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { fullName, email, password, birthday, avatar } = newUser;

      // check if user exists
      let user = await User.findOne({ email });

      // to prevent user from spamming create when refreshing the url on the browser
      if (user) {
        // note: return res is used to stop the code for frontend
        res.status(400).json({
          success: false,
          message: "User already exists",
        });

        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        fullName,
        email,
        password,
        birthday,
        avatar,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== login user ===============================
router.post(
  "/user/login",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body; // coming from frontend, these properties have to follow client side

      if (!email || !password) {
        // message to the client side via response
        res.status(400).json({
          success: false,
          message: "Please enter email and password",
        });

        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        // message to the client side via response
        res.status(400).json({
          success: false,
          message: "User does not exist.",
        });

        return next(new ErrorHandler("User does not exist.", 400));
      }

      const isPasswordValid = await user.comparePassword(password); // this "comparePassword" is a custom method from model/user.js

      if (!isPasswordValid) {
        // message to the client side via response
        res.status(400).json({
          success: false,
          message: "Invalid password.",
        });

        return next(new ErrorHandler("Invalid password.", 400));
      }

      // note: SUCCESSFUL CASE
      // res.status(201).json({
      //   success: true,
      //   message: "Login successful.",
      // });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
