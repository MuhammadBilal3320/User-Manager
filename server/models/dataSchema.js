import { Schema, mongoose } from "mongoose";

const dataProtocol = new Schema({

    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    dataImage:{
        type: String
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

const DataSchema = mongoose.model('Data', dataProtocol);

export default DataSchema;