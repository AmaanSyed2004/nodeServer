const mongoose= require('mongoose')

const invitationSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    inviteCode: {
        type: String,
        required:true,
    },
    role:{
        type:String,
        required: true,
    },
    accepted:{
        type:  Boolean,
        default: false,
    }
})

const invitation= mongoose.model('invitation',invitationSchema)

module.exports= invitation