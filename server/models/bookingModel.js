import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    startDate: String,
    endDate: String,
    paymentStatus: {type: String, default: "pending"},
    totalPrice:Number ,
    mobile:{type: String},
    address:{ type: String,},
    pickupLocation:{ type: String, },  
     status: { type: String, default: 'Pending' },
      
});

export const Booking= mongoose.model('Booking', bookingSchema);
   