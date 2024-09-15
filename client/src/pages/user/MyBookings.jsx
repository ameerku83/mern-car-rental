

import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';

import Btn from '../../components/ui/Btn';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const MyBookings = () => {

    const navigate=useNavigate()
   
    const [bookings, setBookings] = useState({});
    const userId = useSelector((state) => state.user.id); 
  
    
   
    useEffect(() => {
        const fetchBookings = async () => {
            if (userId) { 
                try {
                    const response = await axiosInstance.get(`user/bookings/${userId}`);
                    setBookings(response?.data?.data);
                    console.log(response.data);
                    
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                    
                } 
            }
        };

        fetchBookings();
    }, [userId]); 
  
    const cancelBooking = async (id) => {
        try {
             await axiosInstance.put(`user/cancel-booking/${id}`);
             setBookings(( bookings.map(booking => booking._id === id ? { ...booking, status: 'canceled' } : booking)) );
                navigate('/user/bookingcancel')  
             toast.success("booking cancelled")
            
        } catch (error) {
            toast.error('Error cancell booking');
            console.log(error);
        }
    };
  
    if(bookings.length === 0) return( <h1 className='pt-28 text-center'>No bookings found</h1> )
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-CA'); 
        };
        const HourFormat = (time24) => {
            const [hour, minute] = time24.split(':');
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12; 
            return `${hour12}:${minute} ${ampm}`;
          };
          
    return (
     
     <div>
            <h1>Your Bookings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-12">
            {bookings.length > 0 ? (
                   
                   bookings.map((booking)=>(
                    <div className="border border-gray-200 rounded-lg  shadow-md p-4 mx-4 mt-4 md:mt-6 sm:mt-5">
                    <img src={booking.car.image} alt={booking.status} className="w-full h-40 object-contain rounded-md" />
                    <div className=' text-center mt-2 ' >
                    <h3 className="text-2xl font-bold mt-4"> {booking.car.brand} {booking.car.model}</h3>
                    <div className='text-xl font-semibold'>
                    <h5>Total price : {booking.totalPrice}</h5>
                    <h5>Staus : {booking.status}</h5>
                    <h5>Start date : {formatDate(booking.startDate)}</h5>
                    <h5>Pickup Time : {HourFormat(booking.pickupTime)}</h5>
                    <h5>Pickup Location : {booking.pickupLocation}</h5>
                    <h5>End date : {formatDate(booking.endDate)}</h5>
                    <h5>Drop Off Time : {HourFormat(booking.dropOffTime)}</h5>
                    <h5>Drop Off Location : {booking.dropOffLocation}</h5>
                   
                   
                    </div>
                    </div>
                    <div className="flex justify-between mt-2">
                    
                   { booking.status === "booked" && < button className=' btn  btn-error' onClick={()=>cancelBooking(booking._id)} > cancel booking </button>}
                   <Btn ><Link to={`/user/booking/${booking._id}`} > Add Review </Link></Btn>
                    </div>
                  </div>

                   ))  
            ) : (
                 <p className='pt-28'>  No bookings found. </p>
            )}
           </div>
     </div>
     
   
  )
}

export default MyBookings