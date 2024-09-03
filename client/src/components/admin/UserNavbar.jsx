import React from 'react';
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'; // Importing icons from react-icons
import { FaUserCircle } from 'react-icons/fa';


import car from '../../asets/images/carlogo.png'
import Btn from '../ui/Btn';
import { DarkMode } from '../ui/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
const UserNavbar = () => {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      await axiosInstance.put('user/logout',);
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
            
         
          <li><Link  to={"/user/home"}> Home</Link  ></li>
          <li><Link  to={"/user/about"}> About</Link  ></li>
          <li><Link  to={"/user/services"}> Our Services</Link  ></li>
          <li><Link to={"/user/rent"} >Rent a car</Link></li>
          <li><Link to={"/user/contact"} >Contact us</Link></li>
          </ul>
        </div>
        <div>
        <Link to={'/user/home'} >
  
        <img className=' h-8 object-contain' src={car} alt="" /> 
        </Link>
        <i className=' text-sm text-purple-700 font-bold sm:text-sm' > FLY WHEELS</i>
        </div>

      </div>

     
      <div className="navbar-center hidden lg:flex  ">
        <ul className="menu menu-horizontal px-1 gap-2">
        <li> <Btn><Link  to={"/user/home"}> Home</Link  > </Btn> </li>
        <li><Btn><Link  to={"/user/about"}>About</Link  ></Btn></li>
          <li><Btn><Link  to={"/user/services"}>Our Services</Link  ></Btn></li>
          <li><Btn ><Link to={"/user/rent"} >Rent a car</Link></Btn></li>
          <li><Btn ><Link to={"/user/contact"} >Contact us</Link></Btn></li>
        </ul>
      </div>

      
      <div className="navbar-end flex items-center ">
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
            <li className='text-md font-bold' ><Link to={ "/user/profile" }> Profile</Link>  </li>
            <li className='text-md font-bold' ><Link to={ "/user/bookings"}>My Bookings </Link></li>
            <li> <button className='btn bg-red-500 cursor-pointer btn-sm' onClick={logout} > Log out </button> </li>
          </ul>
        </div> 
        
      </div>
    </div>
  );
};

export default UserNavbar;
