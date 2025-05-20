import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv'
import { Payment } from '../models/paymntModel.js';
import { Booking } from '../models/bookingModel.js';
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookrouter = express.Router();

// Webhook handler
  webhookrouter.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const payment = await Payment.findOneAndUpdate(
            { booking: session.metadata.bookingId }, 
            { status: 'paid' }, 
            { new: true }
        );
        await payment.save()
        const booking = await Booking.findById(payment.booking);
        booking.paymentStatus = 'paid';
        await booking.save();
        

        res.status(200).json({ received: true });
    }
});
 export default webhookrouter