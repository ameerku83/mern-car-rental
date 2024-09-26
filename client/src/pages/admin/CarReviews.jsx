import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import Btn from '../../components/ui/Btn';
import { FaStar, FaUserCircle } from 'react-icons/fa';

export const CarReviews = () => {
    const { id } = useParams(); // Get the car ID from the URL
    const [car, setCar] = useState(null);
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axiosInstance.get(`admin/car/${id}`);
                if (response.data.success) {
                    setCar(response.data.data);
                } else {
                    toast.error("Car details not found");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch car details");
                console.log(error);
            }
        };
        fetchCarDetails();
    }, [id]);

    const [averageRating, setAverageRating] = useState(0);
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<FaStar key={i} className={i < rating ? "text-yellow-500" : "text-gray-400"} />);
        }
        return stars;
    };

    useEffect(() => {
        const fetchReviews = async () => {
            if (!id) return;
            try {
                const response = await axiosInstance.get(`admin/review/${id}`);
                const fetchedReviews = response?.data.data;
                setReviews(fetchedReviews);
                
                if (fetchedReviews.length > 0) {
                    const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
                    const avgRating = totalRating / fetchedReviews.length;
                    setAverageRating(avgRating);
                } else {
                    setAverageRating(0); // Set to 0 if no reviews
                }
            } catch (error) {
                console.log(error);
                toast.error('Error fetching reviews');
            }
        };
        fetchReviews();
    }, [id]); 

    const deleteCar = async (id) => {
        try {
            const userConfirmed = window.confirm('Do you want to delete this car?');
            if (!userConfirmed) return;
            await axiosInstance.delete(`car/delete/${id}`);
            toast.success("Car deleted");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            await axiosInstance.delete(`admin/delete-review/${reviewId}`);
            setReviews(reviews.filter((review) => review._id !== reviewId));
            toast.success('Review deleted');
        } catch (error) {
            toast.error('Error deleting review');
            console.log(error);
        }
    };

    if (!car) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-base-100 rounded-lg shadow-md p-6 border border-purple-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                        <img src={car.image} alt={car.model} className="w-full h-auto object-contain rounded-md" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
                        <div className="mt-4 space-y-2">
                            <p><strong>Price per day:</strong> {car.pricePerDay}</p>
                            <p><strong>Year:</strong> {car.year}</p>
                            <p><strong>Category:</strong> {car.category}</p>
                            <p><strong>Transmission:</strong> {car.transmission}</p>
                            <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                            <p><strong>Capacity:</strong> {car.capacity} people</p>
                            <p><strong>Mileage:</strong> {car.mileage} km</p>
                            <p><strong>Availability:</strong> {car.availability ? 'Available' : 'Unavailable'}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <Btn className="btn"><Link to={`/admin/edit/${car._id}`}>Edit</Link></Btn>
                            <button className="btn btn-error" onClick={() => deleteCar(car._id)}>Delete</button>
                        </div>
                        <p className='flex mt-2'>Rating: <span className='mt-1 flex'>{renderStars(Math.round(averageRating))}</span></p>
                    </div>
                </div>
            </div>
{reviews.length > 0 &&       <section className="my-16 px-5 ">
          
    <h2 className="text-3xl font-bold text-center mb-2 text-purple-600">Reviews ({reviews.length})</h2>
    <div className="overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-4  hide-scrollbar md:justify-center">
      {reviews.map((review, index) => (
<div key={index} className="bg-base-100 shadow-lg rounded-md p-3 flex-none">
<div className=" w-36">
<div className="flex items-center mb-2">
  <FaUserCircle className="h-4 mx-1 text-gray-600" />
  <div className="font-semibold text-xs">
    {review.user?.name || 'Anonymous'}
  </div>
</div>
<div className="text-sm mb-2 overflow-hidden text-ellipsis whitespace-normal">
  {review.car?.brand || 'Unknown'} {review.car?.model || ''}
</div>
<div className="flex mb-2">
  {renderStars(review.rating)}
</div>
<p className="text-sm overflow-hidden text-ellipsis whitespace-normal">
  "{review.comment || 'No comment available'}"
</p>
<div className="flex justify-center items-center mt-2">
                                <button className="btn btn-xs btn-error" onClick={() => deleteReview(review._id)}>
                                    Delete 
                                </button>
                            </div>
</div>
</div>
))}

     </div>
    </div>
      </section> 
       }
           
        </div>
    );
};
