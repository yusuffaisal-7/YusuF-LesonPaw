// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';


// const ManagePayments = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: payments = [], isLoading } = useQuery({
//     queryKey: ['payments'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/payments');
//       return res.data;
//     },
//   });

//   if (isLoading) return <div>Loading payments...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Manage Payments</h2>
//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>Student Email</th>
//               <th>Tutor Email</th>
//               <th>Amount</th>
//               <th>Commission</th>
//               <th>Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment) => (
//               <tr key={payment._id}>
//                 <td>{payment.studentEmail}</td>
//                 <td>{payment.tutorEmail}</td>
//                 <td>{payment.amount}</td>
//                 <td>{payment.commission}</td>
//                 <td>{payment.status}</td>
//                 <td>{new Date(payment.createdAt).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManagePayments;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManagePayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments'); // Ensure this endpoint exists in your backend
      return res.data;
    },
  });

  if (isLoading) return <div>Loading payments...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Payments</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Student Email</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.email}</td>
                <td>{payment.transactionId}</td>
                <td>${payment.price}</td>
                <td>{payment.status}</td>
                <td>{new Date(payment.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayments;
