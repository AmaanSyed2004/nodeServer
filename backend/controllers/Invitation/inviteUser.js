const invitation = require("../../models/inviteCodes");
const inviteAdminMail = require("../../utils/sendInviteMail");
const jwt= require('jsonwebtoken')
const inviteUser = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(404).json({ message: "Email is required" });
  const token = require("crypto").randomBytes(30).toString("hex");
  let inviterID;
  jwt.verify(req.cookies.authToken, process.env.ACCESS_SECRET, (err,user)=>{
    inviterID= user.id;
  })
  const invite = new invitation({
    email,
    role: "client-user",
    inviteCode: token,
    invitedBy: inviterID,
  });
  await invite.save();
  try {
    await inviteAdminMail({ email, token, role: 'a User'});
    return res.status(200).json({ message: "Invitation has been sent" });
  } catch (error) {
    return res.status(500).json({ mesage: "Internal Server error" });
  }
};

module.exports = inviteUser;
