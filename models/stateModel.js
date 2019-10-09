const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  state: {
    type: String,
    unique: true,
    required: [true, "There must be a state"],
    uppercase: true
  },
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

stateSchema.pre(/^find/, function(next) {
  this.populate({
    path: "city"
  });

  next();
});

module.exports = State = mongoose.model("State", stateSchema);
