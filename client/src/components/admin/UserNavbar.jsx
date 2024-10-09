import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Importing icons from react-icons
import { FaUserCircle } from 'react-icons/fa';
import car from '../../asets/images/carlogo.png';
import { DarkMode } from '../ui/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
const UserNavbar = () => {
  const navigate = useNavigate();
  
  const [show, setShow] = useState(false); // For mobile menu toggle

  const logout = async () => {
    try {
      await axiosInstance.put('user/logout');
      toast.success('Logged out successfully');
      
      navigate('/login');
    } catch (error) {
      console.log(error.response);
    }
  };

  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  

  const [userId, setUserId] = useState(''); // Initialize as an empty string instead of an object

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile');
        const fetchedUserId = response?.data?.data?._id;
  
        if (fetchedUserId) {
          setUserId(fetchedUserId);  // Set userId as a string
        } else {
          throw new Error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('User not found');
      }
    };
  
    fetchUser();
  }, []);
  

  useEffect(() => {
    const fetchBookings = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get(`user/bookings/${userId}`);
          setBookings(response?.data?.data);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      }
    };
    fetchBookings();
  }, [userId,bookings]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get(`user/wishlist/${userId}`);
          setWishlist(response?.data?.data);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };
    fetchWishlist();
  }, [userId,wishlist]);

  return (
    <div className="navbar bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 px-4 py-3 shadow-lg border-b-2 border-purple-700 fixed z-40 w-full transition-all duration-300 ease-in-out">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <AiOutlineClose className="h-6 w-6 text-white" />
            ) : (
              <AiOutlineMenu className="h-6 w-6 text-white" />
            )}
          </button>
          {show && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-4 shadow-lg bg-white rounded-md w-48 space-y-2"
            >
              <li>
                <Link
                  to="/user/home"
                  className="relative text-md font-serif text-purple-700 font-bold group"
                >
                  Home
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user/about"
                  className="relative text-md font-serif text-purple-700 font-bold group"
                >
                  About
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user/services"
                  className="relative text-md font-serif text-purple-700 font-bold group"
                >
                  Our Services
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user/rent"
                  className="relative text-md font-serif text-purple-700 font-bold group"
                >
                  Rent a Car
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user/contact"
                  className="relative text-md font-serif text-purple-700 font-bold group"
                >
                  Contact Us
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Logo */}
        <div className="relative">
          <Link to="/user/home" className="flex items-center">
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
              to="/user/home"
              className="relative text-lg text-white font-serif group overflow-hidden"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/about"
              className="relative text-lg text-white font-serif group overflow-hidden"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/services"
              className="relative text-lg text-white font-serif group overflow-hidden"
            >
              Our Services
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/rent"
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
      <div className="navbar-end flex items-center space-x-3">
        <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle m-0 text-white">
          <DarkMode />
        </label>

        {/* Wishlist Icon */}
        <div className="relative">
          <Link to="/user/wishlist" className="btn btn-sm btn-ghost btn-circle">
            <AiOutlineHeart className="h-8 w-8 text-white" />
            
              <span className="absolute bottom-8 left-4 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            
          </Link>
        </div>

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
            <FaUserCircle className="h-8 w-8 text-white" />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-white rounded-md w-48 space-y-2"
          >
            <li>
              <Link
                to="/user/profile"
                className="text-md font-bold text-purple-700 hover:text-purple-900 transition-colors duration-200"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
              
                to="/user/bookings"
                className="text-md font-bold text-purple-700 hover:text-purple-900 transition-colors duration-200 flex items-center"
              >
                My Bookings
                {bookings.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {bookings.length}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <button
                className="btn bg-red-500 text-white cursor-pointer btn-sm  w-full"
                onClick={logout}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
