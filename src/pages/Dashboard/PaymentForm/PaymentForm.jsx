import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

const PaymentForm = () => {
  const { jobId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = async (e) => {
    e.preventDefault();
    const paymentData = { jobId, studentEmail: user.email, amount, paymentMethod };
    const res = await axiosSecure.post('/payments', paymentData);
    if (res.data.insertedId) {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-2 sm:p-4 md:p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#DA3A60]/10 rounded-xl">
              <FaCreditCard className="text-[#DA3A60] text-xl md:text-2xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#005482]">Make Payment</h2>
          </div>
          <p className="text-[#70C5D7] text-sm md:text-lg">Complete your payment securely</p>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="bg-white rounded-2xl shadow-sm border border-[#70C5D7]/10 p-4 md:p-6">
          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm md:text-base font-medium text-[#005482] mb-2">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMoneyBillWave className="text-[#70C5D7] text-lg" />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl border border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-white text-[#005482] text-sm md:text-base"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>

          {/* Payment Method Select */}
          <div className="mb-6">
            <label className="block text-sm md:text-base font-medium text-[#005482] mb-2">
              Payment Method
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCreditCard className="text-[#70C5D7] text-lg" />
              </div>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl border border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-white text-[#005482] text-sm md:text-base appearance-none"
              >
                <option value="card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#005482] to-[#70C5D7] text-white py-2.5 md:py-3 px-4 rounded-xl font-medium text-sm md:text-base hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#DA3A60] focus:ring-offset-2"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;