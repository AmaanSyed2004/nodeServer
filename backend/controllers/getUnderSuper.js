const User = require("../models/user");

const getUnderSuper= async(req,res)=>{
    const {email}= req.body;
    if (!email) return res.status(400).json({message: "Email is required."})
    const superToSee= await User.findOne({email});
    const invitedBy= superToSee.id;
    const adminsUnderSuper= await User.find({invitedBy});
    if (!adminsUnderSuper) return res.status(404).json(({message: "No admins found under this super admin."}))
    return res.status(200).json(adminsUnderSuper);
}