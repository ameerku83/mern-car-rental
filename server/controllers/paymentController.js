
import { Booking } from "../models/bookingModel.js";
import { Payment } from "../models/paymntModel.js";
import { sendClient } from "../utils/sendMail.js";
import dotenv from "dotenv"
 dotenv.config()
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
 
export const createPayment = async (req, res) => {
    
    const { car,user,booking,   paymentDate, } = req.body;
  
    const isComplete=await Payment.findOne({booking})
    if (isComplete) {
      return res.status(400).json({ message: ' payment already procceced' })} 
      const fetchBooking= await Booking.findById(booking).populate('car')
      const lineItems = [{
        price_data: {
            currency: "inr",
            product_data: {
                name: `${fetchBooking.car.brand} ${fetchBooking.car.model} ${fetchBooking.startDate}`, 
                images: [fetchBooking.car.image], 
            },
            unit_amount: fetchBooking.totalPrice * 100, 
        },
        quantity: 1,
    }];
   const session= await stripe.checkout.sessions.create({  
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"https://ameerku83mern-car-rental.vercel.app/user/payment/success",
    cancel_url:"https://ameerku83mern-car-rental.vercel.app/user/payment/cancel",
 })
    const payment =  Payment({ car,user, booking,amount:fetchBooking.totalPrice,  paymentDate, status:session.payment_status  });

 
   
    await fetchBooking.save()
      await payment.save()    
    res.status(200).json({ message:"payment success", data:payment,sessionId:session.id});
    

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
        const {userId}= req.params
        const payments = await Payment.find({user:userId}).populate("car").populate('user');
        
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



            