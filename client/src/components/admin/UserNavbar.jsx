import React from 'react';
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'; // Importing icons from react-icons
import { FaUserCircle } from 'react-icons/fa';


import car from '../../asets/images/car.png'
import Btn from '../ui/Btn';
import { DarkMode } from '../ui/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
const UserNavbar = () => {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      await axiosInstance.get('user/logout',);
      toast.success('Logged out successfully');
      navigate('/login')
    //navigate('/user/home')
    } catch (error) {
     // toast.error(error.response.data.message);
      console.log(error.response);
      
    }
  };

  return (
    <div className="navbar bg-base-100 px-4 shadow border-b-2 border-purple-100 fixed z-40  ">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="h-5 w-5" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            
         

          
          <li><Link  to={"/user/services"}>Services</Link  ></li>
          <li><Link to={"/user/rent"} >Rent a car</Link></li>
          <li><Link to={"/user/contact"} >Contact us</Link></li>
          </ul>
        </div>

        <Link className="text-xl font-bold" to={"/user/home"}> <img className='h-12 w-32 object-cover rounded-full ' src={car} alt="" /> </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex  ">
        <ul className="menu menu-horizontal px-1 gap-2">
        
          <li><Btn><Link  to={"/user/services"}>Services</Link  ></Btn></li>
          <li><Btn ><Link to={"/user/rent"} >Rent a car</Link></Btn></li>
          <li><Btn ><Link to={"/user/contact"} >Contact us</Link></Btn></li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-2">
      <label tabIndex={0} className="btn btn-ghost btn-circle m-0 ">
           <DarkMode   />
          </label>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            <AiOutlineHeart className="h-6 w-6" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            <li><a href="/wishlist">Wishlist Item 1</a></li>
            <li><a href="/wishlist">Wishlist Item 2</a></li>
            <li><a href="/wishlist">Wishlist Item 3</a></li>
          </ul>
        </div> 

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            < FaUserCircle className="h-6 w-6" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            <li className='text-xl' ><Link to={ "/user/profile" }> Profile</Link>  </li>
            <li><a href="/wishlist">Wishlist Item 2</a></li>
            <li> <button className='btn bg-red-500 cursor-pointer' onClick={logout} > Log out </button> </li>
          </ul>
        </div> 
        
      </div>
    </div>
  );
};

export default UserNavbar;
