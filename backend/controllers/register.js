const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/token");
const saltRounds = 10; // salt rounds for bcrypt
const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      mobileNumber,
      addressLine1,
      addressLine2,
      pincode,
      role,
    } = req.body; //destructring
    if (await User.findOne({ username })) {
      // username is already taken
      res
        .status(400)
        .json({ message: "Username already exists, please try again" });
      return;
    }
    if (await User.findOne({email})){
      return res.status(400).json({message: "Email is already registered"});
    }
    if (await User.findOne({mobileNumber})){
      return res.status(400).json({message: "Mobile number already in use."});
    }
    const hashedPW = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      password: hashedPW,
      email,
      mobileNumber,
      addressLine1,
      addressLine2,
      pincode,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = register;
