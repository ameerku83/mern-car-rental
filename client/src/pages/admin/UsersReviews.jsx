import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

export const UsersReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [userName, setUserName] = useState('');

    // Fetch reviews from the backend
    const fetchReviews = async (userName = '') => {
        try {
            const response = await axiosInstance.get("admin/reviews", {
                params: { userName }
            });
            setReviews(response?.data?.data || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch reviews");
            console.log(error);
        }
        
    };

    useEffect(() => {
    
        fetchReviews();
       
    }, []);

    // Handle review deletion
    const deleteReview = async (id) => {
        try {
            await axiosInstance.delete(`admin/delete-review/${id}`);
            setReviews(reviews.filter((review) => review._id !== id));
            toast.success('Review deleted');
        } catch (error) {
            toast.error('Error deleting review');
            console.log(error);
        }
    };

    // Handle search by username
    const handleSearch = () => {
        fetchReviews(userName);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-4">Users Reviews</h1>

            {/* Search input */}
            <div className="flex justify-center my-4">
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Search by user email"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={handleSearch} className="btn btn-primary ml-2">Search</button>
            </div>

            {/* Reviews grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="border border-gray-200 rounded-lg shadow-md p-4 mx-4 mt-4">
                            {/* Check if car image exists */}
                            {review.car?.image ? (
                                <img
                                    src={review.car.image}
                                    alt="Car"
                                    className="w-full h-40 object-contain rounded-md"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
                                    <p>No image available</p>
                                </div>
                            )}
                            <div className="text-center mt-2">
                                {/* Display car brand and model or placeholder */}
                                <h3 className="text-lg font-bold">
                                    {review.car?._id || ' Car id not found'}
                                </h3>
                                <h3 className="text-xl font-bold">
                                    {review.car?.brand || 'Unknown Car'} {review.car?.model || ''}
                                </h3>
                                <div className="text-md font-semibold mt-2">
                                    {/* Check if user data exists and display accordingly */}
                                    
       
                           <h5>User Name: {review.user?.name || 'unknown'}</h5>
                    <h5>Email: {review.user?.email || 'No email available'}</h5>
                        <h5>Mobile: {review.user?.mobile || 'No mobile number available'}</h5>
      
    

                                    <h5>Rating: {review.rating || 'No rating available'}</h5>
                                    <h5>Comment: {review.comment || 'No comment available'}</h5>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-2">
                                <button className="btn btn-error" onClick={() => deleteReview(review._id)}>
                                    Delete Review
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No reviews found.</p>
                )}
            </div>
        </div>
    );
};
