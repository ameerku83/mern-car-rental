import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin"]
        
        
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
}, {
    timestamps: true,
});

export const Admin = mongoose.model("Admin", adminSchema);