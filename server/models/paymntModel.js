
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'UPI'],
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['paid', 'pending',],
        default: 'pending',
    },
   
   
}, {
    timestamps: true,
});



export const Payment = mongoose.model("Payment", paymentSchema);
    