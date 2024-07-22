const OTP = require("../models/otp");
const User = require("../models/user");

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }
  const entry = await OTP.findOne({ email });
  const user = await User.findOne({ email });
  if (!entry) {
    return res
      .status(404)
      .json({
        message: "Account not found, please enter correct email or register.",
      });
  }
  if (!(+entry.otp === +otp)) {
    return res.status(403).json({ message: "Invalid OTP" });
  }

  //User is OTP verified, update the 'verified' instance in user schema
  user.verified = true;

  //spent an hour debugging why isnt the verified field updating and realised i didnt save. Nice
  await user.save();
  res.status(200).json({ message: "OTP Verified!" });
};

module.exports = verifyOTP;
