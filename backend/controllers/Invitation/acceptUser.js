const invitation = require("../../models/inviteCodes");
const User = require("../../models/user");
const register = require("../../utils/register");
//todo: validate the code/token , and then proceed the user to register.
const acceptUser = async (req, res) => {
  const { email, token } = req.body;
  const invitedUser = await invitation.findOne({ email });
  if (!invitedUser) {
    return res.status(404).json({ message: "The email can't be found." });
  }
  if (!(token===invitedUser.inviteCode)){
    return res.status(403).json({message:"Invalid invite code. Please try again."})
  }
  req.body.role= 'client-user'
  req.body.inviter= invitedUser.invitedBy;
  await register(req,res);
};
module.exports= acceptUser