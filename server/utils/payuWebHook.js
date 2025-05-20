// import express from 'express';


// import { Payment } from '../models/paymntModel.js';
// import { Booking } from '../models/bookingModel.js';

// const webhookrouter = express.Router();



// webhookrouter.post('/', express.raw({ type: 'application/x-www-form-urlencoded' }), async (req, res) => {
//     const { txnid, status } = req.body;

//     try {
//         const payment = await Payment.findOneAndUpdate({ txnid }, { status: status === 'success' ? 'paid' : 'failed' });
//         const booking = await Booking.findById(payment.booking);

//         if (status === 'success') {
//             booking.paymentStatus = 'paid';
//             await booking.save();
//         }

//         res.status(200).send({ received: true });
//     } catch (error) {
//         console.log('Error updating payment status:', error);
//         res.status(500).send('Error updating payment status');
//     }
// });
// export default webhookrouter