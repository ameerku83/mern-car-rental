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
   const [show,setShow]=   useState(false);
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
    //const carId=booking.car._id
    useEffect(() => {
        const fetchReviews = async () => {
            if (!booking?.car?._id) return; // Ensure carId is valid before making API call
    
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
                     <p>Car:{booking.car.brand} {booking.car.model}</p>
                     <p>Total Price:  {booking.totalPrice}</p>
                    <p>Start Date: {formatDate(booking.startDate)}</p>
                    <p>End Date: {formatDate(booking.endDate)}</p>
                    <p>Address: {booking.address}</p>
                    <p>Mobile: {booking.mobile}</p>
                    <p>Pickup Location: {booking.pickupLocation}</p>
                    <p>status: {booking.status}</p>
                        <div className=' justify-between flex'>
                      {booking.status === 'booked' && <Btn onClick={makePayment} > Pay Now</Btn>}  
                      <Btn onClick={()=>setShow(!show)} > {show? "Close Review"  : "Add Review"}</Btn>
                         </div>
                     </div>
                </div>
                 
             {  show? <Review  userId={booking.user._id} carId={booking.car._id} /> :null }
           {reviews.length > 0 &&   
                   <section className="my-16 px-5 md:px-10">
          
                   <h2 className="text-2xl text-center ">Car Reviews</h2>
                   <div className="overflow-x-auto whitespace-nowrap ">
                     <div className="flex space-x-3  p-4 justify-center ">
                       {reviews.map((review, index) => (
                         <div key={index} className="bg-base-200 shadow-lg rounded-lg p-2 flex-none ">
                           <div className="w-36">
                             <div className="flex items-center mb-2">
                               <FaUserCircle className="h-6 mx-2 text-gray-600" />
                               <div className="font-semibold">{review.user.name}</div>
                             </div>
                             <div className="text-sm mb-2">
                               {review.car.brand} {review.car.model}
                             </div>
                             <img src={review.car.image} className="w-24 object-contain mb-2" alt="car" />
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
