const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async ({ email, otpToSend }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amaansbackup@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: "amaansbackup@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otpToSend}. This is valid for the next 10 minutes. Please dont share this with anyone.`,
    };

    // the function implicitly exectures the inner function to send the mail to the user as per the give email address
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error; // explicitly throw an error which is being catched further down the fucntion call
      }
      console.log("OTP sent");
    });
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = mailSender;
