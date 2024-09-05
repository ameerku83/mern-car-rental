
// src/App.js
import React from "react";
import { FaCalendarAlt, FaCar, FaHeadset, FaLocationArrow, FaMapMarkedAlt, FaUserShield } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import NavBar from "../components/ui/NavBar";
import audiq7 from ".././asets/images/audi q7.png"
import Btn from "../components/ui/Btn";
import CarCollections from "../components/CarCollections";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    
  <div>
   
    <div className=" mx-auto py-10 pt-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center lg:px-6 ">
        <div className="text-center lg:text-left lg:w-1/2 space-y-6 lg:px-6 mt-3 ">
          <h1 className="text-4xl font-bold text-purple-600 ">
            Book a car today, <br/> save up to <span className="text-red-500">50%</span>
          </h1>
          <p className=" text-lg ">
            Discover the epitome of premium cars.,<br />  Unleash the thrill of driving around the world.<br/> Best maintenance, wide selection of vehicles.
          </p>
          <div className="space-x-4">
            <Btn className="btn btn-primary">Book a car</Btn>
            <button className="btn btn-outline">Learn more</button>
          </div>
        </div>
        <div className="lg:w-3/4 mt-14">
          <div className="relative bg-purple-200 rounded-l-full">
            <div className=" w-2/5 h-4/5 top-1/4 left-11 right-28 "></div>
            <img src={audiq7} alt="Car" className="relative scale-x-[-1] py-20 lg:right-28 "/>
          </div>
        </div>
      </div>

      <section className="my-16">
          <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
              <img src="https://thumbs.dreamstime.com/b/traveling-car-happy-couple-love-go-cabriolet-car-sunset-time-traveling-car-happy-couple-love-go-cabriolet-car-123687723.jpg?w=768" className="w-full" alt="Happy Traveler 1" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
            <img src="https://thumbs.dreamstime.com/b/summer-time-car-trip-traveling-men-driving-down-road-scenic-sunset-53598816.jpg?w=768" className="w-full" alt="Happy Traveler 2" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img src="https://thumbs.dreamstime.com/b/happy-hispanic-man-his-new-car-17145871.jpg?w=768" className="w-full" alt="Happy Traveler 3" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide4" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img src="https://thumbs.dreamstime.com/b/happy-family-riding-modern-car-traveling-automobile-together-enjoying-road-trip-portrait-laughing-smiling-four-325105013.jpg?w=768" className="w-full" alt="Happy Traveler 4" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
        </section>

     

  <section className="bg-base-200 p-5 rounded-lg shadow-lg mt-10 mx-5 md:mx-auto md:max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-700">Pickup Location</label>
            <div className="relative">
              <FaLocationArrow className="absolute left-2 top-2 text-gray-400" />
              {/* <input
                type="text"
                placeholder="Enter location"
                className="input input-bordered w-full pl-10"
              /> */}
               <select
                  id="pickupLocation"
                  
                  className="input input-bordered w-full pl-10"
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
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm ">Pickup Date</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-2 top-2 text-gray-400" />
              <input
                type="date"
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-700">Return Date</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-2 top-2 text-gray-400" />
              <input
                type="date"
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>
        </div>
        <div className="text-right mt-4">
          <Btn >
            <Link to={'/rent'}>
            Search
            </Link>
            
          </Btn>
        </div>
      </section> 
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 m-4">
                    
                    <div className=" bg-base-200 p-6 rounded-lg shadow-md flex items-center border-purple-600 border-s-2 ">
                        <div className="text-purple-600 bg-gray-100 rounded-full p-6 mr-6">
                            <FaHeadset size={48} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 ">24/7 Customer Support</h3>
                            <p className="">
                                Our dedicated support team is available around the clock to assist you with any issues or inquiries. We ensure your rental experience is smooth and hassle-free.
                            </p>
                        </div>
                    </div>

                    
                    <div className="bg-base-200 p-6 rounded-lg shadow-md flex items-center border-purple-600 border-s-2 ">
                        <div className="text-purple-600 bg-gray-100 rounded-full p-6 mr-6">
                            <FaCar size={48} />

                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 ">Wide Range of Vehicles</h3>
                            <p className="">
                                From compact cars to luxury vehicles, we offer a diverse selection of cars to suit every occasion. All our vehicles are regularly serviced and kept in pristine condition.
                            </p>
                        </div>
                    </div>

                  
                    <div className="bg-base-200 p-6 rounded-lg shadow-md flex items-center border-purple-600 border-s-2 ">
                        <div className="text-purple-600 bg-gray-100 rounded-full p-6 mr-6">
                            <FaUserShield size={48} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Safety & Security</h3>
                            <p className="">
                                Your safety is our top priority. Our vehicles are equipped with the latest safety features, and we provide comprehensive insurance options to give you peace of mind on the road.
                            </p>
                        </div>
                    </div>

                    {/* Service 4 */}
                    <div className="bg-base-200 p-6 rounded-lg shadow-md flex items-center border-purple-600 border-s-2 ">
                        <div className="text-purple-600 bg-gray-100 rounded-full p-6 mr-6">
                            <FaMapMarkedAlt size={48} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Convenient Locations</h3>
                            <p className="">
                                We have rental locations in major cities and airports, making it easy for you to pick up and drop off your vehicle wherever you are. Our locations are conveniently situated to serve you better.
                            </p>
                        </div>
                    </div>
                </section>

      
    </div>
   

   
    </div>

  );
};


export default HomePage;