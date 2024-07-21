const invitation = require('../../models/inviteCodes');
const inviteAdminMail = require('../../utils/sendInviteAdminMail');

const inviteAdmin= async(req,res)=>{
    const {email}= req.body;
    if (!email) return res.status(404).json({message: "Email is required"})
    const token = require('crypto').randomBytes(30).toString('hex');
    const invite= new invitation({
        email,
        role:"client-admin",
        inviteCode: token,

    })
    await invite.save();
    try {
        await inviteAdminMail({email,token})
        return res.status(200).json({message: 'Invitation has been sent'})
    } catch (error) {
        return res.status(500).json({mesage: 'Internal Server error'})
    }
}

module.exports= inviteAdmin