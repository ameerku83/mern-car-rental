import { bookingValiadation } from '../joiValidations/bookingValidation.js';
import {Booking} from '../models/bookingModel.js';
import { Car } from '../models/carModel.js';
import { Payment } from '../models/paymntModel.js';
import { User } from '../models/userModel.js';
import { sendClient } from '../utils/sendMail.js';
//import m from "moment"
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-CA'); 
};

export const createBooking = async (req, res) => {
        const { car,user, startDate, endDate,address,pickupLocation,mobile,pickupTime,dropOffTime,dropOffLocation } = req.body;
        await bookingValiadation.validateAsync({ startDate, endDate,address,pickupLocation,mobile })
       const isCar= await Car.findById(car)
       const isUser= await User.findById(user)

       if (!isUser ) {
        return res.status(400).json({ error: 'user not found' });
      }

        if (!isCar ) {
            return res.status(400).json({ error: 'car not found' });
          }

          // const startFormat = m(startDate,'DD/MM/YYYY').format("YYYY-MM-DD")
          // const endFormat = m(endDate,'DD/MM/YYYY').format("YYYY-MM-DD")

          const totalDays=Math.ceil((new Date(endDate)-new Date(startDate))/ (1000 * 60 * 60*24 ))

        const totalCost = (totalDays+1) * (isCar.pricePerDay) 
        const HourFormat = (time24) => {
          const [hour, minute] = time24.split(':');
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hour12 = hour % 12 || 12; 
          return `${hour12}:${minute} ${ampm}`;
        };
        sendClient(isUser.email,`FLYWHEEL `,"thanku for choosing company ",`<h3>hello ${isUser.name} you  are choosed ${isCar.brand}  ${isCar.model}  car total cost ${totalCost} <br>
          Start date: ${formatDate(startDate)} <br>
          End date:${formatDate(endDate)}<br>
          pickuplocaton:${pickupLocation} <br>
          Drop Off locaton:${dropOffLocation} <br>
          Pick Up Time:${HourFormat(pickupTime)} <br>
          Drop Off Time:${HourFormat(dropOffTime)} <br>
           <img src=${isCar.image} alt="car" /> `)
        sendClient( process.env.EMAIL ,`FLYWHEEL `,"admin", ` <h2>Booked</h2>   <h3>hello admin user:${isUser.name} choosed ${isCar.brand}  ${isCar.model}  car total cost ${totalCost}</h3> 
           from date ${formatDate(startDate)} <br>
            to  ${formatDate(endDate)} <br>
            addres:${address}<br>
            mobile:${mobile} <br>
            pickuplocaton:${pickupLocation} <br>
            Drop Off locaton:${dropOffLocation} <br>
            Pick Up Time:${HourFormat(pickupTime)} <br>
            Drop Off Time:${HourFormat(dropOffTime)} <br>
            <img src=${isCar.image} alt="car" />`)

        const newBooking = new Booking({
            user,
            car,
            startDate,
            endDate,
            totalPrice:totalCost,
            address,
            pickupLocation,
            mobile,
            pickupTime,
            dropOffTime,
            dropOffLocation,
            status:"booked",
            
        });
        if (!isCar.availability) {
          return res.status(400).json({ error: 'car is alredy booked' });
        }

        isCar.availability=false

        await isCar.save()
        
        await newBooking.save();
      
        res.status(200).json({data:newBooking});
    
};



 //cancell booking
export const cancelBooking = async (req, res) => {
 
      const { id } = req.params;
const booking = await Booking.findById(id);

     if (!booking) {
      return res.status(404).json({ message: 'Booking not found' }) }

                                
      // if (booking.status === 'canceled') {
      //   return res.status(400).json({ message: 'Booking is already canceled' })}                                             
     
        booking.status = 'canceled';
         await booking.save();
         const payment = await Payment.findOne({ booking: booking._id })
            if (payment) {
              payment.status = 'cancelled';
              await payment.save();}

    const car = await Car.findById(booking.car);
   if (car) {
         car.availability = true;

         const user = await User.findById(booking.user);
         sendClient(user.email,`FLYWHEEL `,"booking cancelled",
          `<h3>hello ${user.name} you  are suuceesfully canceled your booking for car: ${car.brand} model: ${car.model} total price Rs:${booking.totalPrice}  </h3> <img src=${car.image} alt="car" />`)
          sendClient(process.env.EMAIL,`FLYWHEEL `,"cancelled",` <h2>Cancelled</h2>  <h3> hello admin  user: ${user.name} cancelled ${car.brand}  ${car.model}  car total cost ${booking.totalPrice} </h3> 
             from date :${formatDate(booking.startDate)} <br>
              to :  ${formatDate(booking.endDate)} <br>
              user mobile ${booking.mobile} <br>
               address: ${booking.address} <br>
                pickuplocatin:${booking.pickupLocation} <br>
                 <img src=${car.image} alt="car" />`)

            await car.save();  }
              
       res.status(200).json({ message: 'Booking canceled successfully' , data:booking    });
                                                            
  };


  export const getAllBookings = async (req, res) => {
    const {userId}= req.params
    const bookings = await Booking.find({user:userId}).populate('car');

    if (!bookings) {
      return res.status(404).json({ success: false, message: 'bookings not found' });
  }

    res.json({ success: true, message: 'Booking list ', data: bookings });
}



export const getBookingById = async (req, res) => {
    
  const { id } = req.params;
  const booking = await Booking.findById(id).populate('car').populate('user');
  
  if (!booking) {
      return res.status(404).json({ success: false, message: 'Car not found' });
  }
  
  res.json({ success: true, message: 'got booking by id ', data: booking });
} 

 
export const deleteBooking = async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findByIdAndDelete(id);
  
  if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  
  res.json({ success: true, message: 'Booking deleted successfully!', data: booking });
  }

 