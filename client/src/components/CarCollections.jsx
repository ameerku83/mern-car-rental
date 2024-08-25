import React, { useState } from 'react';
import CarCard from './CarCard';
import bmwi4 from "../asets/images/BMW_i4_IMG_6695-removebg-preview 1.png"
import bmwix5 from "../asets/images/bmw_x5-removebg-preview 2.png"

const CarCollections = () => {
  const [activeBrand, setActiveBrand] = useState('BMW');
  const cars = [
    { image: 'https://www.hdcarwallpapers.com/walls/2023_bmw_m2_001_4k-HD.jpg', model: 'BMW M3', price: 300, rating: 4 },
    { image: bmwix5, model: 'BMW M4', price: 400, rating: 5 },
    { image: bmwi4, model: 'BMW M5', price: 450, rating: 3 },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Collections</h2>
      <div className="flex justify-center space-x-4 mb-8">
        <button className={`p-2 ${activeBrand === 'Mercedes' ? 'border border-yellow-500' : ''}`} onClick={() => setActiveBrand('Mercedes')}>
          <img src="https://path/to/mercedes/logo" alt="Mercedes" className="h-12" />
        </button>
        <button className={`p-2 ${activeBrand === 'Porsche' ? 'border border-yellow-500' : ''}`} onClick={() => setActiveBrand('Porsche')}>
          <img src="https://path/to/porsche/logo" alt="Porsche" className="h-12" />
        </button>
        <button className={`p-2 ${activeBrand === 'BMW' ? 'border border-yellow-500' : ''}`} onClick={() => setActiveBrand('BMW')}>
          <img src="https://path/to/bmw/logo" alt="BMW" className="h-12" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <CarCard key={index} image={car.image} model={car.model} price={car.price} rating={car.rating} />
        ))}
      </div>
    </div>
  );
};

export default CarCollections;
