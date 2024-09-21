import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import Btn from '../../components/ui/Btn';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Review from '../../components/user/Review';
import { FaTimes } from 'react-icons/fa'; // Importing the cross icon

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
//grgrt
  const cancelBooking = async (id, paymentStatus) => {
    try {
      const userConfirmed = window.confirm('Do you want to cancel this booking?');
      if (!userConfirmed) {
        return;
      }
      await axiosInstance.put(`user/cancel-booking/${id}`);
      setBookings(bookings.map((booking) => booking._id === id ? { ...booking, status: 'cancelled' } : booking));
      if (paymentStatus === 'paid') {
        navigate('/user/bookingcancel');
      }
      toast.success('Booking cancelled');
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
      setShow(!show); // Toggle the form visibility for the same booking
    } else {
      setSelectedBookingId(bookingId); // Set the selected booking ID
      setShow(true); 
    }
  };

  const closeReviewForm = () => {
    setShow(false);
    setSelectedBookingId(null);
  };

  if (bookings.length === 0) {
    return <h1 className="pt-28 text-center">No bookings found</h1>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mx-3 text-center pt-24">My Bookings</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${show ? 'blur-md' : null}`}>
        {bookings.map((booking) => (
          <div key={booking._id} className="border border-gray-200 rounded-lg shadow-md p-4 mx-4 mt-4">
            <button
              className={`btn btn-sm ${
                booking.paymentStatus === 'paid'
                  ? 'bg-green-500 hover:bg-green-600'
                  : booking.paymentStatus === 'pending'
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-red-500 hover:bg-red-600'
              } text-white rounded-md`}
            >
              {booking.paymentStatus === 'paid' && ' ₹ Paid'}
              {booking.paymentStatus === 'pending' && <Link to={`/user/booking/${booking._id}`}>₹ Pay Now</Link>}
              {booking.paymentStatus === 'cancelled' && ' ₹ Cancelled'}
            </button>

            <img src={booking.car.image} alt={booking.status} className="w-full h-40 object-contain rounded-md" />
            <div className="mt-2">
              <h3 className="text-2xl font-bold mt-4">
                {booking.car.brand} {booking.car.model}
              </h3>
              <div className="text-xl font-semibold">
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
              {booking.status === 'booked' && (
                <button className="btn btn-error" onClick={() => cancelBooking(booking._id, booking.paymentStatus)}>
                  Cancel Booking
                </button>
              )}
              <Btn>
                <button onClick={() => toggleReviewForm(booking._id)}>
                  {selectedBookingId === booking._id && show ? 'Close' : 'Add Review'}
                </button>
              </Btn>
            </div>
          </div>
        ))}
      </div>

      {/* Modal-style review form */}
      {selectedBookingId && show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white md:mt-5 rounded-lg p-8 w-full max-w-lg mx-auto shadow-lg">
            {/* Close button (cross icon) */}
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={closeReviewForm}>
              <FaTimes size={24} />
            </button>
            {/* Review Form */}
            <Review userId={userId} carId={bookings.find((booking) => booking._id === selectedBookingId)?.car._id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
