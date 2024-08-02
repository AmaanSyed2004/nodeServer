const User = require('../models/user');
const otplib= require('otplib')
const generateToken= require('../utils/token')
const login2FA= async(req,res)=>{
    const {username, OTP}= req.body;
    if (!username) return res.status(400).send("Username Required")
    if (!OTP) return res.status(400).send("OTP is required")
    const user= await User.findOne({username});
    if (!user) return res.status(404).json({message: "User not found"})
    
    const isValid= otplib.authenticator.check(OTP, user.secret)
    if (!isValid) return res.status(403).json({message: "Invalid Token"});
    const token = generateToken(userToCheck);
    res.cookie('authToken',token,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })
    return res.json({ message: "User logged in, info stored in cookie " });
}

mpdule.exports=login2FA