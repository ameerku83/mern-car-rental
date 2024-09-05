import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { toast } from 'react-toastify'

export const UsersReviews = () => {
    const [reviews,setReviews]=useState([])
    useEffect(()=>{
        
        const fetchPayment = async  ()=>{
            try {
                
            const response = await axiosInstance.get( "admin/reviews" )
            console.log(response?.data);
            setReviews(response?.data.data)
            
            } catch (error) {
                console.log(error);
                
            }
        }

        fetchPayment()
    },[])

    const deleteReview = async (id)=>{
        try {
            await axiosInstance.delete(`admin/delete-review/${id}`)
            setReviews(reviews.filter((review)=>review._id !== id))
            toast.success('review deleted')
        } catch (error) {
            console.log(error);
            
        }
        
    }
  return (
    <div>
         <h1 className=' text-2xl font-bold text-center'> Users Reviews</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {
             reviews.map((review)=>(
                <div className="border border-gray-200 rounded-lg  shadow-md p-4 mx-4 mt-4 md:mt-6 sm:mt-5">
                <img src={review.car.image} alt="img" className="w-full h-40 object-contain rounded-md" />
                <div className=' text-center mt-2 ' >
                <h3 className="text-2xl font-bold mt-4"> {review.car.brand} {review.car.model}</h3>
                <div className='text-md font-semibold'>
                
                <h5>User name : {review.user.name}</h5>
                <h5> {review.user.email}</h5>
                <h5>mobile : {review.user.mobile}</h5>
                <h5>Rating : {review.rating}</h5>
                <h5>Comment : {review.comment}</h5>
               
               
                {/* <h5> fuel type : {review.fuelType}</h5>
                <h5>capacity : {review.capacity}</h5>
                <h5>mileage : {review.mileage}</h5> */}
               
                </div> 
                </div>
                <div className="flex justify-center items-center mt-2">
                
                <button className='btn btn-error' onClick={()=>deleteReview(review._id)} > Delete Review </button>
              
                </div>
              </div>

               ))  
        }
        </div>
    </div>
  )
}




