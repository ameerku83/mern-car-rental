import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js"
export const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axiosInstance.get(`user/single-booking/${id}`);
                setBooking(response.data.data);
            } catch (error) {
                toast.error('Error fetching booking details');
                console.log(error);
            }
        };
        fetchBooking();
    }, [id]);

    const CancelBooking = async (id) => {
        try {
            const response = await axiosInstance.put(`user/cancel-booking/${id}`);
            toast.success("booking cancelled")
            
        } catch (error) {
            toast.error('Error fetching booking details');
            console.log(error);
        }
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-CA'); 
    };
   const makePayment = async()=>{
    try {

        const stripe=await loadStripe("pk_test_51PrCMS04oHGbi1WXUldePfVqBpsFGQVzUcCtebG6jXAZsqPjRyyE3jGHk2m51ybZ2WzNzVJBcS0KD4ZMe4BVnmyn00hEBGGuXn")

        const paymentData={
            car:booking.car._id,
            booking:booking._id,
            user:booking.user._id,
            paymentDate:formatDate(booking.startDate),
           

        }

        const response = await axiosInstance.post("user/payment",paymentData);
        const sessionId=response?.data?.sessionId;
       const result = stripe.redirectToCheckout({
        sessionId:sessionId
       })

       console.log(response);
       


    } catch (error) {
        console.log(error);
        
    }
   }
   

    return ( <div>
        <div className="pt-28">
            {booking ? (
                <div className="max-w-4xl lg:mx-auto bg-scale-300 shadow-md rounded-lg overflow-hidden border border-purple-200 pt-5 px-5 mx-5 md:flex gap-x-6 pb-4">
               
                    <div>
                    <h2 className="text-2xl font-bold">Booking Details</h2>
                        <img className=" object-contain w-96" src={booking.car.image} alt=""  />
                    </div>
                     
                     <div className="text-lg font-bold">
                     <p>Car:{booking.car.brand} {booking.car.model}</p>
                     <p>Total Price: {booking.totalPrice}</p>
                    <p>Start Date: {formatDate(booking.startDate)}</p>
                    <p>End Date: {formatDate(booking.endDate)}</p>
                    <p>Address: {booking.address}</p>
                    <p>Mobile: {booking.mobile}</p>
                    <p>Pickup Location: {booking.pickupLocation}</p>
                    <p>status: {booking.status}</p>
                    {booking.status === 'booked' && (
                      <button  className="mt-4 bg-red-500 text-white p-2 rounded-md"  onClick={()=>CancelBooking(booking._id)}  >
                                Cancel Booking
                            </button>
                        )}
                     </div>
                    

                </div>
            ) : (
                <p>Loading booking details...</p>
            )}
        </div>

        <button onClick={makePayment}>pay Now</button>


        </div>
    );
};
