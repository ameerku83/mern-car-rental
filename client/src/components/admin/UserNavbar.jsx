import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import car from '../../asets/images/carlogo.png';
import { DarkMode } from '../ui/DarkMode';

// Replace react-icons with JSX SVG for better compatibility
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const UserNavbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const logout = async () => {
    try {
      await axiosInstance.put('user/logout');
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`user/bookings`);
        setBookings(response?.data?.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [bookings]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get(`user/wishlists`);
        setWishlist(response?.data?.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, [wishlist]);

  const menuItems = [
    { name: "Home", path: "/user/home" },
    { name: "About", path: "/user/about" },
    { name: "Our Services", path: "/user/services" },
    { name: "Rent a Car", path: "/user/rent" },
    { name: "Contact Us", path: "/user/contact" }
  ];

  return (
    <motion.div 
      className={`navbar fixed z-40 w-full px-4 py-3 transition-all duration-300 ${
        scrolled 
          ? "bg-gradient-to-r from-blue-900 to-indigo-800 shadow-lg" 
          : "bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-700"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="btn btn-ghost lg:hidden text-white"
            onClick={() => setShow(!show)}
          >
            {show ? <CloseIcon /> : <MenuIcon />}
          </motion.button>
          
          <AnimatePresence>
            {show && (
              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="menu menu-compact dropdown-content mt-3 p-4 shadow-xl bg-white rounded-lg w-52 space-y-2 border border-indigo-100"
              >
                {menuItems.map((item, index) => (
                  <motion.li key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className="relative text-md font-serif text-indigo-800 font-bold group py-2 px-3 hover:bg-indigo-50 rounded-md"
                      onClick={() => setShow(false)}
                    >
                      {item.name}
                      <motion.span 
                        className="absolute left-0 bottom-0 h-0.5 bg-amber-400"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Logo */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link to="/user/home" className="flex items-center">
            <motion.img 
              className="h-10 object-contain" 
              src={car} 
              alt="Logo" 
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span 
              className="text-xs text-white font-bold absolute top-8 left-2"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
            >
              FLY WHEELS
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">
          {menuItems.map((item, index) => (
            <motion.li key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link
                to={item.path}
                className="relative text-lg text-white font-serif group overflow-hidden px-2"
              >
                {item.name}
                <motion.span 
                  className="absolute left-0 bottom-0 h-0.5 bg-amber-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-3">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-sm btn-ghost btn-circle m-0 text-white"
        >
          <DarkMode />
        </motion.div>

        {/* Wishlist Icon */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/user/wishlist" className="btn btn-sm btn-ghost btn-circle">
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              animate={wishlist.length > 0 ? { 
                scale: [1, 1.2, 1],
                transition: { repeat: 1, repeatDelay: 5 }
              } : {}}
            >
              <HeartIcon className="text-white" />
            </motion.div>
            
            <AnimatePresence>
              {wishlist.length > 0 && (
                <motion.span 
                  className="absolute bottom-7 left-4 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {wishlist.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <motion.button 
            tabIndex={0} 
            className="btn btn-sm btn-ghost btn-circle"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <UserIcon className="h-6 w-6 text-white" />
          </motion.button>
          
          <AnimatePresence>
            {showUserDropdown && (
              <motion.ul
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-3 shadow-xl bg-white rounded-lg w-52 space-y-3 border border-indigo-100"
              >
                <motion.li
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Link
                    to="/user/profile"
                    className="text-md font-bold text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50 rounded-md px-4 py-2 transition-colors duration-200"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    Profile
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Link
                    to="/user/bookings"
                    className="text-md font-bold text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50 rounded-md px-4 py-2 transition-colors duration-200 flex items-center"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    My Bookings
                    {bookings.length > 0 && (
                      <motion.span 
                        className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        {bookings.length}
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.button
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white cursor-pointer py-2 px-4 rounded-md w-full font-bold"
                    onClick={logout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Log out
                  </motion.button>
                </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default UserNavbar;