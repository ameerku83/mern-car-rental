import mongoose from "mongoose";

const contactShema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        email: {
            type: String,
            unique:true
            
        },
       
        mobile: {
            type: String,
            
           
            
        },
        message:{
            type:String,
            required:true
        }
       
    },
    { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactShema);