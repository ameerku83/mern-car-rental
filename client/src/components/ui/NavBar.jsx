import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkMode } from './DarkMode';
import car from '../../asets/images/carlogo.png';
import { Link } from 'react-router-dom';

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

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  React.useEffect(() => {
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

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Rent a Car", path: "/rent" },
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
      transition={{ type: "keyframes", stiffness: 130,  }}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="btn btn-ghost md:hidden text-white"
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
          <Link to="/" className="flex items-center">
            <motion.img 
              className="h-10 object-contain" 
              src={car} 
              alt="Logo" 
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 15}}
              transition={{ duration: 0.5}}
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
      <div className="navbar-end flex items-center space-x-4">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-ghost btn-circle m-0 text-white"
        >
          <DarkMode />
        </motion.div>
   
        {/* Login Button */}
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/user/home" className="relative">
            <motion.button 
              className="btn btn-sm bg-amber-400 hover:bg-amber-500 text-indigo-900 border-none font-semibold px-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Login
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NavBar;