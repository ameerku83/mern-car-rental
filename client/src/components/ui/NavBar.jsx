import React from 'react';
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'; // Importing icons from react-icons
import { FaUserCircle } from 'react-icons/fa';
import Btn from './Btn';
import { DarkMode } from './DarkMode';
import car from '../../asets/images/car.png'
import { Link } from 'react-router-dom';
const NavBar = () => {
    
  return (
    <div className="navbar bg-base-100 px-4 shadow border-b-2 border-purple-100 fixed z-40 ">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="h-5 w-5" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="/services">Services</a></li>
            <li><a href="/user/rent">Rent a car</a></li>
            <li><a href="/user/contact">Contact us</a></li>
            
          </ul>
        </div>

        <a className="text-xl font-bold" href="/"> <img className='h-12 w-32 object-cover rounded-full ' src={car} alt="" /> </a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex  ">
        <ul className="menu menu-horizontal px-1 gap-2">
        <li><Btn><Link to={"/services"}> Services</Link></Btn></li>
            <li><Btn> <Link to={"/user/rent"}>Rent a car</Link></Btn></li>
            <li><Btn><Link to={"/user/contact"}> Contact us</Link></Btn></li>
            
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-2">
      <label tabIndex={0} className="btn btn-ghost btn-circle m-0 ">
           <DarkMode   />
          </label>
        {/* <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            <AiOutlineHeart className="h-6 w-6" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            <li><a href="/wishlist">Wishlist Item 1</a></li>
            <li><a href="/wishlist">Wishlist Item 2</a></li>
            <li><a href="/wishlist">Wishlist Item 3</a></li>
          </ul>
        </div> */}

        {/* Account Icon with Dropdown */}
        <div className="">
          
        <Link to={"/user/home"} > <Btn> Login</Btn> </Link>  
        </div>
      </div>
    </div>
  );
};

export default NavBar;
