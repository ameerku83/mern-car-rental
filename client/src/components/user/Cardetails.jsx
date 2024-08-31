import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaCar, FaGasPump, FaCogs, FaTachometerAlt } from 'react-icons/fa';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

export const Cardetails = () => {
    const {id}=useParams()
    const [car,setCar]=useState([])
    useEffect(() => {
        const fetchCar = async ()=>{
            
                 try {
                   const response = await axiosInstance.get(`car/single-car/${id}`,{
                     })
                    setCar(response?.data?.data)
                     
                 } catch (error) {
                     toast.error("Error fetching car data");
                     console.log(error);
                     
                 }
               
             }
        
        fetchCar()
      }, [id]);
  return (
    
        
      <div className='pt-28 ' > 

     <div className="max-w-4xl lg:mx-auto bg-scale-300 shadow-md rounded-lg overflow-hidden md:flex border border-purple-200 pt-5 px-5 mx-5">
        <div>
        <img className="w-full  h-64 object-contain" src={car.image} alt={`${car.brand} ${car.model}`} />
        </div>
        <div>
        <div className="p-6">
             <h2 className="text-2xl font-bold ">{car.brand} {car.model}</h2>
              <p className="">Year: {car.year}</p>
              <p className="">Price Per Day: <b>{car.pricePerDay}/-</b> </p>
               <p className="">Capacity: {car.capacity} people</p>
               <p className="">Mileage: {car.mileage} km/l</p>
               <div className="flex items-center mt-4">
            <FaGasPump className=" mr-2" />
             <p className="">{car.fuelType}</p>
              </div>
         <div className="flex items-center mt-2">
         <FaCogs className=" mr-2" />
        <p className="">{car.transmission}</p>
      </div>
        <div className="flex items-center mt-2">
      <FaTachometerAlt className=" mr-2" />
    <p className="">Mileage: {car.mileage} km/l</p>
  </div>
  <div className={`mt-4 p-2 ${car.availability ? 'bg-green-500' : 'bg-red-500'} text-white rounded-md text-center`}>
    {car.availability ? 'Available' : 'Not Available'}
  </div>
      </div>
        </div>

     
    </div>
    </div> 
    
  )
}
