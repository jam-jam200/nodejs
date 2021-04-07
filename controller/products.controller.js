//create product
//201 means created
//200 means successful
const fs = require("fs");
const { db } = require("../models/Product");
const Product = require("../models/Product");
const APIError = require("../utils/apiError");
const {
  createProductValidation,
  updateProductValidation,
} = require("../utils/validation");

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = {
      ...req.body,
      productImg: `/product-img/${req.file.filename}`,
    };
    const { error } = createProductValidation(new Product());
    if (error) {
      return next(new APIError(error, 401));
    }
    // const product = await Product.create(req.body)
    const product = await Product.create(newProduct);
    res.status(201).json({
      status: "sucess",
      message: product,
    });
  } catch (error) {
    next(error);
  }
};

//get all product
exports.getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      status: "sucess",
      message: product,
      result: product.length,
    });
  } catch (error) {
    next(error);
  }
};

//get a single product
exports.getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.find({ _id: id });
    res.status(200).json({
      status: "sucess",
      message: product,
    });
  } catch (error) {
    next(error);
  }
  
};

exports.updateProduct = async (req, res, next) => {
  try {
    let updateProduct;
    if (!req.file) {
      updateProduct = {
        ...req.body,
      };
    } else {
      updateProduct = {
        ...req.body,
        productImg: `/product-img/${req.file.filename}`,
      };
    }
    const { error } = updateProductValidation(updateProduct);
    if (error) {
      return next(new APIError(error, 400));
    }

    const product = await Product.findByIdAndUpdate(
      /**
       * you are sending a data from the body, the data from the api is in the req body, the new true means the database should pick the new update and discard the old
       */
      { _id: req.params.id },
      updateProduct,
      { new: true }
    );
    res.status(201).json({
      status: "success",
      message: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const fs = require("fs");
    let productId = req.params.id;
    let myquery = {address: "uploads/product-img/"}
    let deleteCollection = db.collection("products").deleteOne();
    db.query(deleteCollection, (err)=>{
      if (err) {
        return res.status(500).send(err);
        fs.unlink("uploads/product-img/" + productId + ".jpg", (err)=>{
          return 
        })

      }
    })
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message: "product has been deleted",
      product,
    });
  } catch (error) {
    next(error);
  }
};
