const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    uppercase: true
  },
  productName: {
    type: String,
    required: [true, "There must be a name for product"],
    unique: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("Product", productSchema);
