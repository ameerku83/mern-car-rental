import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const CancelBooking = () => {

    const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/user/home')

    },8000)

  },[])
  return (

    <div  >
    <h1 className=' text-red-700 text-xl pt-28 font-bold text-center mx-3' > Your booking has been cancelled ,
        we will refund your payment with in one or two days </h1>
</div>
    
   
   
  )
}

export default CancelBooking