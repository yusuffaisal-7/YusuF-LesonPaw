import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { 
  FaSearch, 
  FaMoneyBillWave, 
  FaSortAmountDown, 
  FaChartLine, 
  FaUserGraduate,
  FaCalendarAlt,
  FaDollarSign
} from 'react-icons/fa';

const ManagePayments = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments'); 
      return res.data;
    },
  });

  // Calculate statistics
  const stats = {
    totalAmount: payments.reduce((sum, payment) => sum + payment.price, 0),
    avgAmount: payments.length ? (payments.reduce((sum, payment) => sum + payment.price, 0) / payments.length) : 0,
    totalTransactions: payments.length,
    uniqueStudents: new Set(payments.map(p => p.email)).size
  };

  // Filter and sort payments
  const filteredPayments = payments
    .filter(payment => {
      const searchLower = searchTerm.toLowerCase();
      return (
        payment.email?.toLowerCase().includes(searchLower) ||
        payment.transactionId?.toLowerCase().includes(searchLower) ||
        payment.tutorEmails?.some(email => email.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'amount') {
        return sortOrder === 'desc' 
          ? b.price - a.price
          : a.price - b.price;
      }
      return 0;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="text-center">
          <FaMoneyBillWave className="text-5xl text-[#70C5D7] animate-bounce mx-auto mb-4" />
          <p className="text-[#005482] text-lg">Loading payment information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Gradient */}
        <div className="relative mb-6 md:mb-12 bg-gradient-to-r from-[#005482] to-[#70C5D7] rounded-2xl p-4 md:p-8 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23FFFFFF' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}></div>
          </div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center">
                  <FaMoneyBillWave className="mr-2 md:mr-3 text-[#FCBB45]" />
                  Payment Management
                </h2>
                <p className="text-white/80 text-base md:text-lg flex items-center">
                  <span className="w-6 md:w-10 h-0.5 bg-[#FCBB45] mr-2 md:mr-3"></span>
                  Monitor and manage all financial transactions
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 text-sm md:text-base">
                  <FaCalendarAlt className="mr-2 text-[#FCBB45]" />
                  {new Date().toLocaleDateString('en-US', { 
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-xs md:text-sm mb-1">Total Revenue</p>
                    <p className="text-xl md:text-2xl font-bold text-white">${stats.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="bg-[#FCBB45] p-1.5 md:p-2 rounded-lg shadow-lg">
                    <FaDollarSign className="text-white text-lg md:text-xl" />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs">All time earnings</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-xs md:text-sm mb-1">Average Payment</p>
                    <p className="text-xl md:text-2xl font-bold text-white">${stats.avgAmount.toFixed(2)}</p>
                  </div>
                  <div className="bg-[#DA3A60] p-1.5 md:p-2 rounded-lg shadow-lg">
                    <FaChartLine className="text-white text-lg md:text-xl" />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs">Per transaction average</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-xs md:text-sm mb-1">Total Transactions</p>
                    <p className="text-xl md:text-2xl font-bold text-white">{stats.totalTransactions}</p>
                  </div>
                  <div className="bg-[#70C5D7] p-1.5 md:p-2 rounded-lg shadow-lg">
                    <FaMoneyBillWave className="text-white text-lg md:text-xl" />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs">Successful payments</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-xs md:text-sm mb-1">Unique Students</p>
                    <p className="text-xl md:text-2xl font-bold text-white">{stats.uniqueStudents}</p>
                  </div>
                  <div className="bg-[#005482] p-1.5 md:p-2 rounded-lg shadow-lg">
                    <FaUserGraduate className="text-white text-lg md:text-xl" />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs">Active students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Sort Section */}
        <div className="bg-[#70C5D7]/10 rounded-xl p-3 md:p-6 mb-4 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by email or transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-white text-[#005482] text-sm md:text-base"
                />
                <FaSearch className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full appearance-none pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-white text-[#005482] text-sm md:text-base"
              >
                <option value="date-desc">Latest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Amount (High-Low)</option>
                <option value="amount-asc">Amount (Low-High)</option>
              </select>
              <FaSortAmountDown className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#70C5D7]/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#005482] text-white">
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Student Email</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Transaction ID</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Amount</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Tutor Email</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#70C5D7]/10">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-3 md:px-6 py-6 md:py-8 text-center text-[#005482]">
                      <FaMoneyBillWave className="text-3xl md:text-4xl text-[#DA3A60] mx-auto mb-2 md:mb-3" />
                      <p className="text-base md:text-lg font-medium mb-1">No payments found</p>
                      <p className="text-xs md:text-sm text-[#005482]/70">Try adjusting your search criteria</p>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-[#70C5D7]/5 transition-colors">
                      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-[#005482]">
                        {payment.email}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <span className="inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-[#FCBB45]/10 text-[#005482] text-xs md:text-sm font-medium">
                          {payment.transactionId}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-[#DA3A60]">
                        ${payment.price.toFixed(2)}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-[#005482]">
                        {payment.tutorEmails?.join(', ')}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-[#005482]">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePayments;