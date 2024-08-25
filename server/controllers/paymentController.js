
import { Booking } from "../models/bookingModel.js";
import { Payment } from "../models/paymntModel.js";
import { sendClient } from "../utils/sendMail.js";


export const createPayment = async (req, res) => {
    
    const { user,booking, paymentMethod,  paymentDate, } = req.body;

    const isComplete=await Payment.findOne({booking})
    if (isComplete) {
      return res.status(400).json({ message: ' payment already completed' })} 

      const fetchBooking= await Booking.findById(booking) 
    const payment =  Payment({ user, booking,amount:fetchBooking.totalPrice, paymentMethod,  paymentDate, status:"paid"  });
    

   
    fetchBooking.paymentStatus="completed"
      await payment.save()    
    res.status(200).json({ message:"payment success", data:payment});

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
        const payments = await Payment.find({user:userId});
        
        if (!payments) {
            return res.status(404).json({ success: false, message: 'payment not found' });
        }
        
        res.json({ success: true, message: 'payment gets successfully!', data: payments });
        }
        export const getPayment = async (req, res, next) => {
            const { id } = req.params;
            const payment = await Payment.findById(id);
            
            if (!payment) {
                return res.status(404).json({ success: false, message: 'payment not found' });
            }
            
            res.json({ success: true, message: 'payment deleted successfully!', data: payment });  }