import React from 'react'
import { Link } from 'react-router-dom'

export const PaymentSucces = () => {
    
  return (
    <div className=' pt-28' >
        <h1 className=' text-green-700 text-2xl' >Payment succes</h1>
     <button> <Link to={'/user/home'} ></Link> </button>
    </div>
  )
}
