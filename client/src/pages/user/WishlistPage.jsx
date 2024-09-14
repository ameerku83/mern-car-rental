import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { FaGasPump, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';


export const WishlistPage = () => {
    
    const [wishlists, setWishlist] = useState([]);
   const userId = useSelector((state) => state.user.id); 
  
  
   
    useEffect(() => {
        const fetchWishlist = async () => {
          
            if (userId) { 
                try {
                  
                    const response = await axiosInstance.get(`user/wishlist/${userId}`);
                    setWishlist(response?.data?.data);
                    console.log(response.data);
                    
                } catch (error) {
                    console.error('Error fetching wishlist:', error);
                    
                } 
            }
        };
  
        fetchWishlist();
    }, [userId]); 
  
    const removeWishlist = async(id)=>{
        try {
                
             await axiosInstance.delete( `user/remove-wishlist/${id}` )
             setWishlist(wishlists.filter((wishlist)=> wishlist._id !== id ))
            toast.success('car removed from wishlist ')
            } catch (error) {
                console.log(error);
                
            }

    }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-24">
  {
    wishlists.map((wishlist)=>(
        <div className="relative">
    <div className="rounded-lg shadow-md p-4 mx-4 mt-4 bg-base-100 border border-purple-100">
      <div className="relative">
        <img src={wishlist.carId.image} alt={wishlist.carId.model} className="w-full h-40 object-contain rounded-md" />
       
      </div>
      <h3 className="text-lg font-semibold mt-4">{wishlist.carId.brand} {wishlist.carId.model}</h3>
      {/* <h3 className="text-md font-semibold mt-4 flex">{renderStars(Math.round(averageRating))}</h3> */}
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
         <Link to={`/user/cardetails/${wishlist.carId._id}`}> Book Now </Link>
        </button>
     <button className="btn btn-error" onClick={ ()=>removeWishlist(wishlist._id)} >Remove</button> 
      </div> 
    </div>
   </div>

    ))
  }
     
    </div>

  )
}



