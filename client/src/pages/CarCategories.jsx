import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosInstance'
import CarCard from '../components/CarCard'

export const CarCategories = () => {
    const [cars,setcar]=useState([])
    useEffect(()=>{
        const fetchCar= async()=>{
            try {
                const response = await axiosInstance.get("car/car-list",{headers: {'Content-Type': 'multipart/form-data',}})
               
                setcar(response?.data?.data);

            } catch (error) {
                console.log(error);
                
            }
           
        }
        
   fetchCar()
    },[])

 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
       { cars.map(( car )=>(

        <CarCard car={car} />
       ))   } 

    </div>
  )
}



