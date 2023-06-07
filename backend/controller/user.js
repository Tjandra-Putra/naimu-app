const express = require("express");
const path = require("path");
const User = require("../model/user");
const Product = require("../model/product");
const ErrorHandler = require("../utils/errorHandler");
const router = express.Router();
const fs = require("fs");
const { upload } = require("../multer");
const { uploadImage } = require("../cloudinary");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticatedUser } = require("../middleware/auth");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// =============================== send email confirmation before create ===============================
router.post("/create-user", upload.single("avatarFile"), async (req, res, next) => {
  try {
    const { fullName, email, password, birthday } = req.body; // coming from frontend, these propertieshave to follow client side
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      // note: return res is used to stop the code for frontend
      res.status(400).json({
        success: false,
        message: "User already exists",
      });

      // note: return next is used to stop the code for backend
      return next(new ErrorHandler("User already exists", 400));
    }

    // save to cloudinary
    const result = await uploadImage(req.file);

    // these properties have to follow the model: for cloudinary production
    const user = {
      fullName: fullName,
      email: email,
      password: password,
      birthday: birthday,
      avatar: result.secure_url,
    };

    const activationToken = createActivationToken(user);
    const activationUrl =
      process.env.NODE_ENV !== "PRODUCTION"
        ? `http://localhost:3000/activate/${activationToken}`
        : `https://naimu-app.vercel.app/activate/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Welcome to NAIMU",
        message: `Please click this link to activate your account: \n ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email "${user.email}" to activate your account`,
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

// =============================== activate and create user account ===============================
router.post(
  "/activate",
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
  "/login",
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
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== load user ===============================
router.get(
  "/load-user",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });

        return next(new ErrorHandler("User not found.", 404));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== logout user ===============================
router.get(
  "/logout",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      // localhost
      // res.cookie("token", null, {
      //   expires: new Date(Date.now()),
      //   httpOnly: true,
      //   sameSite: "none",
      //   secure: true,
      // });

      res.status(200).json({
        success: true,
        message: "Logged out.",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== get all users ===============================
router.get(
  "/all-users",
  catchAsyncError(async (req, res, next) => {
    try {
      const users = await User.find();

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== update user profile ===============================
router.put(
  "/update-profile",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, fullName, birthday } = req.body; // coming from frontend, these properties have to follow client side

      const user = await User.findOne({ email }).select("+password"); // .select("+password") is a Mongoose method that specifies that the password field should be included in the retrieved document

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });

        return next(new ErrorHandler("User not found.", 404));
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

      user.email = email;
      user.password = password;
      user.phoneNumber = phoneNumber;
      user.fullName = fullName;
      user.birthday = birthday;

      // update other collections that have user information - Product collection productReviews: fullName, email, phoneNumber, birthday
      await Product.updateMany(
        { "reviews.user._id": req.user.id },
        {
          $set: {
            "reviews.$.user.fullName": fullName,
            "reviews.$.user.email": email,
            "reviews.$.user.phoneNumber": phoneNumber,
            "reviews.$.user.birthday": birthday,
          },
        }
      );

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== update user avatar ===============================
router.put(
  "/update-avatar",
  upload.single("avatarFile"),
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const avatarFile = req.file;

      const result = await uploadImage(avatarFile);

      const user = await User.findByIdAndUpdate(req.user.id, { avatar: result.secure_url }, { new: true });

      console.log(result.secure_url);

      // update avatar in Product collection product_reviews.
      // why? because the avatar in Product collection product_reviews is not updated when the user updates his/her avatar.
      await Product.updateMany(
        { "reviews.user._id": req.user.id },
        { $set: { "reviews.$.user.avatar": result.secure_url } }
      );

      res.status(200).json({
        success: true,
        message: "Avatar updated.",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== update user address ===============================
router.put(
  "/update-addresses",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const addressTypeExist = user.addresses.find((address) => address.addressType === req.body.addressType);

      // if addressTypeExist is true, then it means that the addressType already exists
      if (addressTypeExist) {
        return next(new ErrorHandler(`${req.body.addressType} address already exists.`, 400));
      }

      const addressExist = user.addresses.find((address) => address._id === req.body._id);

      // if addressExist is true, update existing address
      if (addressExist) {
        Object.assign(addressExist, req.body);
        return next(new ErrorHandler("Existing address has been updated.", 400));
      } else {
        // add new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: "Address updated.",
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== delete user address ===============================
router.delete(
  "/delete-address/:addressId",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.addressId; // note where this is getting from: /user/delete-address/:id

      console.log(addressId);

      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return next(new ErrorHandler("Invalid address ID", 400));
      }

      await User.updateOne({ _id: userId }, { $pull: { addresses: { _id: addressId } } }); //  this code updates a single document in the User collection by removing an address object from the addresses array in the document that matches the userId and addressId values.

      const user = await User.findById(userId);

      res.status(200).json({
        success: true,
        message: "Address deleted.",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// =============================== change password ===============================
router.put(
  "/change-password",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body; // coming from frontend, these properties have to follow client side
      const user = await User.findById(req.user.id).select("+password");

      // check if fields are empty
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        // message to the client side via response
        res.status(400).json({
          success: false,
          message: "Please enter old password, new password and confirm new password.",
        });

        return next(new ErrorHandler("Please enter old password, new password and confirm new password.", 400));
      }

      // check if old password is correct
      const isPasswordValid = await user.comparePassword(oldPassword); // this "comparePassword" is a custom method from model/user.js

      if (!isPasswordValid) {
        // message to the client side via response
        res.status(400).json({
          success: false,
          message: "Invalid old password.",
        });

        return next(new ErrorHandler("Invalid old password.", 400));
      }

      // check if new password and confirm new password are the same
      if (newPassword !== confirmNewPassword) {
        // message to the client side via response
        res.status(400).json({
          success: false,
          message: "New password and confirm new password do not match.",
        });

        return next(new ErrorHandler("New password and confirm new password do not match.", 400));
      }

      // note: SUCCESSFUL CASE
      user.password = newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password changed successfully.",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
