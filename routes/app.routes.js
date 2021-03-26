const express = require("express");
const multer = require("multer");
const path = require("path");
const { createBrotliCompress } = require("zlib");

const router = express.Router();

//ROUTE
router.get("/", (req, res, next) => {
  res.render("index.ejs", {
    title: "Home 😊😊",
  });
});

router.get("/about", (req, res, next) => {
  res.render("about.ejs", {
    title: "About-us 😉😉",
  });
});

router.get("/contact", (req, res, next) => {
  res.render("contact.ejs", {
    title: "Contact-us 😋😋",
  });
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/student-img/");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()} -${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
      console.log(req);
    const ext = path.extname(file.originalname);
    if (ext == ".jpg" || ext == ".jpeg" || ext == ".jfif" || ext == ".png") {
      return callback(
        res.status(400).end("only jpg, png, jfif, jpeg are allowed"),
        false
      );
    }
    if (file.size > 10000) {
      return callback(res.status(400).end("file size is too large"), false);
    }
    return callback(null, true);
  },
});
router.post("/message", upload.single("contactImg"), (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  res.send(req.body);
});

module.exports = router;
