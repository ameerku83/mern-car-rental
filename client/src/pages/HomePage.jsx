import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaLocationArrow, FaStar, FaUserCircle, } from "react-icons/fa";
import audiq7 from ".././asets/images/audi q7.png";
import Btn from "../components/ui/Btn";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "../components/ui/Carousel";
import { axiosInstance } from "../config/axiosInstance";
import { useForm } from "react-hook-form";


const UserHomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get("user/reviews");
        setReviews(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };
    fetchReviews();
  }, []);

 

  const onSubmit = (data) => {
    console.log(data);
    navigate('/rent');
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} className={i < rating ? "text-yellow-500" : "text-gray-400"} />
      );
    }
    return stars;
  };

  if (loading) { // Loading Indicator for the entire page
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
        <div className="w-16 h-16 border-4 border-purple-500 rounded-full animate-spin border-t-transparent mt-24"></div>
         <span>Loading</span>
         </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-10 pt-16">
      
      <div className="flex flex-col lg:flex-row items-center lg:px-6 ">
        <div className="text-center lg:text-left lg:w-1/2 space-y-6 lg:px-6 mt-3 ">
          <h1 className="text-4xl font-bold text-purple-600 ">
            Book a car today, <br /> save up to <span className="text-red-500">50%</span>
          </h1>
          <p className="text-lg ">
            Discover the epitome of premium cars,<br /> Unleash the thrill of driving around the world.<br /> Best maintenance, wide selection of vehicles.
          </p>
          <div className="space-x-4">
            <Btn><Link to={'/rent'}>Book a car</Link></Btn>
            <button className="btn btn-outline"><Link to={'/user/about'}>Learn more</Link></button>
          </div>
        </div>
        <div className="lg:w-3/4 mt-14">
          <div className="relative bg-purple-200 rounded-l-full">
            <div className="w-2/5 h-4/5 top-1/4 left-11 right-28 "></div>
            <img src={audiq7} alt="Car" className="relative scale-x-[-1] py-20 lg:right-28 " />
          </div>
        </div>
      </div>

      <Carousel />

      <section className="bg-base-200 p-5 rounded-lg shadow-lg mt-10 mx-5 md:mx-auto md:max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm ">Pickup Location</label>
              <div className="relative">
                <FaLocationArrow className="absolute left-2 top-2 text-gray-400" />
                <select
                  id="pickupLocation"
                  {...register("pickupLocation", { required: "Pickup Location required" })}
                  className="input input-bordered w-full pl-10"
                >
                   <option value="">Select Location</option>
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
              </div>
              <span className="text-red-600">{errors.pickupLocation?.message}</span>
            </div>
            <div>
              <label className="block mb-2 text-sm ">Pickup Date</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-2 top-2 text-gray-400" />
                <input
                  type="date"
                  {...register("pickupdate", { required: "Date required" })}
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <span className="text-red-600">{errors.pickupdate?.message}</span>
            </div>
            <div>
              <label className="block mb-2 text-sm ">Return Date</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-2 top-2 text-gray-400" />
                <input
                  type="date"
                  {...register("returndate", { required: "Date required" })}
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <span className="text-red-600">{errors.returndate?.message}</span>
            </div>
          </div>
          <div className="text-right mt-4">
            <Btn type="submit">Search</Btn>
          </div>
        </form>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 m-4">
      </section>
      <section className="my-16 px-5 md:px-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-purple-600">What Our Clients Say</h2>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-4 p-3 hide-scrollbar">
            {reviews.map((review, index) => (
              <div key={index} className="bg-base-100 shadow-lg rounded-lg p-2 flex-none border border-purple-100">
                <div className="w-36">
                  <div className="flex items-center mb-2">
                    <FaUserCircle className="h-6 mx-2 text-gray-600" />
                    <div className="font-semibold">{review.user?.name || 'Anonymous'}</div>
                  </div>
                  <div className="text-sm mb-2">
                    {review.car?.brand || 'Unknown'} {review.car?.model || ''}
                  </div>
                  {review.car?.image && <img src={review.car.image} className="w-24 object-contain mb-2" alt="car" />}
                  <div className="flex mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm overflow-hidden text-ellipsis whitespace-normal">"{review.comment || 'No comment available'}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
    

    </div>
  );
};

export default UserHomePage;
