import React from 'react';
import { AiFillInstagram, AiFillLinkedin, AiFillGithub, AiOutlinePhone } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-8 px-4 shadow mt-12 border-t-2 border-purple-100">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Company Name</h2>
          <p>
            Your reliable car rental service. We provide luxury, sedan, hatchback, and SUV cars for rent at affordable prices.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram className="h-6 w-6 hover:text-purple-500 transition-colors duration-300" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin className="h-6 w-6 hover:text-purple-500 transition-colors duration-300" />
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
              <AiFillGithub className="h-6 w-6 hover:text-purple-500 transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Contact Us</h2>
          <div className="flex items-center space-x-2">
            <MdLocationOn className="h-6 w-6 text-purple-500" />
            <span>123 Car Rental Ave, City, Country</span>
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlinePhone className="h-6 w-6 text-purple-500" />
            <span>+123 456 7890</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-purple-500 transition-colors duration-300">Home</a></li>
            <li><a href="/about" className="hover:text-purple-500 transition-colors duration-300">About Us</a></li>
            <li><a href="/services" className="hover:text-purple-500 transition-colors duration-300">Our Services</a></li>
            <li><a href="/contact" className="hover:text-purple-500 transition-colors duration-300">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center py-4 mt-8 border-t border-purple-100">
        <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;




