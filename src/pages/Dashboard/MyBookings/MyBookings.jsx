import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaBook, FaMoneyBillWave, FaCreditCard, FaTrash, FaUser, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="text-center">
          <FaUser className="text-[#DA3A60] text-5xl mx-auto mb-4" />
          <p className="text-[#005482] text-xl font-semibold mb-4">Please log in to view your bookings</p>
          <Link 
            to="/login" 
            className="inline-block bg-[#DA3A60] text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FFFFFF] p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#FCBB45]/10 rounded-lg">
              <FaBook className="text-[#FCBB45] text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-[#005482]">My Bookings</h2>
          </div>
          <p className="text-[#70C5D7] ml-12">Manage your tutoring session bookings</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#70C5D7]/10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#70C5D7]/10 rounded-lg">
                <FaBook className="text-[#70C5D7] text-xl" />
              </div>
              <div>
                <p className="text-sm text-[#005482]/60">Total Bookings</p>
                <p className="text-2xl font-bold text-[#005482]">{cart.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#70C5D7]/10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#DA3A60]/10 rounded-lg">
                <FaMoneyBillWave className="text-[#DA3A60] text-xl" />
              </div>
              <div>
                <p className="text-sm text-[#005482]/60">Total Amount</p>
                <p className="text-2xl font-bold text-[#005482]">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#70C5D7]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#FCBB45]/10 rounded-lg">
                  <FaCreditCard className="text-[#FCBB45] text-xl" />
                </div>
                <p className="text-sm text-[#005482]/60">Payment</p>
              </div>
              {cart.length ? (
                <Link 
                  to="/dashboard/payment"
                  className="bg-[#DA3A60] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
                >
                  Pay Now
                </Link>
              ) : (
                <button 
                  disabled 
                  className="bg-[#DA3A60]/50 text-white px-6 py-2 rounded-lg cursor-not-allowed text-sm font-medium"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bookings List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {cart.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-[#70C5D7]/10">
              <FaBook className="text-[#DA3A60] text-5xl mx-auto mb-4" />
              <p className="text-[#005482] text-xl font-semibold mb-4">You have no bookings</p>
              <Link 
                to="/" 
                className="inline-block bg-[#70C5D7] text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors"
              >
                Browse Tutors
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-[#70C5D7]/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#70C5D7]/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#005482]">#</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#005482]">Tutor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#005482]">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#005482]">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#005482]">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#005482]">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#005482]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#70C5D7]/10">
                    {cart.map((item, index) => (
                      <tr key={item._id} className="hover:bg-[#70C5D7]/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-[#005482]">{index + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center">
                              <FaUser className="text-[#70C5D7]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#005482]">
                                {item.tutorName || 'Unknown Tutor'}
                              </p>
                              <p className="text-xs text-[#005482]/60">ID: {item.tutorId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FaGraduationCap className="text-[#FCBB45]" />
                            <span className="text-sm text-[#005482]">
                              {item.subject || 'Not specified'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-[#70C5D7]" />
                            <span className="text-sm text-[#005482]">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-[#DA3A60]">
                            ${(item.price || 0).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                            ${item.status === 'Accepted' 
                              ? 'bg-green-100 text-green-800' 
                              : item.status === 'Rejected'
                              ? 'bg-red-100 text-red-800'
                              : item.status === 'Canceled'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {item.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewTutor(item.tutorId)}
                              className="px-3 py-1 bg-[#70C5D7]/10 text-[#70C5D7] rounded-lg hover:bg-[#70C5D7]/20 transition-colors text-sm font-medium"
                            >
                              View
                            </button>
                            {item.status === 'Pending' && (
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="p-1 text-[#DA3A60] hover:bg-[#DA3A60]/10 rounded-lg transition-colors"
                              >
                                <FaTrash className="text-sm" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyBookings;

