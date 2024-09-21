
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';
import Btn from '../../components/ui/Btn';

const ContactUs = () => {
    const [user,setUser]=useState({})

    useEffect(() => {
     
       const fetchUser = async () => {
           try {
            const response= await axiosInstance.get('user/profile',);
             setUser(response?.data?.data)
             //toast.success('account created suc');
           
           } catch (error) {
            // toast.error(error.response.data.message);
             console.log(error);
             
           }
         };
         fetchUser()
     
   }, [])
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
   const contactData={
        user:user._id,
        email:data.email,
        mobile:data.mobile,
        message:data.message
    }

    try {
       await axiosInstance.post("/user/contact",contactData)
       toast.success('Message sent successfully!');
      reset()
     
    } catch (error) {
     console.log(error);
     
      toast.error('Failed to send message.');
    }
  };

  return (
    <div className='pt-24' >
    <div className="container mx-auto p-4 max-w-md  shadow bg-base-200">
      <h2 className="text-2xl font-bold mb-4">Send your complaints and suggestions</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            type="text"
            {...register('mobile', { required: 'Mobile number is required', pattern: { value: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' } })}
            className={`input input-bordered w-full ${errors.mobile ? 'input-error' : ''}`}
          />
          {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder='Enter your message'
            {...register('message', { required: 'Message is required' })}
            className={`textarea textarea-bordered w-full ${errors.message ? 'textarea-error' : ''}`}
          />
          {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
        </div>

        <Btn
          type="submit"
          
        >
          Send Message
        </Btn>
      </form>
    </div>
    </div>
  );
};

export default ContactUs;
