import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Install react-toastify for notifications

import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';


const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate()
   
  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('user/create', data,);
      toast.success('account created successfully');
    navigate('/user/home')
    } catch (error) {
     // toast.error(error.response.data.message);
      console.log(error);
      
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700"> Name</label>
            <input
              type="name"
              id="name"
              {...register('name', { required: 'name is required' })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-gray-700">mobile</label>
            <input
              type="mobile"
              id="mobile"
              {...register('mobile', { required: 'mobile is required' })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', { required: 'Password is required' })}
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
          <span  > <Link className='text-blue-800 flex justify-center text-sm mt-3 hover:underline ' to={ "/login" } >Login Now </Link>  </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
