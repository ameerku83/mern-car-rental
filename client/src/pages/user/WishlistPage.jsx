import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { FaGasPump, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const WishlistPage = () => {
  const [wishlists, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // Loading is true by default
  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axiosInstance.get('user/profile');
  //       const fetchedUserId = response?.data?.data?._id;

       
  //         setUserId(fetchedUserId);  // Set userId if found
       
  //     } catch (error) {
  //       console.error('Error fetching user profile:', error);
        
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
     
        try {
          const response = await axiosInstance.get(`user/wishlists`);
          setWishlist(response?.data?.data || []);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        } finally {
          setLoading(false); // Loading ends after fetching wishlist
        }
      
    };

    
      fetchWishlist();
 
  }, []);

  const removeWishlist = async (id) => {
    try {
      await axiosInstance.delete(`user/remove-wishlist/${id}`);
      setWishlist(wishlists.filter((wishlist) => wishlist._id !== id));
      toast.success('Car removed from wishlist');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mx-3 text-center pt-24">My Wishlist</h2>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div>
          <div className="w-16 h-16 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
          <span className="mt-4 text-xl">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Only show 'empty wishlist' message after loading completes and wishlist is actually empty */}
          {!loading && wishlists.length === 0 && (
            <h2 className="text-2xl font-bold mx-3 text-center pt-24 h-screen">
              Your Wishlist is Empty
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {wishlists.map((wishlist) =>
              wishlist.carId ? ( // Check if carId exists before rendering
                <div key={wishlist._id} className="relative">
                  <div className="rounded-lg shadow-md p-4 mx-4 mt-4 bg-base-100 border border-purple-100">
                    <div className="relative">
                      <img
                        src={wishlist.carId.image}
                        alt={wishlist.carId.model}
                        className="w-full h-40 object-contain rounded-md"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4">
                      {wishlist.carId.brand} {wishlist.carId.model}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center">
                        <FaGasPump className="text-purple-600 text-lg mr-1" />
                        <span className="text-sm">{wishlist.carId.fuelType}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="text-purple-600 text-lg mr-1" />
                        <span className="text-sm">{wishlist.carId.capacity} People</span>
                      </div>
                      <div className="flex items-center">
                        <FaTachometerAlt className="text-purple-600 text-lg mr-1" />
                        <span className="text-sm">{wishlist.carId.mileage} km/l</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center mt-4">
                      <button className="btn bg-green-500 text-white rounded-md">
                        <Link to={`/user/cardetails/${wishlist.carId._id}`}>Book Now</Link>
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => removeWishlist(wishlist._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={wishlist._id}
                  className="p-4 mx-4 mt-4 bg-red-100 border border-red-300 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-red-600">Car information not available</h3>
                  <button
                    className="btn btn-error mt-2"
                    onClick={() => removeWishlist(wishlist._id)}
                  >
                    Remove
                  </button>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};
