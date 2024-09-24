import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {  FaGasPump, FaCogs, FaTachometerAlt, FaUsers, FaStar, FaUserCircle } from 'react-icons/fa';

import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CardetailSkeleton } from '../ui/CardetailSkeleton';

import BookingComponent from './BookingComponent';

export const Cardetails = () => {
   
    const {id}=useParams()
    const [car,setCar]=useState([])
    const [reviews,setReviews]= useState([])
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
      
      const [averageRating, setAverageRating] = useState(0);
      const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < rating) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
          } else {
            stars.push(<FaStar key={i} className="text-gray-400" />);
          }
        }
        return stars;
      };
    
        useEffect(() => {
            const fetchReviews = async () => {
              if (!car?._id) return
        
                try {
                    const response = await axiosInstance.get(`user/carreviews/${car._id}`);
                    
                    const fetchedReviews = response?.data.data 
                    setReviews (response?.data?.data )
                    
                    if (fetchedReviews.length > 0) {
                      const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
                      const avgRating = totalRating / fetchedReviews.length;
                      setAverageRating(avgRating);
                    } else {
                      setAverageRating(0); // Set to 0 if no reviews
                    }
                } catch (error) {
                    console.log(error);
                    toast.error('Error fetching reviews');
                }
            };
           
        
            fetchReviews();
        }, [car._id]); 
         

      
    if(car.length===0) return(
      <div className=' pt-28'>
        <h3  className=' text-center text-3xl my-2 font-bold ' >Car details</h3>
        <CardetailSkeleton/>

      </div>
    )
  return (  
    
        
      <div className='pt-24 ' > 
      <h3  className=' text-center text-3xl my-2 font-bold' >Car details</h3>

     <div className="max-w-4xl lg:mx-auto  shadow-md rounded-lg overflow-hidden md:flex border border-purple-200 pt-5 px-5 mx-5">
        <div>
        <img className="w-full  h-64 object-contain" src={car.image} alt={`${car.brand} ${car.model}`} />
        <p  className='flex' >Rating: <span className='mt-1 flex' > {renderStars(Math.round(averageRating))}</span> </p>
        </div>
        <div>
        <div className="p-2 mx-2">
             <h2 className="text-2xl font-bold ">{car.brand} {car.model}</h2>
              <p className="">Year: {car.year}</p>
              <p className="">Price Per Day: <b>{car.pricePerDay}/-</b> </p>
               <p className="">Capacity: {car.capacity} people</p>
               <p className="">Mileage: {car.mileage} km/l</p>
               <div className="flex items-center mt-4">
            <FaGasPump className=" mr-2" />
             <p className="">{car.fuelType}</p>
              </div>
              <div className="flex items-center mt-4">
            <FaUsers className=" mr-2" />
             <p className="">{car.capacity} people</p>
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
    {reviews.length > 0 &&       <section className="my-16 px-5 ">
          
          <h2 className="text-3xl font-bold text-center mb-2 text-purple-600">Reviews ({reviews.length})</h2>
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="flex space-x-4  hide-scrollbar md:justify-center">
            {reviews.map((review, index) => (
  <div key={index} className="bg-base-100 shadow-lg rounded-md p-3 flex-none">
    <div className="w-28">
      <div className="flex items-center mb-2">
        <FaUserCircle className="h-4 mx-1 text-gray-600" />
        <div className="font-semibold text-xs">
          {review.user?.name || 'Anonymous'}
        </div>
      </div>
      <div className="text-sm mb-2 overflow-hidden text-ellipsis whitespace-normal">
        {review.car?.brand || 'Unknown'} {review.car?.model || ''}
      </div>
      <div className="flex mb-2">
        {renderStars(review.rating)}
      </div>
      <p className="text-sm overflow-hidden text-ellipsis whitespace-normal">
        "{review.comment || 'No comment available'}"
      </p>
    </div>
  </div>
))}

           </div>
          </div>
            </section> 
             }


    {car.availability && (
      <div>
      <h3  className=' text-center text-xl my-2 font-bold' >Book Now</h3>
      <BookingComponent id={id}  />
      </div>
   
    )}
    </div> 
    
    
  )
}
