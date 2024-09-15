import {Schema, mongoose} from "mongoose";

const userProtocol = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
});

const userSchema = mongoose.model('User',userProtocol);

export default userSchema;