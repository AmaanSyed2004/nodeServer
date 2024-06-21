const jwt= require('jsonwebtoken')
require('dotenv').config();
const checkAuth= (req,res,next)=>{
    const token = req.headers['authorization'].split(' ')[1] // in the form of "Bearer {token}"
    if (!token) return res.status(401).json("Token not found");
    jwt.verify(token, process.env.ACCESS_SECRET,(err,user)=>{
        if (err) return res.status(403).json({message: "Access forbidden, token invalid"});
        req.user= user;
        next();
    })
}
module.exports= checkAuth;