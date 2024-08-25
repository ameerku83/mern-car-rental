import React from 'react';
import StarRating from './ui/StarRating';

const CarCard = ({ image, model, price, rating }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-4 mx-4">
      <img src={image} alt={model} className="w-full h-40 object-contain rounded-md" />
      <h3 className="text-lg font-semibold mt-4">{model}</h3>
      <StarRating rating={rating} />
      <div className="flex justify-between items-center mt-2">
        <button className="btn btn-primary">Book now</button>
        <span className="text-gray-500">{price}/hour</span>
      </div>
    </div>
  );
};

export default CarCard;
