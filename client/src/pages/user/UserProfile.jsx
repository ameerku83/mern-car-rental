import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import Btn from '../../components/ui/Btn';


export const UserProfile = () => {
  const userId = useSelector((state) => state.user.id); 
  const [user, setUser] = useState({});
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile');
        setUser(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPayment = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get(`user/payments/${userId}`);
          setPayments(response?.data?.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching payments:', error);
        }
      }
    };
    fetchPayment();
  }, [userId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-CA');
  };

  return (
    <div>
      <div className='md:flex md:justify-around text-center pt-24 align-center'>
        <div>
          <h2 className='text-xl'>Name: {user.name}</h2>
          <h4 className='text-xl'>Email: {user.email}</h4>
          <h4 className='text-xl'>Mobile: {user.mobile}</h4>
        </div>
        <Btn>
          <Link to={`/editprofile/${userId}`}>Edit Profile</Link>
        </Btn>
      </div>

    { payments.length >0 && <div className="overflow-x-auto px-4 mt-4">
        <h1 className="text-center text-2xl my-3">Payments</h1>
        <table className="table w-full border border-black-600">
          <thead>
            <tr className="text-lg font-bold">
              <th>Index</th>
              <th>Car</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.id}>
                <td>{index + 1}</td>
                <td>
                  <img className='w-28 object-contain' src={payment.car.image} alt="car" /> {payment.car.brand} {payment.car.model}
                </td>
                <td>{formatDate(payment.paymentDate)}</td>
                <td>{payment.amount}/-</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> }
    </div>
  );
};
