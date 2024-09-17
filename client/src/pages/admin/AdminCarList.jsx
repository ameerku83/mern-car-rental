import React, { useEffect, useState } from 'react'


import { AdminCarCard } from '../../components/admin/AdminCarCard'
import { axiosInstance } from '../../config/axiosInstance'
import { CarCardSkeliton } from '../../components/ui/CarCardSkeliton'

export const AdminCarList = () => {
    const [cars,setCars]=useState([])
    const [selectedCategory, setSelectedCategory] = useState("Luxury");

    useEffect(() => {
      if (selectedCategory) {
        fetchCarsByCategory(selectedCategory);
        console.log(selectedCategory);
        
      }
    }, [selectedCategory]);
  
    const fetchCarsByCategory = async (category) => {
      try {
        const response = await axiosInstance.get(`car/cars/${category}`);
        setCars(response?.data?.data);
        
      
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleDelete = (id) => {
        setCars(cars.filter((car) => car._id !== id));
      };

    if(cars.length===0) return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" >
       <CarCardSkeliton/>  <CarCardSkeliton/>  <CarCardSkeliton/>  <CarCardSkeliton/>
       <CarCardSkeliton/>  <CarCardSkeliton/>  <CarCardSkeliton/>  <CarCardSkeliton/>
       <CarCardSkeliton/>  <CarCardSkeliton/>  <CarCardSkeliton/>  <CarCardSkeliton/>
       <CarCardSkeliton/>  <CarCardSkeliton/>  <CarCardSkeliton/>  <CarCardSkeliton/>
        </div>
    )
    

  return (
    <div>
    <div className="md:flex gap-2 mb-4 text-xl justify-center font-bold mx-10 text-center ">
    <h4 
      className={` rounded bg-base-300 m-1 p-3 cursor-pointer transition transform duration-200 ${selectedCategory === 'Luxury' ? 'font-bold text-purple-600 scale-90 border border-gray-500' : ''}`}
      onClick={() => setSelectedCategory('Luxury')}
    >
      Luxury
    </h4>
    <h4 
      className={` rounded bg-base-300  m-1  p-3 cursor-pointer transition transform duration-200 ${selectedCategory === 'SUV' ? 'font-bold text-purple-600 scale-90 border border-gray-500 ' : ''}`}
      onClick={() => setSelectedCategory('SUV')}
    >
      SUV
    </h4>
    <h4 
      className={` rounded bg-base-300 p-3 m-1 cursor-pointer transition transform duration-200 ${selectedCategory === 'Hatchback' ? 'font-bold text-purple-600 scale-90 border border-gray-500' : ''}`}
      onClick={() => setSelectedCategory('Hatchback')}
    >
      Hatchback
    </h4>
    <h4 
      className={` rounded bg-base-300 p-3 m-1  cursor-pointer transition transform duration-200 ${selectedCategory === 'Sedan' ? 'font-bold text-purple-600 scale-90 border border-gray-500' : ''}`}
      onClick={() => setSelectedCategory('Sedan')}
    >
      Sedan
    </h4>
  </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
     
        
     { cars.map(( car )=>(

        <AdminCarCard key={car._id} car={car} onDelete={handleDelete} />
       ))   } 

    </div>
    </div>
  )
}



