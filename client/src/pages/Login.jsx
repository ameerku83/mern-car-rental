import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Install react-toastify for notifications

import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate()
   
  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('user/login', data,);
      toast.success('Logged in successfully');
    navigate('/user/home')
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response);
      
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <label  > <Link to={ "/signup" } className='text-blue-800 flex justify-center text-sm mt-3 hover:underline '>New Sign up Now </Link>  </label>
        </form>
      </div>
    </div>
  );
};

export default Login;
