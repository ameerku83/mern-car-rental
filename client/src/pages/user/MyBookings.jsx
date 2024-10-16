import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import Btn from '../../components/ui/Btn';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import Review from '../../components/user/Review';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  // const [userId, setUserId] = useState("");
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axiosInstance.get('user/profile');
  //       const fetchedUserId = response?.data?.data?._id;
        
  //       if (fetchedUserId) {
  //         setUserId(fetchedUserId);  // Set userId if found
  //       } else {
  //         throw new Error('User ID not found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user profile:', error);
  //       toast.error('User not found');
  //       setLoading(false);  // Stop loading if an error occurs
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    
    const fetchBookings = async () => {
   
        try {
          const response = await axiosInstance.get(`user/bookings`);
          setBookings(response?.data?.data || []);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
    
    };

    // Fetch bookings only when userId is available
   
      fetchBookings();
    
  }, []);

  const cancelBooking = async (id, paymentStatus) => {
    try {
      const userConfirmed = window.confirm('Do you want to cancel this booking?');
      if (!userConfirmed) {
        return;
      }
      await axiosInstance.put(`user/cancel-booking/${id}`);
      setBookings(
        bookings.map((booking) => (booking._id === id ? { ...booking, status: 'cancelled' } : booking))
      );
      if (paymentStatus === 'paid') {
        navigate('/user/bookingcancel');
      }
      toast.success('Booking cancelled');
    } catch (error) {
      toast.error('Error canceling booking');
    }
  };
  const toggleReviewForm = (bookingId) => {
    if (selectedBookingId === bookingId) {
      setShow(!show);
    } else {
      setSelectedBookingId(bookingId);
      setShow(true);
    }
  };

  const closeReviewForm = () => {
    setShow(false);
    setSelectedBookingId(null);
  };

  if (loading) {
    
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="w-16 h-16 border-4 border-purple-500 rounded-full animate-spin border-t-transparent mt-24"></div>
          <span className="mt-4 text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="pt-28 text-center h-screen">
        <h1 className="text-2xl font-semibold">No bookings found</h1>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mx-3 text-center pt-24">My Bookings</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${show ? 'blur-md' : ''}`}>
        {bookings.map((booking) => (
          <div key={booking._id} className="border border-gray-200 rounded-lg shadow-md p-4 mx-4 mt-4">
            {booking.car ? (
              <>
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
                  {booking.paymentStatus === 'cancelled' && '  Cancelled'}
                </button>

                <img src={booking.car.image} alt={booking.status} className="w-full h-40 object-contain rounded-md" />
                <div className="mt-2">
                  <h3 className="text-xl font-bold mt-4">
                    {booking.car.brand} {booking.car.model}
                  </h3>
                  <div className="text-md font-semibold">
                    <h5>Total Amount: {booking.totalPrice}</h5>
                    <h5>Booked on: {new Date(booking.startDate).toDateString()}</h5>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-red-500">Car details not available</p>
            )}

            <div className="flex justify-between mt-2">
              {booking.status === 'booked' && (
                <button
                  className="btn btn-error"
                  onClick={() => cancelBooking(booking._id, booking.paymentStatus)}
                >
                  Cancel Booking
                </button>
              )}
              <Btn>
                <button onClick={() => toggleReviewForm(booking._id)}>
                  {selectedBookingId === booking._id && show ? 'Close' : 'Review Car'}
                </button>
              </Btn>
            </div>
          </div>
        ))}
      </div>

      {selectedBookingId && show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white md:mt-5 rounded-lg p-8 w-full max-w-lg mx-auto shadow-lg">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={closeReviewForm}>
              <FaTimes size={24} />
            </button>
            <Review carId={bookings.find((booking) => booking._id === selectedBookingId)?.car?._id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
