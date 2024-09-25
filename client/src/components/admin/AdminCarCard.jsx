import React from 'react'
import { Link } from 'react-router-dom'

import Btn from '../ui/Btn';
import { toast } from 'react-toastify';

export const AdminCarCard = ({car}) => {

  return (
    <div>
        <div className="border border-gray-200 rounded-lg  shadow-md p-2 mx-3">
        <Btn>
                    <Link to={`/admin/car/${car._id}`}>More</Link>
                </Btn>
      <img src={car.image} alt={car.model} className="w-full h-56  object-contain rounded-md my-0 py-0" />
      <div className=' text-center ' >
      <h5>id : {car._id}</h5>
      <h3 className="text-2xl font-bold "> {car.brand} {car.model}</h3>
      <div className='text-xl font-semibold'>
      <h5>price : {car.pricePerDay}/day</h5>
      <h5>year : {car.year}</h5>
      
      </div>
      </div>
      <div className="flex justify-between items-center mt-2">
       
        
                
            
      </div>
    </div>

    </div>
  )
}
