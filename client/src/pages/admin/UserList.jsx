import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';

const UserList = () => {
    const [users,setUsers]=useState([])

    useEffect(() => {
      
        const fetchUser = async () => {
            try {
             const response= await axiosInstance.get('admin/user-list',);
              setUsers(response?.data?.data)
              console.log(response.data.data);
              
              //toast.success('account created suc');
            
              
            } catch (error) {
             // toast.error(error.response.data.message);
              console.log(error);
              
            }
          };
          fetchUser()
      
    }, [])
const deleteUser =async(id)=>{
    try {
        await axiosInstance.delete(`admin/delete-user/${id}`)

        toast.success("successfully Deleted ")
        setUsers(users.filter((user)=> user._id != id ))
    } catch (error) {
        console.log(error);
        
    }
   
}


  return (
    <div className="overflow-x-auto">
      <table className="table w-full border border-black-600">
        <thead>
          <tr className="text-lg  font-bold">
          <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <button className="btn btn-error btn-sm" onClick={()=>deleteUser(user._id)}  > Delete </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
