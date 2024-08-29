import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance';
import Btn from '../ui/Btn';

export const AdminCarCard = ({car,onDelete}) => {

       
    const deleteCar = async (id) => {
        await axiosInstance.delete(`car/delete/${id}`,);
        //{ headers: { 'Content-Type': 'multipart/form-data', }}
        onDelete(id); 
        alert("product deleted")
      };

  return (
    <div>
        <div className="border border-gray-200 rounded-lg  shadow-md p-4 mx-4 mt-24 md:mt-24 sm:mt-5">
      <img src={car.image} alt={car.model} className="w-full h-40 object-contain rounded-md" />
      <div className=' text-center mt-2 ' >
      <h3 className="text-2xl font-bold mt-4">{car.model}</h3>
      <div className='text-xl font-semibold'>
      <h5>price : {car.pricePerDay}/day</h5>
      <h5>year : {car.year}</h5>
      <h5>transmission : {car.transmission}</h5>
      <h5> fuel type : {car.fuelType}</h5>
      <h5>capacity : {car.capacity}</h5>
      <h5>mileage : {car.mileage}</h5>
      <h5>availablity : {car.availability.toString()}</h5>
      </div>
      </div>
      <div className="flex justify-between items-center mt-2">
       
        <button className="btn btn-primary" > <Link to={`/admin/edit/${car._id}`} > edit</Link> </button>
        <Btn onClick={()=>deleteCar(car._id)} >delete</Btn>
      </div>
    </div>

    </div>
  )
}
