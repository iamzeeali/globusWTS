const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    uppercase: true,
    unique: true,
    required: [true, "Please provide an employee Id"]
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"]
  },
  mobile: {
    type: Number,
    required: [true, "Please provide a mobile number"]
  },
  deskNo: {
    type: Number
  },
  email: {
    type: String,
    required: [true, "Please provide employee email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  branch: {
    type: mongoose.Schema.ObjectId,
    ref: "CompanyBranch"
  },
  designation: {
    type: String,
    required: [true, "Please provide employee's designation"]
  },
  department: {
    type: String,
    required: [true, "Please provide employee's department"]
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  createdDate: {
    type: Date,
    default: Date.now,
    select: false
  }
});

//QUERY MIDDLEWARE

employeeSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

employeeSchema.pre(/^find/, function(next) {
  this.populate({
    path: "branch",
    select: "-phone, -__v"
  });
  next();
});

module.exports = Employee = mongoose.model("Employee", employeeSchema);
