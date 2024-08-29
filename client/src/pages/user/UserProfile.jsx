
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import Btn from '../../components/ui/Btn';

export const UserProfile = () => {
 const [user,setUser]=useState({})

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
    
    

  return (
   
      <div className='flex md:justify-around text-center pt-24 align-center ' >
        <div>
        <h2 className=' text-xl '>Name:{user.name} </h2> 
        <h4 className=' text-xl ' >Email:{user.email} </h4> 
       <h4 className=' text-xl ' >Mobile:{user.mobile} </h4> 
       </div>
       <Btn> <Link to={`/editprofile/${user._id}`} >Edit Profile</Link> </Btn>

      </div>
  
   
  )
}




