import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { toast } from 'react-toastify'

export const UsersPayments = () => {
    const [payments,setPayments] = useState([])
    useEffect(()=>{
        
        const fetchPayment = async  ()=>{
            try {
                
            const response = await axiosInstance.get( "admin/payments" )
            console.log(response?.data);
            setPayments(response?.data.data)
            
            } catch (error) {
                console.log(error);
                
            }
        }

        fetchPayment()
    },[])
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-CA'); 
    };
    const deletePayment = async(id)=>{
        try {
                
             await axiosInstance.delete( `admin/delete-payment/${id}` )
             setPayments(payments.filter((payment)=> payment._id !== id ))
            toast.success('payment deleted')
            } catch (error) {
                console.log(error);
                
            }

    }
  return (
    <div>
          <h1 className=' text-2xl font-bold text-center'> Users Payments</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {
             payments.map((payment)=>(
                <div className="border border-gray-200 rounded-lg  shadow-md p-4 mx-4 mt-4 md:mt-6 sm:mt-5">
                <img src={payment.car.image} alt="img" className="w-full h-40 object-contain rounded-md" />
                <div className=' text-center mt-2 ' >
                <h3 className="text-2xl font-bold mt-4"> {payment.car.brand} {payment.car.model}</h3>
                <div className='text-md font-semibold'>
                
                <h5>User name : {payment.user.name}</h5>
                <h5> {payment.user.email}</h5>
                <h5>mobile : {payment.user.mobile}</h5>
                <h5>Amount : {payment.amount}</h5>
                <h5>Payment status : {payment.status}</h5>
                <h5>Date : {formatDate(payment.paymentDate)}</h5>
                
               
               
                {/* <h5> fuel type : {review.fuelType}</h5>
                <h5>capacity : {review.capacity}</h5>
                <h5>mileage : {review.mileage}</h5> */}
               
                </div> 
                </div>
                <div className="flex justify-center items-center mt-2">
                
                <button className='btn btn-error' onClick={()=>deletePayment(payment._id)} > Delete Review </button>
              
                </div>
              </div>

               ))  
        }
        </div>

    </div>
  )
}
