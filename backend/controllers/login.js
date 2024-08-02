const bcrypt= require('bcrypt')
const User= require('../models/user');

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
    return res.status(200).json({message: "Password verified, proceed to 2FA."})
  };
module.exports= login;