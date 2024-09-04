
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Review = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/reviews', { ...data,});
      reset(); 
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-scale-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

      
        <div className="mb-4">
          <label className="block ">Select Rating</label>
          <select
            {...register('rating', { required: 'Rating is required' })}
            className="select select-bordered w-full"
          >
            <option value="">Select Rating</option>
            
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            
          </select>
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
          <button type="submit" className="btn btn-primary w-full">Submit Review</button>
        </div>
      </form>
    </div>
  );
};

export default Review;





















