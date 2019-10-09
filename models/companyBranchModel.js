const mongoose = require("mongoose");

const companyBranchSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
    required: [true, "Please provide a location"]
  },
  state: {
    type: mongoose.Schema.ObjectId,
    ref: "State",
    required: [true, "Please provide a state"]
  },
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    required: [true, "Please provide a city"]
  },
  phone: {
    type: Number,
    min: 10
  },
  address: {
    type: String,
    required: [true, "Please provide branch address"]
  },
  createdDate: {
    type: Date,
    default: Date.now,
    select: false
  }
});

//QUERY MIDDLEWARE
companyBranchSchema.pre(/^find/, function(next) {
  this.populate({
    path: "location",
    select: "-state -city -__v"
  })
    .populate({
      path: "state",
      select: "state"
    })
    .populate({
      path: "city",
      select: "-state -__v"
    });

  next();
});

module.exports = CompanyBranch = mongoose.model(
  "CompanyBranch",
  companyBranchSchema
);
