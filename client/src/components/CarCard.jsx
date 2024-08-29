import React from 'react';
import StarRating from './ui/StarRating';
import Btn from './ui/Btn';

const CarCard = ({ rating ,car}) => {
  return (
     
  <div>
    
    <div className=" rounded-lg  shadow-md p-4 mx-4 mt-24 md:mt-24 sm:mt-5 bg-base-100 border-purple-100 border ">
      <img src={car.image} alt={car.model} className="w-full h-40 object-contain rounded-md" />
      <h3 className="text-lg font-semibold mt-4">{car.model}</h3>
      <StarRating rating={rating} />
      <div className="flex justify-between items-center mt-2">
        <Btn className=" ">Book now</Btn>
        <span className="btn border border-purple-600">{car.pricePerDay}/Day</span>
      </div>
    </div>
    </div>
  );
};

export default CarCard;
