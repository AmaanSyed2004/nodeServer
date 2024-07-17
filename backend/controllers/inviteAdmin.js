const invitation = require('../models/inviteCodes');
const inviteAdminMail = require('../utils/sendInviteAdminMail');

const inviteAdmin= async(req,res)=>{
    const {email, role}= req.body;
    if (!email || !role) return res.status(404).json({message: "Email and role are required"})
    const token = require('crypto').randomBytes(30).toString('hex');
    const invite= new invitation({
        email,
        role,
        inviteCode: token,

    })
    await invite.save();
    try {
        await inviteAdminMail({email,token})
        res.status(200).json({message: 'Invitation has been sent'})
    } catch (error) {
        res.status(500).json({mesage: 'Internal Server error'})
    }
}

module.exports= inviteAdmin