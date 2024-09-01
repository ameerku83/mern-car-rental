import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaCar, FaGasPump, FaCogs, FaTachometerAlt } from 'react-icons/fa';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

export const Cardetails = () => {
    const navigate = useNavigate()
    const {id}=useParams()
    const [car,setCar]=useState([])
    const { register, handleSubmit } = useForm();
    const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/'); // Split the date string
    return `${year}-${month}-${day}`; // Rearrange to yyyy-mm-dd
   };
   const [user,setUser]=useState({})

     useEffect(() => {
      
        const fetchUser = async () => {
            try {
             const response= await axiosInstance.get('user/profile',);
              setUser(response?.data?.data)
              //toast.success('account created suc');
            
            } catch (error) {
             // toast.error(error.response.data.message);
              console.log(error);
              
            }
          };
          fetchUser()
      
    }, [])
    
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

      const onSubmit = async (data) => {
        try {
             const startDateFormatted = formatDate(data.startDate);
        const endDateFormatted = formatDate(data.endDate);
            const bookingData = {
                 // Replace with actual user ID from authentication context
                car:id,
                user:user._id,
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

    {car.availability && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                    type="date"
                    id="startDate"
                    {...register('startDate', { required: true })}
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mt-4">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    type="date"
                    id="endDate"
                    {...register('endDate', { required: true })}
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <input
                    type="text"
                    id=""
                    placeholder='address'
                    {...register('address', { required: true })}
                    className="mt-1 p-2 w-full border rounded-md"
                />
                 <input
                    type="text"
                    id=""
                    placeholder='mobile'
                    {...register('mobile', { required: true })}
                    className="mt-1 p-2 w-full border rounded-md"
                />
                  <input
                    type="text"
                    placeholder='pick'
                    id=""
                    {...register('pickupLocation', { required: true })}
                    className="mt-1 p-2 w-full border rounded-md"
                />
                
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full"
            >
                Book Now
            </button>
        </form>
    )}
    </div> 
    
    
  )
}
