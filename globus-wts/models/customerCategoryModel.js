const mongoose = require("mongoose");

const customerCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "There must be a customer category"],
    unique: true
  }
});

module.exports = CustomerCategory = mongoose.model(
  "CustomerCategory",
  customerCategorySchema
);
