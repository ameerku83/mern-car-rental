

import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { MyBookingsCard } from '../../components/user/MyBookingsCard';
import Btn from '../../components/ui/Btn';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyBookings = () => {

    
    const [user,setUser]=useState({})
    const [bookings, setBookings] = useState({});

    useEffect(() => {
      
        const fetchUser = async () => {
            try {
             const response= await axiosInstance.get('user/profile',);
              setUser(response?.data?.data)
              //toast.success('account created suc');
              
              
            
            } catch (error) {
             // toast.error(error.response.data.message);
              console.log(error);
              
            }
          };
          fetchUser()
      
    }, [])
    
   
    useEffect(() => {
        const fetchBookings = async () => {
            if (user._id) { 
                try {
                    const response = await axiosInstance.get(`user/bookings/${user._id}`);
                    setBookings(response?.data?.data);
                    console.log(response.data);
                    
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                    
                } 
            }
        };

        fetchBookings();
    }, [user._id]); 
  
    const cancelBooking = async (id) => {
        try {
             await axiosInstance.put(`user/cancel-booking/${id}`);
             setBookings(( bookings.map(booking => booking._id === id ? { ...booking, status: 'canceled' } : booking))
            );
            toast.success("booking cancelled")
            
        } catch (error) {
            toast.error('Error cancelling booking');
            console.log(error);
        }
    };
    const deleteBooking = async (id) => {
        try {
             await axiosInstance.delete(`user/delete-booking/${id}`);
             setBookings(( bookings.filter((booking)=>booking._id !== id))
            );
            toast.success("booking deleted")
            
        } catch (error) {
            toast.error('Error deleting booking');
            console.log(error);
        }
    };
    if(bookings.length==0) return( <h1>No bookings found</h1> )
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-CA'); 
        };
    return (
     
     <div>
            <h1>Your Bookings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {bookings.length > 0 ? (
                   
                   bookings.map((booking)=>(
                    <div className="border border-gray-200 rounded-lg  shadow-md p-4 mx-4 mt-4 md:mt-6 sm:mt-5">
                    <img src={booking.car.image} alt={booking.status} className="w-full h-40 object-contain rounded-md" />
                    <div className=' text-center mt-2 ' >
                    <h3 className="text-2xl font-bold mt-4"> {booking.car.brand} {booking.car.model}</h3>
                    <div className='text-xl font-semibold'>
                    <h5>Total price : {booking.totalPrice}</h5>
                    <h5>staus : {booking.status}</h5>
                    <h5>start date : {formatDate(booking.startDate)}</h5>
                    <h5>rnd date : {formatDate(booking.endDate)}</h5>
                    {/* <h5> fuel type : {booking.fuelType}</h5>
                    <h5>capacity : {booking.capacity}</h5>
                    <h5>mileage : {booking.mileage}</h5> */}
                   
                    </div>
                    </div>
                    <div className="flex justify-center items-center mt-2">
                    
                   { booking.status=="booked" && <Btn onClick={()=>cancelBooking(booking._id)} > cancel booking </Btn>}
                   {booking.status=="canceled" &&   <button className='btn btn-error' onClick={()=>deleteBooking(booking._id)} >delete</button>  }
                    </div>
                  </div>

                   ))  
            ) : (
                 <p>  No bookings found. </p>
            )}
           </div>
     </div>
     
   
  )
}

export default MyBookings