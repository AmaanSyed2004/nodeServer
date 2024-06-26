const bcrypt= require('bcrypt')
const User= require('../models/user');
const generateToken = require('../utils/token');

const login = async (req, res) => {
    const { username, password } = req.body;
    const userToCheck = await User.findOne({ username });
    if (!userToCheck) {
      res.status(401).json({ message: "Username not found" });
      return;
    }
    const match = await bcrypt.compare(password, userToCheck.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken(userToCheck);
    res.cookie('authToken',token,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })
    res.json({ message: "User logged in, info stored in cookie " });
  };
module.exports= login;