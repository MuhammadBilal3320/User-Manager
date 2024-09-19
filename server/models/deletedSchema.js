import { Schema, mongoose } from "mongoose";

const deletedProtocol = new Schema({

    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title:{
        type: String,
    },

    emailOrUser:{
        type: String,
    },

    password:{
        type: String,
    },

    message:{
        type: String
    },
    
    date:{
        type: Date,
        default: Date.now,
    }

});

const DeletedSchema = mongoose.model('deleted', deletedProtocol);

export default DeletedSchema;