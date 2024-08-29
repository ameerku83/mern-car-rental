import React, { useEffect, useState } from 'react'


import { AdminCarCard } from '../../components/admin/AdminCarCard'
import { axiosInstance } from '../../config/axiosInstance'

export const AdminCarList = () => {
    const [cars,setCars]=useState([])
    useEffect(()=>{
        const fetchCar= async()=>{
            try {
                const response = await axiosInstance.get("car/car-list",)
                //{headers: {'Content-Type': 'multipart/form-data',}}
               
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

 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
       { cars.map(( car )=>(

        <AdminCarCard car={car} onDelete={handleDelete} />
       ))   } 

    </div>
  )
}



