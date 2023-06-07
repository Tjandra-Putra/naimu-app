const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "naimu-app", // Specify the folder in your Cloudinary account where the files will be stored
    allowed_formats: ["png", "jpg", "jpeg"], // Set the allowed file formats
    // You can add more configuration options here if needed
  },
});

// Create the Multer upload middleware
exports.upload = multer({ storage });
