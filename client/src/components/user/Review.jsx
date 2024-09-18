
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Btn from '../ui/Btn';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

const Review = ({userId,carId}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {

    const reviewData = {
        userId:userId,
        carId:carId,
        rating:data.rating,
        comment:data.comment
    }
   
  
    try {
     const response = await axiosInstance.post('user/review',reviewData);
      reset(); 
      toast.success('Review added successfully!');
      window.location.reload()
      console.log(response?.data);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error( 'Failed to submit review');
      console.log(error);
      
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-scale-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

      
      <div className="mb-4">
  <label className="block">Select Rating</label>
  <div className="rating">
    
    {[1, 2, 3, 4, 5].map((star) => (
      <input
        key={star}
        type="radio"
        {...register('rating', { required: 'Rating is required' })}
        value={star}
        className="mask mask-star-2 bg-yellow-500"
      />
    ))}
  </div>
  {errors.rating && <p className="text-red-600 text-sm">{errors.rating.message}</p>}
</div>


        {/* Comment */}
        <div className="mb-4">
          <label className="block ">Comment</label>
          <textarea
            {...register('comment', {
              required: 'Comment is required',
              minLength: { value: 10, message: 'Comment must be at least 10 characters long' },
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Write your review here..."
          />
          {errors.comment && <p className="text-red-600 text-sm">{errors.comment.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Btn type="submit" className="btn btn-primary w-full">Submit Review</Btn>
        </div>
      </form>
    </div>
  );
};

export default Review;





















