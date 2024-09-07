import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { toast } from 'react-toastify'

export const UsersMessages = () => {
    const [messages,setMassages]=useState([])
    useEffect(()=>{
      const  fetchMessages= async ()=>{
            try {
               const response= await axiosInstance.get("/admin/contact")
               setMassages(response?.data?.data);
                
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchMessages()
        
    },[])
    const deleteMessage = async (id)=>{
        try {
           await axiosInstance.delete(`/admin/delete-message/${id}`)
           setMassages(messages.filter((message)=>message._id !== id))
           toast.success('message deleted')
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div>
         <div className="overflow-x-auto">
      <table className="table w-full border border-black-600">
        <thead>
          <tr className="text-lg  font-bold">
          <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Messages</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.user.name}</td>
              <td>{message.email}</td>
              <td>{message.mobile}</td>
              <td>{message.message}</td>
              <td>
                 <button className="btn btn-error btn-sm" onClick={()=>deleteMessage(message._id)}  > Delete </button> 
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>

    </div>
  )
}
