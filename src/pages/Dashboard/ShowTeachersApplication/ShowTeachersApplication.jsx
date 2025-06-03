import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaEnvelope, FaFileAlt, FaClock, FaCheck, FaTimes, FaEye, FaSearch } from 'react-icons/fa';

// Skeleton loader with improved design
const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
    </div>
  </div>
);

const ShowTeachersApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: applications = [], isLoading, error, refetch } = useQuery({
    queryKey: ['teacherApplications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher-requests');
      return res.data;
    },
  });

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  const handleCloseDetails = () => {
    setSelectedApplication(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.reason?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <div className="w-full p-4 sm:p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error loading applications</p>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#005482]">Teacher Applications</h1>
            <p className="text-gray-600 mt-1">
              {filteredApplications.length} {filteredApplications.length === 1 ? 'application' : 'applications'} found
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005482] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005482] focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications Grid */}
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <FaUserGraduate className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No applications found</p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="mt-4 text-[#005482] hover:text-[#70C5D7] transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredApplications.map((application) => (
              <motion.div
                key={application._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Header Section */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                      <FaUserGraduate className="text-xl" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                        {application.title || 'Teaching Application'}
                      </h3>
                      <div className="flex items-center text-gray-600 truncate">
                        <FaEnvelope className="mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{application.email}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex-shrink-0 ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Pending'}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <FaFileAlt className="mr-2 mt-1 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700 line-clamp-2">{application.reason || 'No reason provided'}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaClock className="mr-2 flex-shrink-0" />
                        <span className="text-sm">{formatDate(application.submittedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(application)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#005482] bg-opacity-10 text-[#005482] rounded-lg hover:bg-opacity-20 transition-colors"
                    >
                      <FaEye /> View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Application Details Modal */}
        <AnimatePresence>
          {selectedApplication && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto"
              onClick={handleCloseDetails}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-white px-6 sm:px-8 py-6 border-b border-gray-100 z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-xl flex items-center justify-center text-white shadow-lg">
                        <FaUserGraduate className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#005482]">Application Details</h3>
                        <p className="text-[#70C5D7] mt-1 flex items-center gap-2">
                          <FaClock className="text-sm flex-shrink-0" />
                          <span className="text-sm truncate">Submitted {formatDate(selectedApplication.submittedAt)}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseDetails}
                      className="absolute top-4 right-4 text-gray-400 hover:text-[#DA3A60] transition-colors p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Content Area with Scroll */}
                <div className="overflow-y-auto p-6 sm:p-8 space-y-6 sm:space-y-8">
                  {/* Status Banner */}
                  <div className={`w-full p-4 rounded-xl flex items-start sm:items-center gap-3 ${
                    selectedApplication.status === 'pending' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
                    selectedApplication.status === 'approved' ? 'bg-green-50 text-green-800 border border-green-200' :
                    'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      selectedApplication.status === 'pending' ? 'bg-yellow-100' :
                      selectedApplication.status === 'approved' ? 'bg-green-100' :
                      'bg-red-100'
                    }`}>
                      {selectedApplication.status === 'approved' ? <FaCheck className="text-xl" /> :
                       selectedApplication.status === 'pending' ? <FaClock className="text-xl" /> :
                       <FaTimes className="text-xl" />}
                    </div>
                    <div>
                      <h4 className="font-semibold">Application Status</h4>
                      <p className="text-sm">
                        {selectedApplication.status === 'pending' ? 'This application is pending review' :
                         selectedApplication.status === 'approved' ? 'This application has been approved' :
                         'This application has been rejected'}
                      </p>
                    </div>
                  </div>

                  {/* Main Information Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Information Card */}
                    <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl overflow-hidden">
                      <div className="px-6 py-4 bg-[#70C5D7] bg-opacity-10">
                        <h4 className="text-lg font-semibold text-[#005482]">Basic Information</h4>
                      </div>
                      <div className="p-6 space-y-6">
                        <div>
                          <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">Title</label>
                          <p className="text-[#005482] font-medium">
                            {selectedApplication.title || 'Teaching Application'}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">Email Address</label>
                          <p className="text-[#005482] font-medium flex items-center gap-2 bg-white p-3 rounded-lg border border-[#70C5D7] border-opacity-20 break-all">
                            <FaEnvelope className="text-[#DA3A60] flex-shrink-0" />
                            {selectedApplication.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Application Details Card */}
                    <div className="bg-[#FCBB45] bg-opacity-5 rounded-xl overflow-hidden">
                      <div className="px-6 py-4 bg-[#FCBB45] bg-opacity-10">
                        <h4 className="text-lg font-semibold text-[#005482]">Application Details</h4>
                      </div>
                      <div className="p-6 space-y-6">
                        <div>
                          <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">Reason for Application</label>
                          <p className="text-[#005482] bg-white p-3 rounded-lg border border-[#FCBB45] border-opacity-20 whitespace-pre-wrap">
                            {selectedApplication.reason || 'No reason provided'}
                          </p>
                        </div>
                        {selectedApplication.cvLink && (
                          <div>
                            <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">CV/Resume</label>
                            <a
                              href={selectedApplication.cvLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-3 bg-[#DA3A60] bg-opacity-10 text-[#DA3A60] rounded-lg hover:bg-opacity-20 transition-colors w-full"
                            >
                              <FaFileAlt className="flex-shrink-0" />
                              <span className="flex-1 truncate">View CV/Resume</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information Section */}
                  {selectedApplication.additionalInfo && (
                    <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl overflow-hidden">
                      <div className="px-6 py-4 bg-[#70C5D7] bg-opacity-10">
                        <h4 className="text-lg font-semibold text-[#005482]">Additional Information</h4>
                      </div>
                      <div className="p-6">
                        <p className="text-[#005482] bg-white p-4 rounded-lg border border-[#70C5D7] border-opacity-20 whitespace-pre-wrap">
                          {selectedApplication.additionalInfo}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions - Sticky */}
                <div className="sticky bottom-0 bg-white px-6 sm:px-8 py-4 border-t border-gray-100">
                  <div className="flex justify-end">
                    <button
                      onClick={handleCloseDetails}
                      className="px-6 py-2.5 text-sm font-medium text-[#005482] hover:bg-[#70C5D7] hover:bg-opacity-10 rounded-lg transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShowTeachersApplication;