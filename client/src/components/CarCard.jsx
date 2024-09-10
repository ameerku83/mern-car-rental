import React, { useEffect, useState } from 'react';

import { AiOutlineHeart } from 'react-icons/ai';
import { FaGasPump, FaUsers, FaTachometerAlt, FaStar } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import { toast } from 'react-toastify';

const CarCard = ({  car }) => {
  
  const [averageRating, setAverageRating] = useState(0);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

    useEffect(() => {
        const fetchReviews = async () => {
          if (!car?._id) return
    
            try {
                const response = await axiosInstance.get(`user/carreviews/${car._id}`);
                
                const fetchedReviews = response?.data.data 
                
                
                if (fetchedReviews.length > 0) {
                  const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
                  const avgRating = totalRating / fetchedReviews.length;
                  setAverageRating(avgRating);
                } else {
                  setAverageRating(0); // Set to 0 if no reviews
                }
            } catch (error) {
                console.log(error);
                toast.error('Error fetching reviews');
            }
        };
       
    
        fetchReviews();
    }, [car._id]); 
   
   
  return (
    <div className="relative">
      <div className="rounded-lg shadow-md p-4 mx-4 mt-4 md:mt-4 sm:mt-5 bg-base-100 border border-purple-100">
        <div className="relative">
          <img src={car.image} alt={car.model} className="w-full h-40 object-contain rounded-md" />
          <div className="absolute top-2 right-2">
            <AiOutlineHeart className="text-purple-600 text-2xl cursor-pointer hover:text-purple-800" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-4">{car.brand} {car.model}</h3>
        <h3 className="text-md font-semibold mt-4 flex">{renderStars(Math.round(averageRating))}</h3>
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center">
            <FaGasPump className="text-purple-600 text-lg mr-1" />
            <span className="text-sm">{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="text-purple-600 text-lg mr-1" />
            <span className="text-sm">{car.capacity} People</span>
          </div>
          <div className="flex items-center">
            <FaTachometerAlt className="text-purple-600 text-lg mr-1" />
            <span className="text-sm">{car.mileage} km/l</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center mt-4">
          <button
            className={`btn p-2 ${car.availability ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-md`}
          >
            <Link to={`/user/cardetails/${car._id}`}>{car.availability ? 'Book Now' : 'Not Available'}</Link>
          </button>
          <button className="btn  border border-purple-600 px-3 py-1 rounded">
            {car.pricePerDay}/Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
