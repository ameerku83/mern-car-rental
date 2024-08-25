
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';

export const UserProfile = () => {
 const [user,setUser]=useState()
    useEffect(() => {
      
        const fetchUser = async () => {
            try {
             const response= await axiosInstance.get('user/profile',);
              setUser(response?.data)
              //toast.success('account created suc');
              
              
            
            } catch (error) {
             // toast.error(error.response.data.message);
              console.log(error);
              
            }
          };
          fetchUser()
      
    }, [])
    
    console.log(user);

  return (
    <div>

    </div>
  )
}




