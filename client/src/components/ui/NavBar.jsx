import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'; // Importing icons from react-icons
import { DarkMode } from './DarkMode';
import car from '../../asets/images/carlogo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [show,setShow] = useState(false)
  return (
    <div className="navbar bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 px-4 py-3 shadow-lg border-b-2 border-purple-700 fixed z-40 w-full transition-all duration-300 ease-in-out">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={()=>setShow(!show)} >
          { show? <AiOutlineClose className="h-6 w-6 text-white" /> : <AiOutlineMenu className="h-6 w-6 text-white" />   }
          </label>
          { show&&
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-4 shadow-lg bg-white rounded-md w-48 space-y-2 transform transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100"
          >
            <li>
              <Link
                to="/"
                className="relative text-md font-serif text-purple-700 font-bold group"
              >
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="relative text-md font-serif text-purple-700 font-bold group"
              >
                About
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>   
              <Link
                to="/services"
                className="relative text-md font-serif text-purple-700 font-bold group"
              >
                Our Services
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/rent"
                className="relative text-md font-serif text-purple-700 font-bold group"
              >
                Rent a Car
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/user/contact"
                className="relative text-md font-serif text-purple-700 font-bold group"
              >
                Contact Us
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
            }
        </div>

        {/* Logo */}
        <div className="relative">
          <Link to="/" className="flex items-center">
            <img className="h-10 object-contain" src={car} alt="Logo" />
            <span className="text-xs text-white font-bold absolute top-8 left-2">
              FLY WHEELS
            </span>
          </Link>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-8">
          <li>
            <Link
              to="/"
              className="relative text-lg text-white font-serif group overflow-hidden"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="relative text-lg text-white font-serif group overflow-hidden"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="relative text-lg text-white font-serif group overflow-hidden"
            >
              Our Services
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/rent"
              className="relative text-lg text-white font-serif group overflow-hidden"
            >
              Rent a Car
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/contact"
              className="relative text-lg text-white font-serif group overflow-hidden"
            >
              Contact Us
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        <label tabIndex={0} className="btn btn-ghost btn-circle m-0 text-white">
          <DarkMode />
        </label>

        {/* Account Icon with Dropdown */}
        <div className="relative group">
          <Link to="/user/home" className="relative text-lg text-white font-semibold group">
            Login
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
