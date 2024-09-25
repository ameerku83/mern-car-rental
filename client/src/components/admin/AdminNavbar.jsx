
import React from 'react';
import {  AiOutlineMenu } from 'react-icons/ai'; // Importing icons from react-icons
import { FaUserCircle } from 'react-icons/fa';

import car from '../../asets/images/carlogo.png'
import { DarkMode } from '../ui/DarkMode';
import Btn from '../ui/Btn';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
const AdminNavbar = () => {
  const navigate= useNavigate()
  const adminLogout = async () => {
    try {
      await axiosInstance.put('admin/adminlogout');
      
      toast.success('Logged out successfully');
      navigate('/')
    //navigate('/user/home')
    } catch (error) {
     // toast.error(error.response.data.message);
      console.log(error.response);
      
    }
  };
  return (
    <div className="navbar bg-base-100 px-4 shadow border-b-2 border-purple-/00">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="h-5 w-5" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            
          <li> <Link  to={"/admin/services"}>Services</Link></li>
          <li>  <Link to={"/admin/addcar"} >add car</Link></li>
          <li>   <Link to={"/admin/carlist"} >car list</Link></li>
          <li> <Link to={"/admin/createuser"}> Create User </Link></li>



          </ul>
        </div>
        <div>
        <Link to={'/admin/home'} >
  
        <img className=' h-8 object-contain' src={car} alt="" /> 
        </Link>
        <i className='  text-sm text-purple-700 font-bold sm:text-sm' > FLY WHEELS</i>
        </div>

      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 gap-2">
         
        <li><Btn>   <Link  to={"/admin/services"}>Services</Link></Btn></li>
          <li><Btn> <Link to={"/admin/addcar"} >add car</Link></Btn></li>
          <li><Btn> <Link to={"/admin/carlist"} >car list</Link></Btn></li>
          <li><Btn> <Link to={"/admin/createuser"} >Create User</Link></Btn></li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center">
      <label tabIndex={0} className="btn btn-ghost btn-circle m-0 ">
           <DarkMode   />
          </label>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
          <h4>users</h4>    
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            <li> <Link to={'/admin/userlist'} > Users list</Link> </li>
            <li><Link to={"/admin/bookings"}>Users Bookings</Link></li>
            <li><Link  to={"/admin/reviews"} >Users Reviews</Link></li>
            <li><Link  to={"/admin/payments"} >Users Payments</Link></li>
            <li><Link  to={"/admin/contacts"} >Users messages</Link></li>
          </ul>
        </div>

        {/* Account Icon with Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <FaUserCircle className="h-6 w-6" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            <li>< Link href="/profile" className="justify-between">Profile</Link></li>
            
            <li><button className=' btn btn-error btn-sm' onClick={adminLogout} >Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;


