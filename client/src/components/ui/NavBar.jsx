import React from 'react';
import {  AiOutlineMenu } from 'react-icons/ai'; // Importing icons from react-icons

import Btn from './Btn';
import { DarkMode } from './DarkMode';
import car from '../../asets/images/carlogo.png'
import { Link } from 'react-router-dom';
const NavBar = () => {
    
  return (
    <div className="navbar bg-base-200 px-2 shadow border-b-2 border-purple-100 fixed z-40 ">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="h-5 w-5" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-md w-32 space-y-0.5">
          <li> <button className='btn btn-sm bg-purple-500 text-white hover:bg-purple-600' > <Link to={"/"}> Home</Link></button></li>
          <li><button className='btn btn-sm bg-purple-500 text-white hover:bg-purple-600' ><Link to={"/about"}> About</Link></button></li>
          <li><button className='btn btn-sm bg-purple-500 text-white hover:bg-purple-600' ><Link to={"/services"}> Our Services</Link></button></li>
            <li><button className='btn btn-sm bg-purple-500 text-white hover:bg-purple-600' ><Link to={"/rent"}>Rent a car</Link></button></li>
            <li><button className='btn btn-sm bg-purple-500 text-white hover:bg-purple-600' ><Link to={"/user/contact"}> Contact us</Link></button></li>
            
          </ul>
        </div>
        <div className=' relative'>
        <Link to={'/user/home'} >
  
        <img className=' h-8 object-contain' src={car} alt="" /> 
        </Link>
        <i className=' text-sm text-purple-700 font-bold sm:text-sm mt-0 pt-0 absolute top-6' > FLY WHEELS</i>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex  ">
        <ul className="menu menu-horizontal px-1 gap-2">
        <li><Btn><Link to={"/"}> Home</Link></Btn></li>
        <li><Btn><Link to={"/about"}> About</Link></Btn></li>
          <li><Btn><Link to={"/services"}> Our Services</Link></Btn></li>
            <li><Btn> <Link to={"/rent"}>Rent a car</Link></Btn></li>
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
