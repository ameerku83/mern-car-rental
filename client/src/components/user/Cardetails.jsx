import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {  FaGasPump, FaCogs, FaTachometerAlt, FaUsers, FaStar } from 'react-icons/fa';
import { AiOutlineCalendar, AiOutlineHome, AiOutlinePhone, AiOutlineEnvironment } from 'react-icons/ai';

import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Btn from '../ui/Btn';
import { CardetailSkeleton } from '../ui/CardetailSkeleton';
import { useSelector } from 'react-redux';

export const Cardetails = () => {
    const navigate = useNavigate()
    const {id}=useParams()
    const [car,setCar]=useState([])
    const { register, handleSubmit,formState:{errors} } = useForm();
    const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/'); // Split the date string
    return `${year}-${month}-${day}`; // Rearrange to yyyy-mm-dd
   };
   const userId = useSelector((state) => state.user.id); 
  
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
         

      const onSubmit = async (data) => {
        try {
             const startDateFormatted = formatDate(data.startDate);
        const endDateFormatted = formatDate(data.endDate);
            const bookingData = {
                 // Replace with actual user ID from authentication context
                car:id,
                user:userId,
                startDate: startDateFormatted,
                endDate: endDateFormatted,
                address:data.address,
                mobile:data.mobile,
                pickupLocation:data.pickupLocation
               
            };
            console.log(id);


            const response = await axiosInstance.post('user/booking', bookingData);
            console.log(response?.data?.data);
              navigate(`/user/booking/${response?.data?.data._id}`)
                toast.success('Car booked successfully!');
             
            
        } catch (error) {
            toast.error('Error booking the car');
            console.log(error);
        }
    };
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

    {car.availability && (
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-lg mx-auto p-4 bg-base-200 shadow-md rounded-md">
      <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium">
              Start Date
          </label>
          <div className="relative mt-1">
              <input
                  type="date"
                  id="startDate"
                  {...register('startDate', { required: true })}
                  className="p-2 w-full border rounded-md pl-10"
              />
              <AiOutlineCalendar className="absolute left-3 top-3 text-gray-400" />
          </div>
      </div>

      <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium">
              End Date
          </label>
          <div className="relative mt-1">
              <input
                  type="date"
                  id="endDate"
                  {...register('endDate', { required: true })}
                  className="p-2 w-full border rounded-md pl-10"
              />
              <AiOutlineCalendar className="absolute left-3 top-3 text-gray-400" />
          </div>
      </div>

      <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium">
              Address
          </label>
          <div className="relative mt-1">
              <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  {...register('address', { required: true })}
                  className="p-2 w-full border rounded-md pl-10"
              />
              <AiOutlineHome className="absolute left-3 top-3 text-gray-400" />
          </div>
      </div>

      <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium">
              Mobile
          </label>
          <div className="relative mt-1">
          <input
            id="mobile"
            type="text"     
            placeholder='Enter your mobile number'
            {...register('mobile', { required: 'Mobile number is required', pattern: { value: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' } })}
            className="input input-bordered w-full pl-10 p-2"
          />
            
              <AiOutlinePhone className="absolute left-3 top-3 text-gray-400" />
          </div>
          <span className=' text-red-600'> {errors.mobile?.message} </span>
      </div>

      <div className="mb-4">
          <label htmlFor="pickupLocation" className="block text-sm font-medium">
              Pickup Location
          </label>
          <div className="relative mt-1">
              <select
                  id="pickupLocation"
                  {...register('pickupLocation', { required: true })}
                  className="p-2 w-full border rounded-md pl-10"
              >
                  <option value="Bitherkad">Bitherkad</option>
                  <option value="Nelakota">Nelakota</option>
                  <option value="Devarshola">Devarshola</option>
                  <option value="Gudalure">Gudalure</option>
                  <option value="Patavayal">Patavayal</option>
                  <option value="Padanthorai">Padanthorai</option>
                  <option value="Cholady">Cholady</option>
                  <option value="Uppatty">Uppatty</option>
                  <option value="Panthalure">Panthalure</option>
                  <option value="Pakkana">Pakkana</option>
                  <option value="Ooty">Ooty</option>
                  <option value="Chrambady">Chrambady</option>
                  <option value="Oorkadavu">Oorkadavu</option>
              </select>
              <AiOutlineEnvironment className="absolute left-3 top-3 text-gray-400" />
          </div>
      </div>

        <div className=' flex justify-center' >
        <Btn type="submit"  className="mt-4  p-2 rounded-md w-full " >  Book Now </Btn>
        </div> 
  </form>
    )}
    </div> 
    
    
  )
}
