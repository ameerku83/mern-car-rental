
import React, { useEffect, useState } from 'react'
import Btn from '../../components/ui/Btn';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';

export const AdminUserBookings = () => {
    const [bookings,setBookings]=useState([])
    useEffect(() => {
        const fetchBookings = async () => {
            
                try {
                    const response = await axiosInstance.get(`admin/bookings/`);
                    setBookings(response?.data?.data);
                    console.log(response.data);
                    
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                    
                } 
           
        };

        fetchBookings();
    }, []); 
     const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-CA'); 
        };
        const cancelBooking = async (id) => {
            try {
                 await axiosInstance.put(`admin/cancel-booking/${id}`);
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
                 await axiosInstance.delete(`admin/delete-booking/${id}`);
                 setBookings(( bookings.filter((booking)=>booking._id !== id))
                );
                toast.success("booking deleted")
                
            } catch (error) {
                toast.error('Error deleting booking');
                console.log(error);
            }
        };

  return (
    <div>
            <h1 className=' text-center mt-3 text-3xl font-bold'> Users bookings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
               
            {bookings.length > 0 ? ( 
                   
                   bookings.map((booking)=>(
                    <div className="border border-gray-200 rounded-lg  shadow-md p-4 mx-4 mt-4 md:mt-6 sm:mt-5">
                    <img src={booking.car.image} alt={booking.status} className="w-full h-40 object-contain rounded-md" />
                    <div className=' text-center mt-2 ' >
                    <h3 className="text-2xl font-bold mt-4"> {booking.car.brand} {booking.car.model}</h3>
                    <div className='text-xl font-semibold'>
                    <h5>Total price : {booking.totalPrice}</h5>
                    <h5>User name : {booking.user.name}</h5>
                    <h5> {booking.user.email}</h5>
                    <h5>mobile : {booking.user.mobile}</h5>
                    <h5>staus : {booking.status}</h5>
                    <h5>start date : {formatDate(booking.startDate)}</h5>
                    <h5>End date : {formatDate(booking.endDate)}</h5>
                    
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
