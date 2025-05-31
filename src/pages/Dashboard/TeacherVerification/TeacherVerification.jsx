import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TeacherVerification = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ['teacher-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher-requests');
      return res.data;
    },
  });

  const handleApprove = async (email) => {
    const res = await axiosSecure.patch(`/users/teacher/${email}`);
    if (res.data.modifiedCount > 0) {
      await axiosSecure.post('/notifications', {
        recipientEmail: email,
        message: 'Your teacher request has been approved!',
      });
      Swal.fire({
        icon: 'success',
        title: 'Teacher Approved',
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  const handleReject = async (email) => {
    const res = await axiosSecure.patch(`/users/reject-teacher/${email}`);
    if (res.data.modifiedCount > 0) {
      await axiosSecure.post('/notifications', {
        recipientEmail: email,
        message: 'Your teacher request has been rejected.',
      });
      Swal.fire({
        icon: 'success',
        title: 'Teacher Rejected',
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Teacher Verification Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>
                  <button onClick={() => handleApprove(request.email)} className="btn btn-success btn-sm mr-2">Approve</button>
                  <button onClick={() => handleReject(request.email)} className="btn btn-error btn-sm">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherVerification;