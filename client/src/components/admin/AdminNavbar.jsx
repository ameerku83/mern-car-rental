
import React from 'react';
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'; // Importing icons from react-icons
import { FaUserCircle } from 'react-icons/fa';

import car from '../../asets/images/car.png'
import { DarkMode } from '../ui/DarkMode';
import Btn from '../ui/Btn';
import { Link } from 'react-router-dom';
const AdminNavbar = () => {
  return (
    <div className="navbar bg-base-100 px-4 shadow border-b-2 border-purple-/00">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="h-5 w-5" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            
          <Link  to={"/admin/services"}>Services</Link>
          <Link to={"/admin/addcar"} >add car</Link>
          <Link to={"/admin/editcar"} >edit car </Link>
          <Link to={"/admin/carlist"} >car list</Link>



          </ul>
        </div>

        <Link className="text-xl font-bold" to="/admin/home"> <img className='h-12 w-32 object-cover rounded-full ' src={car} alt="" /> </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 gap-2">
         
        <li><Btn>   <Link  to={"/admin/services"}>Services</Link></Btn></li>
          <li><Btn> <Link to={"/admin/addcar"} >add car</Link></Btn></li>
          <li><Btn> <Link to={"/admin/editcar"} >edit car</Link></Btn></li>
          <li><Btn> <Link to={"/admin/carlist"} >car list</Link></Btn></li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center">
      <label tabIndex={0} className="btn btn-ghost btn-circle m-0 ">
           <DarkMode   />
          </label>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
          <Link to={'/admin/users'} ><h5>users</h5></Link>  
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            <li><a href="/wishlist">Wishlist Item 1</a></li>
            <li><a href="/wishlist">Wishlist Item 2</a></li>
            <li><a href="/wishlist">Wishlist Item 3</a></li>
          </ul>
        </div>

        {/* Account Icon with Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <FaUserCircle className="h-6 w-6" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            <li><a href="/profile" className="justify-between">Profile</a></li>
            <li><a href="/settings"></a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;


