import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCalendar, AiOutlineHome, AiOutlinePhone, AiOutlineEnvironment } from 'react-icons/ai';
import Btn from '../ui/Btn';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookingComponent = ({ id }) => {
    const [isDriving, setIsDriving] = useState(false); 
    const navigate= useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userId = useSelector((state) => state.user.id); 
    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/'); 
        return `${year}-${month}-${day}`; 
       };
    const onSubmit = async (data) => {
        try {
             const startDateFormatted = formatDate(data.startDate);
        const endDateFormatted = formatDate(data.endDate);
            const bookingData = {
                 
                car:id,
                user:userId,
                startDate: startDateFormatted,
                endDate: endDateFormatted,
                address:data.address,
                mobile:data.mobile,
                pickupLocation:data.pickupLocation,
                pickupTime:data.pickupTime,
                dropOffTime:data.dropOffTime,
                dropOffLocation:data.dropOffLocation,
                  driverLicense:data.driverLicense
            };
            console.log(id);


            const response = await axiosInstance.post('user/booking', bookingData);
            console.log(response?.data?.data);
              navigate(`/user/booking/${response?.data?.data._id}`)
                toast.success('Car booked successfully!');
             
            
        } catch (error) {
            toast.error('Error booking the car');
            console.log(error);
        }
    };
  
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-lg mx-auto p-4 bg-base-200 shadow-md rounded-md">
            <div className="mb-4">
                <label htmlFor="startDate" className="block text-sm font-medium">
                    Start Date
                </label>
                <div className="relative mt-1">
                    <input
                        type="date"
                        id="startDate"
                        {...register('startDate', { required: true })}
                        className="p-2 w-full border rounded-md pl-10"
                    />
                    <AiOutlineCalendar className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="pickupTime" className="block text-sm font-medium">
                    Pickup Time
                </label>
                <div className="relative mt-1">
                    <input
                        type="time"
                        id="pickupTime"
                        {...register('pickupTime', { required: true })}
                        className="p-2 w-full border rounded-md pl-10"
                    />
                    <AiOutlineCalendar className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="endDate" className="block text-sm font-medium">
                    End Date
                </label>
                <div className="relative mt-1">
                    <input
                        type="date"
                        id="endDate"
                        {...register('endDate', { required: true })}
                        className="p-2 w-full border rounded-md pl-10"
                    />
                    <AiOutlineCalendar className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            

            <div className="mb-4">
                <label htmlFor="dropOffTime" className="block text-sm font-medium">
                    Drop Off Time
                </label>
                <div className="relative mt-1">
                    <input
                        type="time"
                        id="dropOffTime"
                        {...register('dropOffTime', { required: true })}
                        className="p-2 w-full border rounded-md pl-10"
                    />
                    <AiOutlineCalendar className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium">
                    Address
                </label>
                <div className="relative mt-1">
                    <input
                        type="text"
                        id="address"
                        placeholder="Enter your address"
                        {...register('address', { required: true ,pattern: { value:  /^[A-Za-z0-9!@#$%^&*?<>,.;'":[]{}()_+=-]{4,150}$/, message: "minimum 4 character" }})}
                        className="p-2 w-full border rounded-md pl-10"
                    />
                    <AiOutlineHome className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="mobile" className="block text-sm font-medium">
                    Mobile
                </label>
                <div className="relative mt-1">
                    <input
                        id="mobile"
                        type="text"
                        placeholder="Enter your mobile number"
                        {...register('mobile', { required: 'Mobile number is required', pattern: { value: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' } })}
                        className="input input-bordered w-full pl-10 p-2"
                    />
                    <AiOutlinePhone className="absolute left-3 top-3 text-gray-400" />
                </div>
                <span className='text-red-600'> {errors.mobile?.message} </span>
            </div>

            <div className="mb-4">
                <label htmlFor="pickupLocation" className="block text-sm font-medium">
                    Pickup Location
                </label>
                <div className="relative mt-1">
                    <select
                        id="pickupLocation"
                        {...register('pickupLocation', { required: true })}
                        className="p-2 w-full border rounded-md pl-10"
                    >
                        <option value="Bitherkad">Bitherkad</option>
                        <option value="Nelakota">Nelakota</option>
                        <option value="Devarshola">Devarshola</option>
                        <option value="Gudalure">Gudalure</option>
                        <option value="Patavayal">Patavayal</option>
                        <option value="Padanthorai">Padanthorai</option>
                        <option value="Cholady">Cholady</option>
                        <option value="Uppatty">Uppatty</option>
                        <option value="Panthalure">Panthalure</option>
                        <option value="Pakkana">Pakkana</option>
                        <option value="Ooty">Ooty</option>
                        <option value="Chrambady">Chrambady</option>
                        <option value="Oorkadavu">Oorkadavu</option>
                    </select>
                    <AiOutlineEnvironment className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="dropOffLocation" className="block text-sm font-medium">
                    Drop Off Location
                </label>
                <div className="relative mt-1">
                    <select
                        id="dropOffLocation"
                        {...register('dropOffLocation', { required: true })}
                        className="p-2 w-full border rounded-md pl-10"
                    >
                        <option value="Bitherkad">Bitherkad</option>
                        <option value="Nelakota">Nelakota</option>
                        <option value="Devarshola">Devarshola</option>
                        <option value="Gudalure">Gudalure</option>
                        <option value="Patavayal">Patavayal</option>
                        <option value="Padanthorai">Padanthorai</option>
                        <option value="Cholady">Cholady</option>
                        <option value="Uppatty">Uppatty</option>
                        <option value="Panthalure">Panthalure</option>
                        <option value="Pakkana">Pakkana</option>
                        <option value="Ooty">Ooty</option>
                        <option value="Chrambady">Chrambady</option>
                        <option value="Oorkadavu">Oorkadavu</option>
                    </select>
                    <AiOutlineEnvironment className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">
                    <input
                        type="checkbox"
                        {...register('isDriving')}
                        checked={isDriving}
                        onChange={() => setIsDriving(!isDriving)}
                        className="mr-2"
                    />
                    Drive yourself
                </label>
            </div>

            {/* Conditionally render driver license input */}
            {isDriving && (
                <div className="mb-4">
                    <label htmlFor="driverLicense" className="block text-sm font-medium">
                        Driver's License Number
                    </label>
                    <div className="relative mt-1">
                        <input
                            type="text"
                            id="driverLicense"
                            placeholder="Enter your driver's license number"
                            {...register('driverLicense', { required: "enter driver's license number ", pattern: { value:  /^[A-Za-z0-9!@#$%^&*?<>,.;'":[]{}()_+=-]{10,20}$/, message: "Enter a valid licence number" } })}
                            className="p-2 w-full border rounded-md"
                        />
                    </div>
                    {errors.driverLicense && <span className="text-red-600">{errors.driverLicense.message}</span>}
                </div>
            )}

            <div className="flex justify-center">
                <Btn type="submit" className="mt-4 p-2 rounded-md w-full">Book Now</Btn>
            </div>
        </form>
    );
};

export default BookingComponent;
