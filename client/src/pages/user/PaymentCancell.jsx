import React from 'react'
import { Link } from 'react-router-dom'

export const PaymentCancell = () => {
  return (
    <div className='text-red-700 pt-28'>
         <div>
        <h1 className=' text-2xl ' >Payment failed</h1>
     <button> <Link to={'/user/home'} ></Link> </button>
    </div>
    </div>
  )
}
