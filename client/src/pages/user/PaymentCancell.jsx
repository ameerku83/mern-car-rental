import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const PaymentCancell = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/user/home')

    },6000)

  },[])
  return (
    <div >
              <h1 className=' text-red-700 text-2xl pt-28 font-bold text-center' >Payment failed....!!</h1>

       
    </div>
  )
}
