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
      roles,
    } = req.body; //destructring
    if (await User.findOne({ username })) {
      // username is already taken
      res
        .status(400)
        .json({ message: "Username already exists, please try again" });
      return;
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
      roles,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = register;
