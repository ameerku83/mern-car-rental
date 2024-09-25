import React from 'react';
import { AiFillInstagram, AiFillLinkedin, AiFillGithub, AiOutlinePhone } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 text-white py-8 px-4 shadow mt-12 border-t-2 border-purple-700">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">FLY WHEELS</h2>
          <p className="text-sm">
            Your reliable car rental service. We provide luxury, sedan, hatchback, and SUV cars for rent at affordable prices.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram className="h-6 w-6 hover:text-yellow-400 transition-colors duration-300" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin className="h-6 w-6 hover:text-yellow-400 transition-colors duration-300" />
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
              <AiFillGithub className="h-6 w-6 hover:text-yellow-400 transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Contact Us</h2>
          <div className="flex items-center space-x-2">
            <MdLocationOn className="h-6 w-6 text-yellow-400" />
            <span>Bitherkad, Gudalur, 643240, Tamil Nadu, India</span>
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlinePhone className="h-6 w-6 text-yellow-400" />
            <span>8903382318</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/home" className="relative text-white text-lg group">
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            
            <li>
              <Link to="/admin/services" className="relative text-white text-lg group">
                Our Services
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            
          </ul>
        </div>
      </div>

      <div className="text-center py-4 mt-8 border-t border-purple-700">
        <p className="text-sm">© 2024 FLY WHEELS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AdminFooter;
