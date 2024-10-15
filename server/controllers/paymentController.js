
import { Booking } from "../models/bookingModel.js";
import { Payment } from "../models/paymntModel.js";
import { getUserIdByEmail } from "../utils/getUserId.js";
import { sendClient } from "../utils/sendMail.js";
import dotenv from "dotenv"
 dotenv.config()
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-CA'); 
  };

export const createPayment = async (req, res) => {
    
    const { car, booking, paymentDate } = req.body;
    const userId = await getUserIdByEmail(req.user.email);
    

    const fetchBooking = await Booking.findById(booking).populate('car');
    
    const lineItems = [{
        price_data: {
            currency: "inr",
            product_data: {
                name: `${fetchBooking.car.brand} ${fetchBooking.car.model} ${formatDate(fetchBooking.startDate)}`, 
                images: [fetchBooking.car.image],
            },
            unit_amount: fetchBooking.totalPrice * 100,
        },
        quantity: 1,
    }];

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://ameerku83mern-car-rental.vercel.app/user/payment/success",
         cancel_url: "https://ameerku83mern-car-rental.vercel.app/user/payment/cancel",
        metadata: { bookingId: booking } 
    });
    const payment =  Payment({ car,user:userId, booking,amount:fetchBooking.totalPrice,  paymentDate,status:"pending" });
    await payment.save()  
   
    res.status(200).json({ sessionId: session.id });
};

        // Cancel a paymen
      export const cancelPayment = async (req, res, next) => {
        const { id } = req.params;
        const payment = await Payment.findByIdAndDelete(id);
        
        if (!payment) {
            return res.status(404).json({ success: false, message: 'payment not found' });
        }
        
        res.json({ success: true, message: 'payment deleted successfully!', data: payment });
        }

     
     export const getPayments = async (req, res, next) => {
        const userId = await getUserIdByEmail(req.user.email);
        const payments = await Payment.find({user:userId}).populate('booking').populate("car").populate('user');
        
        if (!payments) {
            return res.status(404).json({ success: false, message: 'payment not found' });
        }
        
        res.json({ success: true, message: 'payment gets successfully!', data: payments });
        }
        export const getPayment = async (req, res, next) => {
            const { id } = req.params;
            const payment = await Payment.findById(id).populate("car").populare("user");
            
            if (!payment) {
                return res.status(404).json({ success: false, message: 'payment not found' });
            }
            
            res.json({ success: true, message: 'payment deleted successfully!', data: payment });  }



            