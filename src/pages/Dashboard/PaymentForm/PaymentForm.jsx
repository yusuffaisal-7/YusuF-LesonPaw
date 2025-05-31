import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment for Job</h2>
      <form onSubmit={handlePayment} className="card bg-base-100 shadow-xl p-6">
        <div className="form-control">
          <label className="label">Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">Payment Method</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="select select-bordered">
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-4">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;