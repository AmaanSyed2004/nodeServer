//todo: implement middleware to check role of the user accessing a path, to be used in verifying and sending invitation emails
const jwt= require('jsonwebtoken')
//plan: use jwt to get info about the user attempting to send the invitation 
const verifyUser = (req, res, next) => {
  jwt.verify(req.cookies.authToken, process.env.ACCESS_SECRET, (err,user)=>{
    if (err) return res.status(404).json({message: 'No token, Please login first'})
    if (!user.role==='client-user') return res.status(403).json({message: 'Invalid role, try an account with super admin role'})
    return next();
  })
};

const verifyAdmin = (req, res, next) => {
  jwt.verify(req.cookies.authToken, process.env.ACCESS_SECRET, (err,user)=>{
    if (err) return res.status(404).json({message: 'No token, Please login first'})
    if (!user.role==='client-admin') return res.status(403).json({message: 'Invalid role, try an account with super admin role'})
    return next();
  })
};

const verifySuper= (req,res,next)=>{
  jwt.verify(req.cookies.authToken, process.env.ACCESS_SECRET, (err,user)=>{
    if (err) return res.status(404).json({message: 'No token, Please login first'})
    if (!user.role==='super-admin') return res.status(403).json({message: 'Invalid role, try an account with super admin role'})
    return next();
  })
}
module.exports = { verifyAdmin, verifyUser, verifySuper };