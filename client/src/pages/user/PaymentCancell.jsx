import React from 'react'
import { Link } from 'react-router-dom'

export const PaymentCancell = () => {
  return (
    <div>
         <div>
        <h1 className=' text-success text-2xl' >Payment failed</h1>
     <button> <Link to={'/user/home'} ></Link> </button>
    </div>
    </div>
  )
}
