const router = require("express").Router();
const upload = require("../utils/fileupload");

const {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require("../controller/products.controller");

router.post("/create", upload.single('productImg'), createProduct);

router.get("/", getAllProduct);

router.get("/:id", getSingleProduct);

router.patch("/update/:id", upload.single('productImg'), updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;