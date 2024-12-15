import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Pleace provide a username"]
        unique: true,
        lowecase: true,
    },
    email:{
        type: String,
        required: [true,"Pleace provide an email"]
        unique: true
    },
    password:{
        type: String,
        required: [true,"Pleace provide a password"]
        unique: true
    },
    isVarified:{
        type: Boolean,
        default:false
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User

