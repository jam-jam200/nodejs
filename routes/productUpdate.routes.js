const router = require("express").Router();
const upload = require("../utils/fileupload");

const { updateProduct } = require("../controller/products.controller");

router.patch("/update/img/:id", upload.single("productImg"), updateProduct);
