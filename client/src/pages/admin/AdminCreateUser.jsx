
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Install react-toastify for notifications

import { Link, useNavigate, useParams } from 'react-router-dom';


import { axiosInstance } from '../../config/axiosInstance';
import Btn from '../../components/ui/Btn';
import { useState } from 'react';


const AdminCreateUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate()
 

   
  
   
  const onSubmit = async (data) => {
    try {
    await axiosInstance.post( 'admin/create-user',data )
    toast.success('account created')
        
    } catch (error) {
        console.log(error);
        toast.error(' error creating account ')
    }
   
  };

  return (
    <div className="flex items-center justify-center pt-24 ">
      <div className="bg-base-200 p-3 py-1 rounded shadow w-full max-w-sm border-purple-600 border-s-2 ">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700"> Name</label>
            <input
              type="name"
              id="name"
              {...register('name', { required: 'name is required' })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-2">
            <label htmlFor="mobile" className="block text-gray-700">mobile</label>
            <input
              type="mobile"
              id="mobile"
              {...register('mobile', { required: 'mobile is required',pattern:{value:/^[0-9]{10}$/, message:"enter valid mobile number"}})}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.mobile && <p className="text-red-500">{errors.mobile?.message}</p>}
          </div>
          <div className="mb-2 relative">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', { required: 'Password is required',min:4 })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <span
              className="absolute right-2 top-9 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
        <div className='flex justify-center' > <Btn type="submit" className=" p-2 rounded w-full">Sign up</Btn></div> 
        </form>
      </div>
    </div>
 );
};

export default AdminCreateUser;


