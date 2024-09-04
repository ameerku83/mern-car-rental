import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const PaymentSucces = () => {
 const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/user/home')

    },8000)

  },[])

    
  return (
    <div  >
        <h1 className=' text-green-700 text-2xl pt-28 font-bold text-center' >Payment success....!!</h1>
    </div>
  )
}
