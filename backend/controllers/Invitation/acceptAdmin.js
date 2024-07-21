const invitation = require("../../models/inviteCodes");
const User = require("../../models/user");
const register = require("../register");
//todo: validate the code/token , and then proceed the user to register.
const acceptAdmin = async (req, res) => {
  const { email, token } = req.body;
  const invitedUser = await invitation.findOne({ email });
  if (!invitedUser) {
    return res.status(404).json({ message: "The email can't be found." });
  }
  if (!(token===invitedUser.inviteCode)){
    return res.status(403).json({message:"Invalid invite code. Please try again."})
  }
  req.body.role= 'client-admin'
  await register(req,res);
};
module.exports= acceptAdmin