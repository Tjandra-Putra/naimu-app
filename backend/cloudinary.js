const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to handle image uploads to Cloudinary
exports.uploadImage = function (file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, { folder: "naimu-app" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
