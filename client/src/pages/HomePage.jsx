
// src/App.js
import React from "react";
import { FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import NavBar from "../components/ui/NavBar";
import audiq7 from ".././asets/images/audi q7.png"
import Btn from "../components/ui/Btn";
import CarCollections from "../components/CarCollections";

const HomePage = () => {
  return (
    // <div className="min-h-screen bg-gray-50">
     

    //   {/* Main Section */}
    //   {/* <main className="container mx-auto p-5 flex flex-col md:flex-row items-center justify-between">
    //     {/* Text Section */}
    //     <div className="text-center md:text-left max-w-lg space-y-4">
    //       <h1 className="text-4xl font-bold text-purple-500">
    //         Book a car today <br />
    //         save upto <span className="text-red-500">50%</span>
    //       </h1>
    //       <p className="text-gray-700">
    //         Discover the epitome of premium, unleash the thrill of driving
    //         around the world. Best maintenance, provide wide selection of
    //         vehicles.
    //       </p>
    //       <div className="space-x-4">
    //         <button className="btn bg-purple-500 text-white hover:bg-purple-600">
    //           Book a car
    //         </button>
    //         <button className="btn bg-gray-200 text-purple-500 hover:bg-gray-300">
    //           Learn more
    //         </button>
    //       </div>
    //     </div>

    //     {/* Car Image Section */}
    //     <div className="mt-10 md:mt-0">
    //       <div className="relative">
    //         <div className="bg-purple-200 rounded-full w-96 h-96 absolute -top-10 -right-10 transform"></div>
    //         <img
    //           src="https://your-car-image-url.com/car.png"
    //           alt="Car"
    //           className="relative w-full h-auto max-w-lg"
    //         />
    //       </div>
    //     </div>
    //   {/* </main> */}

    //   {/* Booking Section */}
    //   <section className="bg-white p-5 rounded-lg shadow-lg mt-10 mx-5 md:mx-auto md:max-w-4xl">
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //       <div>
    //         <label className="block mb-2 text-sm text-gray-700">Pickup Location</label>
    //         <div className="relative">
    //           <FaLocationArrow className="absolute left-2 top-2 text-gray-400" />
    //           <input
    //             type="text"
    //             placeholder="Enter location"
    //             className="input input-bordered w-full pl-10"
    //           />
    //         </div>
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm text-gray-700">Pickup Date</label>
    //         <div className="relative">
    //           <FaCalendarAlt className="absolute left-2 top-2 text-gray-400" />
    //           <input
    //             type="date"
    //             className="input input-bordered w-full pl-10"
    //           />
    //         </div>
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm text-gray-700">Return Date</label>
    //         <div className="relative">
    //           <FaCalendarAlt className="absolute left-2 top-2 text-gray-400" />
    //           <input
    //             type="date"
    //             className="input input-bordered w-full pl-10"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="text-right mt-4">
    //       <button className="btn bg-purple-500 text-white hover:bg-purple-600">
    //         Search
    //       </button>
    //     </div>
    //   </section> */}
  
  <div>
   
    <div className=" mx-auto py-10 pt-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center lg:px-6 ">
        <div className="text-center lg:text-left lg:w-1/2 space-y-6 lg:px-6 ">
          <h1 className="text-4xl font-bold text-purple-600 ">
            Book a car today, <br/> save up to <span className="text-red-500">50%</span>
          </h1>
          <p className=" text-lg ">
            Discover the epitome of premium cars.,<br />  Unleash the thrill of driving around the world.<br/> Best maintenance, wide selection of vehicles.
          </p>
          <div className="space-x-4">
            <button className="btn btn-primary">Book a car</button>
            <button className="btn btn-outline">Learn more</button>
          </div>
        </div>
        <div className="lg:w-3/4 mt-14">
          <div className="relative bg-purple-300 rounded-l-full">
            <div className=" w-2/5 h-4/5 top-1/4 left-11 right-28 "></div>
            <img src={audiq7} alt="Car" className="relative scale-x-[-1] py-20 lg:right-28 "/>
          </div>
        </div>
      </div>

      {/* Search Section */}
      {/* <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <label className="label"><span className="label-text">Pickup Location</span></label>
            <input type="text" placeholder="Enter pickup location" className="input input-bordered w-full"/>
          </div>
          <div className="flex-1">
            <label className="label"><span className="label-text">Pickup Date</span></label>
            <input type="date" className="input input-bordered w-full"/>
          </div>
          <div className="flex-1">
            <label className="label"><span className="label-text">Return Date</span></label>
            <input type="date" className="input input-bordered w-full"/>
          </div>
          <div className="flex-none">
            <button className="btn btn-primary mt-8 w-full">Search</button>
          </div>
        </div>
      </div> */}

  <section className="bg-white p-5 rounded-lg shadow-lg mt-10 mx-5 md:mx-auto md:max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-700">Pickup Location</label>
            <div className="relative">
              <FaLocationArrow className="absolute left-2 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter location"
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-700">Pickup Date</label>
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
            Search
          </Btn>
        </div>
      </section> 

      
    </div>
    <CarCollections/>

    <input type="date" />
    </div>

  );
};


export default HomePage;