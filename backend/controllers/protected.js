const User= require('../models/user')
const protected= async (req,res)=>{
  try{
    console.log(req.user)
    const user = await User.findOne({id: req.user.userID}).select('-password');
    if (!user) res.status(404).json({message: "User Not found"});
    res.json({isAuth: true, user});
  }
  catch(error){
    res.sendStatus(500);
  }
}
module.exports=protected