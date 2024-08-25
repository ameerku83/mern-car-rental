import {loadStripe} from '@stripe/stripe-js';
import { axiosInstance } from '../../config/axiosInstance';

// car detial,booking total price

const makePayment= async()=>{

    try {
        const stripe= await loadStripe(process.env.REACT_APP_stripe_publishable_key)

        const sesion= await axiosInstance.post("payment/create",{data:"booking data"})

    } catch (error) {
        console.log(error);
        
    }

}








//chekc out -------> payment page

