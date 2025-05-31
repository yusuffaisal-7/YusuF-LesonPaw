import { Link, useNavigate } from 'react-router-dom';

import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const MyBookings = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Calculate total price with fallback for missing price
  const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);

  // Handle Cancel Booking
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Canceled!',
              text: 'Your booking has been canceled.',
              icon: 'success',
            });
          }
        }).catch((error) => {
          console.error('Error canceling booking:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to cancel booking.',
            icon: 'error',
          });
        });
      }
    });
  };

  // Handle View Tutor
  const handleViewTutor = (tutorId) => {
    navigate(`/tutor/${tutorId}`);
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        Please <Link to="/login" className="text-blue-500 underline">log in</Link> to view your bookings.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-evenly items-center">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <h2 className="text-3xl">Total Bookings: {cart.length}</h2>
        <h2 className="text-3xl">Total Price: ${totalPrice.toFixed(2)}</h2>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary btn-sm">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary btn-sm">Pay</button>
        )}
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-10">
          You have no bookings. <Link to="/" className="text-blue-500 underline">Browse Tutors</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Tutor Name</th>
                <th>Subject</th>
                <th>Booking Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.tutorName || 'Unknown Tutor'}</td>
                  <td>{item.subject || 'Not specified'}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>${(item.price || 0).toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === 'Accepted'
                          ? 'badge-success'
                          : item.status === 'Rejected'
                          ? 'badge-error'
                          : item.status === 'Canceled'
                          ? 'badge-secondary'
                          : 'badge-warning'
                      }`}
                    >
                      {item.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewTutor(item.tutorId)}
                        className="btn btn-outline btn-sm btn-primary"
                      >
                        View Tutor
                      </button>
                      {item.status === 'pending' && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-outline btn-sm btn-error"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

