import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js"
import Btn from '../../components/ui/Btn';
import Review from '../../components/user/Review';
import { BookingDetailsSkeleton } from '../../components/ui/BookingDetailsSkeleton';
import { FaStar, FaUserCircle } from 'react-icons/fa';
export const BookingDetails = () => {
    const { id } = useParams();
   
    const [booking, setBooking] = useState(null);
    
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axiosInstance.get(`user/single-booking/${id}`);
                setBooking(response?.data?.data);
                
            } catch (error) {
                toast.error('Error fetching booking details');
                console.log(error);
            }
        };
        fetchBooking();
    }, [id]);
    const [reviews, setReviews] = useState([]);
   
    useEffect(() => {
        const fetchReviews = async () => {
            if (!booking?.car?._id) return; 
    
            try {
                const response = await axiosInstance.get(`user/carreviews/${booking.car._id}`);
                console.log(response?.data);
                setReviews(response?.data.data);
            } catch (error) {
                console.log(error);
                toast.error('Error fetching reviews');
            }
        };
    
        fetchReviews();
    }, [booking?.car?._id]); 
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
   
    
  
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-CA'); 
    };
   const makePayment = async()=>{
    try {

        const stripe=await loadStripe(process.env.REACT_APP_stripe_publishable_key)

        const paymentData={
            car:booking.car._id,
            booking:booking._id,
            user:booking.user._id,
            paymentDate:formatDate(booking.startDate), }

        const response = await axiosInstance.post("user/payment",paymentData);
        const sessionId=response?.data?.sessionId;
        stripe.redirectToCheckout({
        sessionId:sessionId
       })
       console.log(response);
       
    } catch (error) {
        console.log(error);
        
    }
   }
   const HourFormat = (time24) => {
    const [hour, minute] = time24.split(':');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; 
    return `${hour12}:${minute} ${ampm}`;
  };

   if(!booking) return (
    <BookingDetailsSkeleton/>
   )
   

    return ( <div>
        <div className="pt-28">
            {booking ? (
                <div>
                <div className="max-w-4xl lg:mx-auto bg-base-100 shadow-md rounded-lg overflow-hidden border border-purple-200 pt-5 px-5 mx-5 md:flex gap-x-6 pb-4">
               
                    <div>
                    <h2 className="text-2xl font-bold mx-3">Booking Details</h2>
                        <img className=" object-contain w-96" src={booking.car.image} alt=""  />
                        { averageRating !== null && (<div className='flex mt-4'>   <span className=''>Rating:</span> <span className='flex mt-1'> {renderStars(Math.round( averageRating))}</span></div> )}
                    </div>
                     
                     <div className="text-md font-bold  ">
                      {booking.driverLicense &&  <p>DL No:  {booking.driverLicense}</p>}
                     <p>Car:{booking.car.brand} {booking.car.model}</p>
                     <p>Total Price:  {booking.totalPrice}</p>
                     <p>Pickup Location: {booking.pickupLocation}</p>
                    <p>Pickup Date: {formatDate(booking.startDate)}</p>
                    <h5>Pickup Time : {HourFormat(booking.pickupTime)}</h5>
                    <p>End Date: {formatDate(booking.endDate)}</p>
                    <h5>Drop Off Time : {HourFormat(booking.dropOffTime)}</h5>
                    <h5>Drop Off Location : {booking.dropOffLocation}</h5>
                    <p>Address: {booking.address}</p>
                    <p>Mobile: {booking.mobile}</p>
                    <p>status: {booking.status}</p>
                        <div className=' justify-center flex'>
                      {booking.status === 'booked' && <Btn onClick={makePayment} > Pay Now</Btn>}  
                         </div>
                     </div>
                </div>
                 
            
                   
    
         {reviews.length > 0 &&       <section className="my-16 px-5 md:px-10">
          
          <h2 className="text-3xl font-bold text-center mb-2 text-purple-600">Reviews ({reviews.length})</h2>
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="flex space-x-4 p-6 hide-scrollbar md:justify-center">
              {reviews.map((review, index) => (
                <div key={index} className="bg-base-100 shadow-lg rounded-md p-3 flex-none ">
                  <div className="w-28">
                    <div className="flex items-center mb-2">
                      <FaUserCircle className="h-6 mx-2 text-gray-600" />
                      <div className="font-semibold">{review.user.name}</div>
                    </div>
                    <div className="text-sm mb-2">
                      {review.car.brand} {review.car.model}
                    </div>
                    
                    <div className="flex mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm  overflow-hidden text-ellipsis whitespace-normal">"{review.comment}"</p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
            </section> 
             }
                 
                 </div>
             ) : (
                <p>Loading booking details...</p>
            )}
        </div>

        </div>
    );
};
