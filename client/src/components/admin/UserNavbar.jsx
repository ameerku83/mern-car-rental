import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'; // Importing icons from react-icons
import { FaUserCircle } from 'react-icons/fa';


import car from '../../asets/images/carlogo.png'
import Btn from '../ui/Btn';
import { DarkMode } from '../ui/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
const UserNavbar = () => {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      await axiosInstance.put('user/logout',);
      toast.success('Logged out successfully');
      navigate('/login')
    //navigate('/user/home')
    } catch (error) {
     // toast.error(error.response.data.message);
      console.log(error.response);
      
    }
  };

  const [user,setUser]=useState({})
  const [bookings, setBookings] = useState([]);
 const [wishlist,setWishlist] =useState([])
  useEffect(() => {
    
      const fetchUser = async () => {
          try {
           const response= await axiosInstance.get('user/profile',);
            setUser(response?.data?.data)
            //toast.success('account created suc');
            
            
          
          } catch (error) {
           // toast.error(error.response.data.message);
            console.log(error);
            
          }
        };
        fetchUser()
    
  }, [])
 
  useEffect(() => {
      const fetchBookings = async () => {
          if (user._id) { 
              try {
                  const response = await axiosInstance.get(`user/bookings/${user._id}`);
                  setBookings(response?.data?.data);
                  console.log(response.data);
                  
              } catch (error) {
                  console.error('Error fetching bookings:', error);
                  
              } 
          }
      };

      fetchBookings();
  }, [user._id]); 
  const userId=user._id
  useEffect(() => {
      const fetchWishlist = async () => {
          if (userId) { 
              try {
                  const response = await axiosInstance.get(`user/wishlist/${userId}`);
                  setWishlist(response?.data?.data);
                  console.log(response.data);
                  
              } catch (error) {
                  console.error('Error fetching wishlist:', error);
                  
              } 
          }
      };

      fetchWishlist();
  }, [userId]); 


  return (
    <div className="navbar bg-base-100 px-4 shadow border-b-2 border-purple-100 fixed z-40  ">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu Icon */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="h-5 w-5" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            
         
          <li><Link  to={"/user/home"}> Home</Link  ></li>
          <li><Link  to={"/user/about"}> About</Link  ></li>
          <li><Link  to={"/user/services"}> Our Services</Link  ></li>
          <li><Link to={"/user/rent"} >Rent a car</Link></li>
          <li><Link to={"/user/contact"} >Contact us</Link></li>
          </ul>
        </div>
        <div className=' relative'>
        <Link to={'/user/home'} >
  
        <img className=' h-8 object-contain' src={car} alt="" /> 
        </Link>
        <i className=' text-sm text-purple-700 font-bold sm:text-sm mt-0 pt-0 absolute top-6' > FLY WHEELS</i>
        </div>

      </div>

     
      <div className="navbar-center hidden lg:flex  ">
        <ul className="menu menu-horizontal px-1 gap-2">
        <li> <Btn><Link  to={"/user/home"}> Home</Link  > </Btn> </li>
        <li><Btn><Link  to={"/user/about"}>About</Link  ></Btn></li>
          <li><Btn><Link  to={"/user/services"}>Our Services</Link  ></Btn></li>
          <li><Btn ><Link to={"/user/rent"} >Rent a car</Link></Btn></li>
          <li><Btn ><Link to={"/user/contact"} >Contact us</Link></Btn></li>
        </ul>
      </div>

      
      <div className="navbar-end flex items-center ">
      <label tabIndex={0} className="btn btn-ghost btn-circle m-0 ">
           <DarkMode   />
          </label>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle relative">
           <AiOutlineHeart className="h-6 w-6" /> <sup className='text-purple-600 font-bold text-lg absolute left-7' > {wishlist.length} </sup>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            <li><Link to={"/user/wishlist"}>Wishlist </Link></li>
            
          </ul>
        </div> 

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            < FaUserCircle className="h-6 w-6" />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
            <li className='text-md font-bold' ><Link to={ "/user/profile" }> Profile</Link>  </li>
            <li className=' font-bold' ><Link to={ "/user/bookings"}>My Bookings <sup className=' text-purple-700 text-xl font-bold' > {bookings.length} </sup> </Link></li>
            <li> <button className='btn bg-red-500 cursor-pointer btn-sm' onClick={logout} > Log out </button> </li>
          </ul>
        </div> 
        
      </div>
    </div>
  );
};

export default UserNavbar;
