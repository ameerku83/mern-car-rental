import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { toast } from 'react-toastify'

export const UsersPayments = () => {
    const [payments, setPayments] = useState([])
    const [searchUserName, setSearchUserName] = useState('') // For searching by user name
    const [loading, setLoading] = useState(false) // For loading state

    useEffect(() => {
        fetchPayments()
    }, [])

    const fetchPayments = async (userName = '') => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`admin/payments`, {
                params: { userName } // Pass the userName as a query param
            })
            console.log(response?.data)
            setPayments(response?.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const handleSearch = () => {
        fetchPayments(searchUserName) // Fetch payments with the searched user name
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-CA')
    }

    const deletePayment = async (id) => {
        try {
            await axiosInstance.delete(`admin/delete-payment/${id}`)
            setPayments(payments.filter((payment) => payment._id !== id))
            toast.success('Payment deleted')
        } catch (error) {
            console.log(error)
            toast.error('Error deleting payment')
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Users Payments</h1>

            {/* Search by Username */}
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Search by Username"
                    className="input input-bordered mr-2"
                    value={searchUserName}
                    onChange={(e) => setSearchUserName(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading ? (
                <div className="text-center mt-6">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                    {payments.map((payment) => (
                        <div key={payment._id} className="border border-gray-200 rounded-lg shadow-md p-4 mx-4">
                            <img src={payment.car.image} alt="Car" className="w-full h-40 object-contain rounded-md" />
                            <div className="text-center mt-2">
                                <h3 className="text-2xl font-bold mt-4">
                                    {payment.car.brand} {payment.car.model}
                                </h3>
                                <div className="text-md font-semibold mt-2">
                                    <h5>User Name: {payment.user.name}</h5>
                                    <h5>Email: {payment.user.email}</h5>
                                    <h5>Mobile: {payment.user.mobile}</h5>
                                    <h5>Amount: {payment.amount}</h5>
                                    <h5>Payment Status: {payment.status}</h5>
                                    <h5>Date: {formatDate(payment.paymentDate)}</h5>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-4">
                                <button
                                    className="btn btn-error"
                                    onClick={() => deletePayment(payment._id)}
                                >
                                    Delete Payment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
