
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        
        
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        
        default: 'pending',
    },
 
   
}, {
    timestamps: true,
});



export const Payment = mongoose.model("Payment", paymentSchema);
    