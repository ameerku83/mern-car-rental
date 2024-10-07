import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import Btn from '../../components/ui/Btn';
export const UserProfile = () => {

  const [user, setUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile');
        const fetchedUserId = response?.data?.data?._id;

       
          setUserId(fetchedUserId);  // Set userId if found
       
      } catch (error) {
        console.error('Error fetching user profile:', error);
        
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile');
        setUser(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
    <div className=" pt-12 min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
        <div>
        <div className="w-16 h-16 border-4 border-purple-500 rounded-full animate-spin border-t-transparent mt-24"></div>
          <span>Loading</span>
        </div> 
        </div>
      ) : (
        <>
          <div className='md:flex items-center justify-center pt-12 gap-3 mx-3 '>
            <div>
              <h2 className='text-xl'>Name: {user.name}</h2>
              <h4 className='text-xl'>Email: {user.email}</h4>
              <h4 className='text-xl'>Mobile: {user.mobile}</h4>
            </div>
            <div>
            <Btn>
              <Link to={`/editprofile/${userId}`}>Edit Profile</Link>
            </Btn>
             </div>
          </div>

          {payments.length > 0 &&  (
            <div className="overflow-x-auto px-4 mt-4">
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
    (payment.status === "paid" || payment.status === "cancelled" || payment.status !== "pending") && (
      <tr key={payment.id}>
        <td>{index + 1}</td>
        <td>
          {payment.car ? (
            <>
              <img className='w-28 object-contain' src={payment.car?.image} alt="car" /> 
              {payment.car?.brand} {payment.car?.model}
            </>
          ) : (
            'Car details not available'
          )}
        </td>
        <td>{formatDate(payment.paymentDate)}</td>
        <td>{payment.amount}/-</td>
        <td>{payment.status}</td>
      </tr>
    )
  ))}
</tbody>

  
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
