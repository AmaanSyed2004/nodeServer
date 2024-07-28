const invitation = require("../../models/inviteCodes");
const inviteAdminMail = require("../../utils/sendInviteMail");
const jwt= require('jsonwebtoken')
const inviteAdmin = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(404).json({ message: "Email is required" });
  const token = require("crypto").randomBytes(30).toString("hex");
  let inviterID;
  jwt.verify(req.cookies.authToken, process.env.ACCESS_SECRET, (err,user)=>{
    inviterID= user.id;
  })
  
  const invite = new invitation({
    email,
    role: "client-admin",
    inviteCode: token,
    invitedBy: inviterID, //establishing a relationship to indicate who invited which user. Would've been much easier with sql :P
  });
  await invite.save();
  try {
    await inviteAdminMail({ email, token, role: 'an Admin'});
    return res.status(200).json({ message: "Invitation has been sent" });
  } catch (error) {
    return res.status(500).json({ mesage: "Internal Server error" });
  }
};

module.exports = inviteAdmin;
