const multer = require("multer");

// storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    // const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    // cb(null, uniqueName);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname.split(".")[0];
    cb(null, fileName + "-" + uniqueSuffix + ".png");
  },
});

exports.upload = multer({ storage: storage });
