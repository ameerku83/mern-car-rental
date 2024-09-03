import React from 'react';
import StarRating from './ui/StarRating';
import Btn from './ui/Btn';
import { AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom';

const CarCard = ({ rating ,car}) => {
  return (
    <div className="relative"> {/* Making the container relative */}
    <div className="rounded-lg shadow-md p-4 mx-4 mt-4 md:mt-4 sm:mt-5 bg-base-100 border-purple-100 border">
      <div className="relative">
        <img src={car.image} alt={car.model} className="w-full h-40 object-contain rounded-md" />
        {/* Heart Icon */}
        <div className="absolute top-2 right-2">
          <AiOutlineHeart className="text-purple-600 text-2xl cursor-pointer hover:text-purple-800" />
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-4"> {car.brand}  {car.model}</h3>
      <StarRating rating={rating} />
      <div className="flex justify-between items-center mt-2">
      <button className={` btn mt-4 p-2 ${car.availability ? ' btn-success' : 'btn-error'} text-white rounded-md text-center`}>
   <Link to={`/user/cardetails/${car._id}`} > {car.availability ? 'Book Now' : 'Not Available'} </Link>
  </button>
        
        <span className="btn border border-purple-600">{car.pricePerDay}/Day</span>
      </div>
    </div>
  </div>
     
 
  );
};

export default CarCard;
