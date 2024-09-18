import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import Btn from '../../components/ui/Btn';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Review from '../../components/user/Review';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null); // New state to track the selected booking
  const [show, setShow] = useState(false); // Track whether to show the review form
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchBookings = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get(`user/bookings/${userId}`);
          setBookings(response?.data?.data);
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
      setBookings(bookings.map(booking => booking._id === id ? { ...booking, status: 'cancelled' } : booking));
      navigate('/user/bookingcancel');
      toast.success("Booking cancelled");
    } catch (error) {
      toast.error('Error canceling booking');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-CA');
  };

  const HourFormat = (time24) => {
    const [hour, minute] = time24.split(':');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  // Toggle the review form for a specific booking
  const toggleReviewForm = (bookingId) => {
    if (selectedBookingId === bookingId) {
      // If the same booking is clicked again, just toggle the visibility
      setShow(!show);
    } else {
      // If a new booking is clicked, set the new booking ID and show the form
      setSelectedBookingId(bookingId);
      setShow(true); // Always show the form when a new booking is selected
    }
  };

  if (bookings.length === 0) {
    return <h1 className='pt-28 text-center'>No bookings found</h1>;
  }

  return (
    <div className=''  >
      <h2 className="text-2xl font-bold mx-3 text-center pt-24">My Bookings</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${show ? "blur-md" : null} `}>
        {bookings.map((booking) => (
          <div key={booking._id} className="border border-gray-200 rounded-lg shadow-md p-4 mx-4 mt-4">
            <button
              className={`btn btn-sm
                ${booking.paymentStatus === "paid"
                  ? 'bg-green-500 hover:bg-green-600'
                  : booking.paymentStatus === "pending"
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-red-500 hover:bg-red-600'}
                text-white rounded-md`}
            >
              {booking.paymentStatus === "paid" && " ₹ Paid"}
              {booking.paymentStatus === "pending" && <Link to={`/user/booking/${booking._id}`}>₹ Pay Now</Link>}
              {booking.paymentStatus === "cancelled" && " ₹ Cancelled"}
            </button>

            <img src={booking.car.image} alt={booking.status} className="w-full h-40 object-contain rounded-md" />
            <div className='mt-2'>
              <h3 className="text-2xl font-bold mt-4">{booking.car.brand} {booking.car.model}</h3>
              <div className='text-xl font-semibold'>
                <h5>Total price: {booking.totalPrice}</h5>
                <h5>Status: {booking.status}</h5>
                <h5>Start date: {formatDate(booking.startDate)}</h5>
                <h5>Pickup Time: {HourFormat(booking.pickupTime)}</h5>
                <h5>Pickup Location: {booking.pickupLocation}</h5>
                <h5>End date: {formatDate(booking.endDate)}</h5>
                <h5>Drop Off Time: {HourFormat(booking.dropOffTime)}</h5>
                <h5>Drop Off Location: {booking.dropOffLocation}</h5>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              {booking.status === "booked" && <button className='btn btn-error' onClick={() => cancelBooking(booking._id)}>Cancel Booking</button>}
              <Btn>
                <button onClick={() => toggleReviewForm(booking._id)}>
                  {selectedBookingId === booking._id && show ? "Close" : "Add Review"}
                </button>
              </Btn>
            </div>
          </div>
        ))}
      </div>

      {/* Only show the review form below the card list for the selected booking */}
      {selectedBookingId && show && (
        <div className=' '>
            
          <Review  userId={userId} carId={bookings.find(booking => booking._id === selectedBookingId)?.car._id} />
          
        </div>
      )}
    </div>
  );
};

export default MyBookings;
