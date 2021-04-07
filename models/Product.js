const mongoose = require("mongoose");

//schema can be a validation
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [
        true, 
        "a product can only have one name that cannot be repeated"
    ],
    required: [
      true,
      "a product must have a name.\n Error! name cannot be empty",
    ],
    trim: true,
  },

  price: {
    type: String,
    required: [
      //after the true is a custom error message that mongoose will throw to you if you don't include the specific thing needed
      true,
      "Error! price cannot be empty\n A product must have a price  but no priice was included in this case.",
    ],
    trim: true,
  },

  colour: {
    type: [String],
  },

  size: {
    type: [String],
    required: [true, "a product must have a size"],
  },

  productImg: String,
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
