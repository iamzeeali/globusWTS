const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: [true, "City must belong to a state"],
    unique: true
  },
  state: {
    type: mongoose.Schema.ObjectId,
    ref: "State",
    required: [true, "Please provide a state"]
  }
});

citySchema.pre(/^find/, function(next) {
  this.populate({
    path: "state"
  });

  next();
});

module.exports = City = mongoose.model("City", citySchema);
