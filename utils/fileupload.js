const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/product-img");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500000},
  fileFilter: function (req, file, callback) {
    const fileExtention = path.extname(file.originalname);
    if (
      fileExtention == ".jpg" ||
      fileExtention == ".jpeg" ||
      fileExtention == ".jfif" ||
      fileExtention == ".png"
    ) {
      callback(null, true);
    } else {
      callback(
        "File type not supported, please upload a png, jpg, jpeg,or jfif file format"
      );
    }
  },
});

module.exports = upload;
