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
    if (User.findOne({ username })) {
      // username is already taken
      console.log(User.findOne({ username }));
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

const login = async (req, res) => {
  const { username, password } = req.body;
  const userToCheck = await User.findOne({ username });
  if (!userToCheck) {
    res.status(400).json({ message: "Username not found" });
    return;
  }
  const match = await bcrypt.compare(password, userToCheck.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = generateToken(userToCheck);
  res.json({ token });
};
exports.register = register;
exports.login = login;
