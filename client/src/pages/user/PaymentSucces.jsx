import React from 'react'
import { Link } from 'react-router-dom'

export const PaymentSucces = () => {
    
  return (
    <div>
        <h1 className=' text-success text-2xl' >Payment succes</h1>
     <button> <Link to={'/user/home'} ></Link> </button>
    </div>
  )
}
