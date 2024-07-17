//todo: implement middleware to check role of the user accessing a path, to be used in verifying and sending invitation emails
const jwt= require('jsonwebtoken')
//plan: use jwt to get info about the user attempting to send the invitation 
const verifyUser = (req, res, next) => {
  if (req.user.role.includes("client-user")) {
    return next();
  }
  return res.status(401).json({ message: "User role not found" });
};

const verifyAdmin = (req, res, next) => {
  console.log(req)
  jwt.verify(req.cookies.authToken, process.env.ACCESS_SECRET, (err,user)=>{
    if (err) return res.status(403).json({message: 'No token, Please login first'})
    console.log(user)
  })
  return res.status(401).json({ message: "Admin role not found" });
};

const verifySuper= (req,res,next)=>{
  console.log(req)
  jwt.verify(req.cookies.authToken, process.env.ACCESS_SECRET, (err,user)=>{
    if (err) return res.status(401).json({message: 'No token, Please login first'})
    if (!user.roles.includes('super-admin')) return res.status(403).json({message: 'Invalid role, try an account with super admin role'})
    return next();
  })
}
module.exports = { verifyAdmin, verifyUser, verifySuper };
//idk what to do aage