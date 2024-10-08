import React, { useEffect, useState } from 'react';
import Btn from '../../components/ui/Btn';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';

export const AdminUserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [userName, setUserName] = useState('');

    const fetchBookings = async (userName = '') => {
        try {
            const response = await axiosInstance.get(`admin/bookings`, {
                params: { userName }
            });
            console.log(response?.data?.data); // Add this to see if you're getting the data
            setBookings(response?.data?.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleSearch = () => {
        fetchBookings(userName);
    };


    const cancelBooking = async (id) => {
        try {
            await axiosInstance.put(`admin/cancel-booking/${id}`);
            setBookings(bookings.map(booking => booking._id === id ? { ...booking, status: 'cancelled' } : booking));
            toast.success("Booking cancelled");
        } catch (error) {
            toast.error('Error cancelling booking');
            console.log(error);
        }
    };

    const deleteBooking = async (id) => {
        try {
            await axiosInstance.delete(`admin/delete-booking/${id}`);
            setBookings(bookings.filter((booking) => booking._id !== id));
            toast.success("Booking deleted");
        } catch (error) {
            toast.error('Error deleting booking');
            console.log(error);
        }
    };

    const HourFormat = (time24) => {
        const [hour, minute] = time24.split(':');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute} ${ampm}`;
    };

    return (
        <div>
            <h1 className='text-center mt-3 text-3xl font-bold'>Users bookings</h1>

            <div className="flex justify-center my-4">
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Search by user email"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Btn onClick={handleSearch}>Search</Btn>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div className="border border-gray-200 rounded-lg shadow-md p-4 mx-4 mt-4" key={booking._id}>
                            <button
                                className={`btn btn-sm ${
                                    booking.paymentStatus === "paid"
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : booking.paymentStatus === "pending"
                                        ? 'bg-yellow-500 hover:bg-yellow-600'
                                        : 'bg-red-500 hover:bg-red-600'
                                } text-white rounded-md`}
                            >
                                ₹ {booking.paymentStatus}
                            </button>

                            {/* Display fallback when car or image is missing */}
                            {booking.car && booking.car.image ? (
                                <img src={booking.car.image} alt={booking.status} className="w-full h-40 object-contain rounded-md" />
                            ) : (
                                <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md">
                                    <p>No car image</p>
                                </div>
                            )}

                            <div className='mt-2'>
                                {/* Display fallback for car brand/model or user data */}
                                <h3 className="text-2xl font-bold mt-4">
                                    {booking.car ? `${booking.car.brand} ${booking.car.model}` : 'Car not found'}
                                </h3>
                                <div className='text-xl font-semibold'>
                                    <h5>Total price: {booking.totalPrice || 'N/A'}</h5>
                                    
                                    <h5>User name: {booking.user ? booking.user.name : 'User not found'}</h5>
                                    {booking.driverLicense && <h5>DL No: {booking.driverLicense}</h5>}
                                    
                                    <h5>{booking.user ? booking.user.email : 'Email not found'}</h5>
                                    <h5>Mobile: {booking.user ? booking.user.mobile : 'Mobile not found'}</h5>
                                    <h5>Status: {booking.status}</h5>

                                    <h5>Pickup Location: {booking.pickupLocation || 'N/A'}</h5>
                                    <h5>Pickup Time: {booking.pickupTime ? HourFormat(booking.pickupTime) : 'N/A'}</h5>
                                    <h5>Start date: {booking.startDate ? new Date(booking.startDate).toDateString() : 'N/A'}</h5>

                                    <h5>Drop Location: {booking.dropOffLocation || 'N/A'}</h5>
                                    <h5>Drop Time: {booking.dropOffTime ? HourFormat(booking.dropOffTime) : 'N/A'}</h5>
                                    <h5>End date: {booking.endDate ? new Date(booking.endDate).toDateString() : 'N/A'}</h5>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-2">
                                {booking.status === "booked" && <Btn onClick={() => cancelBooking(booking._id)}>Cancel booking</Btn>}
                                {booking.status === "cancelled" && <button className='btn btn-error' onClick={() => deleteBooking(booking._id)}>Delete</button>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    );
};
