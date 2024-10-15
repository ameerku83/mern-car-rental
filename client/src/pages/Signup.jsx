// Signup.js
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import Btn from '../components/ui/Btn';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Watching password field
  const password = watch('password', '');

  const onSubmit = async (data) => {
    const signupData = {
      name: data.name.trim(),
      email: data.email.trim(),
      mobile: data.mobile.trim(),
      password: data.password.trim(),
    };

    try {
      await axiosInstance.post('user/create', signupData);
      toast.success('Account created successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Signup failed');
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center pt-24">
      <div className="bg-base-200 p-3 py-1 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
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
            <label htmlFor="mobile" className="block text-gray-700">Mobile</label>
            <input
              type="text"
              id="mobile"
              {...register('mobile', {
                required: 'Mobile is required',
                pattern: { value: /^[0-9]{10}$/, message: "Enter a valid mobile number" }
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
          </div>

          <div className="mb-2 relative">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: 'Password is required',
                pattern: { value: /^[A-Za-z0-9!@#$%^&*()_+=-]{4,20}$/, message: "Minimum 4 characters" }
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <span
              className="absolute right-2 top-9 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-2 relative">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) => value === password || "Passwords do not match"
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            <span
              className="absolute right-2 top-9 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex justify-center">
            <Btn type="submit" className="p-2 rounded w-full">Sign up</Btn>
          </div>
          
          <span>
            <Link className="text-blue-800 flex justify-center text-sm mt-3 hover:underline" to="/login">Login Now</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
