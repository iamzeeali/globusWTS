const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Please provide address details"]
  },
  pinCode: {
    type: Number,
    min: 5,
    required: [true, "Please Provide a pin"]
  },
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    required: [true, "Please provide a city"]
  },
  state: {
    type: mongoose.Schema.ObjectId,
    ref: "State",
    required: [true, "Please provide a state"]
  },
  createdBy: { type: String, select: false },
  createdDate: {
    type: Date,
    default: Date.now,
    select: false
  },
  modifiedBy: { type: String, select: false },
  modifiedDate: Date
});

//QUERY MIDDLEWARE
locationSchema.pre(/^find/, function(next) {
  this.populate({
    path: "state",
    select: "state "
  }).populate({
    path: "city",
    select: "-state -__v"
  });

  next();
});

module.exports = Location = mongoose.model("Location", locationSchema);
