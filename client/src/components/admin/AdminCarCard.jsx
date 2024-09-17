import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance';
import Btn from '../ui/Btn';
import { toast } from 'react-toastify';

export const AdminCarCard = ({car,onDelete}) => {

       
    const deleteCar = async (id) => {
        await axiosInstance.delete(`car/delete/${id}`,);
        //{ headers: { 'Content-Type': 'multipart/form-data', }}
        
            onDelete(id); 
            toast.success("car deleted")
      };
    
   
  
  return (
    <div>
        <div className="border border-gray-200 rounded-lg  shadow-md p-2 mx-3">
      <img src={car.image} alt={car.model} className="w-full h-56  object-contain rounded-md my-0 py-0" />
      <div className=' text-center ' >
      <h3 className="text-2xl font-bold "> {car.brand} {car.model}</h3>
      <div className='text-xl font-semibold'>
      <h5>price : {car.pricePerDay}/day</h5>
      <h5>year : {car.year}</h5>
      <h5>category : {car.category}</h5>
      <h5>transmission : {car.transmission}</h5>
      <h5> fuel type : {car.fuelType}</h5>
      <h5>capacity : {car.capacity}</h5>
      <h5>mileage : {car.mileage}</h5>
      <h5>availablity : {car.availability.toString()}</h5>
      </div>
      </div>
      <div className="flex justify-between items-center mt-2">
       
        <Btn className="btn" > <Link to={`/admin/edit/${car._id}`} > edit</Link> </Btn>
        <button className='btn btn-error' onClick={()=>deleteCar(car._id)} >delete</button>
      </div>
    </div>

    </div>
  )
}
