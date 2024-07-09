const OTP = require("../models/otp");

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }
  const entry = await OTP.findOne({ email, otp });

  if (!entry) {
    return res.status(401).json({message: "Invalid OTP"});
  }
  res.status(200).json({message: "OTP Verified!"})
};

module.exports= verifyOTP
