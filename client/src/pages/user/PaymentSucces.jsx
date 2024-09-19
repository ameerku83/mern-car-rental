import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const PaymentSucces = () => {
 const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/user/home')

    },10000)

  },[])

    
  return (
    <div className='mx-4'  >
       <h2 className=' text-xl text-center pt-28' > Your booking confirmed and Payment successfully recieved ,check your email 
        we have send an email with booking informations</h2>
        <h1 className=' text-green-700 text-2xl mt-4 font-bold text-center' >Payment success....!!</h1>
    </div>
  )
}
