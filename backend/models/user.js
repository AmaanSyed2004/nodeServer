const mongoose = require("mongoose");
const validator = require("validator");
const { v7: uuidv7 } = require("uuid");
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv7,
  },
  username: {
    required: true,
    type: String,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter correct email"],
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: String,
  pincode: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  invitedBy: {
    type: String,
    required: true,
  },
  secret:{
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
