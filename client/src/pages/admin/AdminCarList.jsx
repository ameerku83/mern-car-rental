import React, { useEffect, useState } from 'react'


import { AdminCarCard } from '../../components/admin/AdminCarCard'
import { axiosInstance } from '../../config/axiosInstance'
import { CarCardSkeliton } from '../../components/ui/CarCardSkeliton'

export const AdminCarList = () => {
    const [cars,setCars]=useState([])
    useEffect(()=>{
        const fetchCar= async()=>{
            try {
                const response = await axiosInstance.get("car/car-list",)
                //
               
                setCars(response?.data?.data);

            } catch (error) {
                console.log(error);
                
            }
           
        }
        
   fetchCar()
    },[])
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
     { cars.map(( car )=>(

        <AdminCarCard key={car._id} car={car} onDelete={handleDelete} />
       ))   } 

    </div>
  )
}



