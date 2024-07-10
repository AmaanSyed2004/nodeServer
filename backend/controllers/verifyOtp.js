const OTP = require("../models/otp");
const User = require("../models/user");

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }
  const entry = await OTP.findOne({ email});
  const user = await User.findOne({ email });
  if (!entry) {
    return res.status(404).json({ message: "Email not found" });
  }
  if (!(+entry.otp===+otp)){
    return res.status(403).json({message: "Invalid OTP"})
  }
  if (user.verified){
    res.status(200).json({message: "Email is already verified"})
  }

  //User is OTP verified, update the 'verified' instance in user schema
  user.verified = true;
  await user.save();
  res.status(200).json({ message: "OTP Verified!" });
};

module.exports = verifyOTP;
