const otpGenerator = require("otp-generator");
const OTP = require("../models/otp");
const mailSender = require("../utils/mailSender");
const User = require("../models/user");
const requestOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
  }
  const user= await User.findOne({email})
  if (!user){
    return res.status(404).json({message: "Account not found, please register"})
  }
  if (user.verified){
    return res.status(409).json({message: "Account is already verified"})
  }
  const otpToSend = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  let previousEntry = await OTP.findOne({ email });
  if (!previousEntry) {
    let otpEntry = new OTP({ email, otp: otpToSend });
    await otpEntry.save();
  }
  else{
    //change the old otp sent to the new otp to avoid collisions
    previousEntry.otp= otpToSend;
    await previousEntry.save();
  }
  try {
    mailSender({ email, otpToSend });
    res.status(200).json({ message: "OTP sent to " + email });
  } catch (err) {
    res.status(400).json({ message: "Error sending OTP: " + err });
  }
};

module.exports = requestOtp;
