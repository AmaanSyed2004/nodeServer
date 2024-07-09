const otpGenerator = require("otp-generator");
const OTP = require("../models/otp");
const mailSender = require("../utils/mailSender");
const requestOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
  }
  const otpToSend = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const otpEntry= new OTP({email, otpToSend})
  await otpEntry.save()
  try{
    mailSender({email, otpToSend})
    res.status(200).json({message: "OTP sent to " + email})
  }
  catch(err){
    res.status(400).json({message: "Error sending OTP: "+ err})
  }
};

module.exports= requestOtp