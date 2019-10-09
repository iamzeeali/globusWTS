const mongoose = require("mongoose");

const userTypeSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: [true, "Please provide a user type"]
  }
});

module.exports = UserType = mongoose.model("UserType", userTypeSchema);
