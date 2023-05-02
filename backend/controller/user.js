const express = require("express");
const path = require("path");
const User = require("../model/user");
const ErrorHandler = require("../utils/errorHandler");
const router = express.Router();
const fs = require("fs");
const { upload } = require("../multer");

router.post("/user/create-user", upload.single("avatarFile"), async (req, res, next) => {
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
      } else {
        res.json({
          message: "File deleted successfully",
        });
      }
    });
    return next(new ErrorHandler("User already exists", 400));
  }

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

  console.log(user);

  const newUser = await User.create(user);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    newUser,
  });
});

module.exports = router;
