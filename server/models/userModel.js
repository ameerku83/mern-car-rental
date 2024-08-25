import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            
        },
        email: {
            type: String,
            unique:true
            
        },
        password: {
            type: String,
            required:true
            
            
        },
        mobile: {
            type: String,
            
           
            
        },
       
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);