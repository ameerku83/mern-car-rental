import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Install react-toastify for notifications

import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import Btn from '../components/ui/Btn';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false); // For controlling password update
  const navigate = useNavigate();
  const { id } = useParams();

  // Watching password field
  const password = watch('password', '');

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(`user/profile`);
          setValue('name', response.data.data.name);
          setValue('email', response.data.data.email);
          setValue('mobile', response.data.data.mobile);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    // Prepare the signup data
    const signupdata = {
      name: data.name.trim(),
      email: data.email.trim(),
      mobile: data.mobile.trim(),
    };

    // If updating password or creating a new user, add password to the data
    if (updatePassword || !id) {
      signupdata.password = data.password.trim();
    }

    // Handle update or create
    if (id) {
      try {
        await axiosInstance.put(`user/update/${id}`, signupdata);
        toast.success('Account updated successfully');
        navigate('/user/profile');
      } catch (error) {
        toast.error(error.response.data.error);
        console.log(error);
      }
    } else {
      try {
        await axiosInstance.post('user/create', signupdata);
        toast.success('Account created successfully');
        navigate('/user/home');
      } catch (error) {
        console.error(error.response);
        toast.error(error.response.data.error);
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center pt-24">
      <div className="bg-base-200 p-3 py-1 rounded shadow w-full max-w-sm border-purple-600 border-s-2">
        <h2 className="text-2xl font-bold mb-2 text-center">{id ? "Update Profile" : "Sign up"}</h2>
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
            {errors.mobile && <p className="text-red-500">{errors.mobile?.message}</p>}
          </div>

          {/* Checkbox to update password */}
          {id && (
            <div className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  onChange={() => setUpdatePassword(!updatePassword)}
                  className="mr-2"
                />
                Change Password
              </label>
            </div>
          )}

          {/* Conditionally render password fields */}
          {(!id || updatePassword) && (
            <>
              <div className="mb-2 relative">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', {

                    required: updatePassword || !id ? 'Password is required' : false,
                    pattern: {
                      value: /^[A-Za-z0-9!@#$%^&*()_+=-]{4,20}$/,
                      message: "Minimum 4 characters"
                    }
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
                    required: updatePassword || !id ? 'Confirm Password is required' : false,
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
            </>
          )}

          <div className="flex justify-center">
            <Btn type="submit" className="p-2 rounded w-full">{id ? "Update" : "Sign up"}</Btn>
          </div>
          
          {id ? null : (
            <span>
              <Link className="text-blue-800 flex justify-center text-sm mt-3 hover:underline" to="/login">Login Now</Link>
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
