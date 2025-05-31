// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';


// // Skeleton loader
// const SkeletonCard = () => (
//   <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
//     <div className="p-6 space-y-2">
//       <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//       <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//     </div>
//   </div>
// );

// const ShowTeachersApplication = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: applications = [], isLoading, error } = useQuery({
//     queryKey: ['teacherApplications'],
//     queryFn: async () => (await axiosSecure.get('/teacher-requests')).data,
//   });

//   if (isLoading) {
//     return (
//       <div className="p-6 max-w-7xl mx-auto">
//         <h3 className="text-4xl font-bold mb-10 text-center text-gray-800">
//           Teacher Applications
//         </h3>
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {Array(3).fill(0).map((_, index) => <SkeletonCard key={index} />)}
//         </div>
//       </div>
//     );
//   }

//   if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h3 className="text-4xl font-bold mb-10 text-center text-gray-800">
//         Teacher Applications
//       </h3>
//       {applications.length === 0 ? (
//         <p className="text-center text-gray-500">No applications found.</p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {applications.map((application) => (
//             <div
//               key={application._id}
//               className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300"
//             >
//               <div className="p-6 space-y-4">
//                 <p><strong>Email:</strong> {application.email || 'Not specified'}</p>
//                 <p><strong>Title:</strong> {application.title || 'Not specified'}</p>
//                 <p><strong>Reason:</strong> {application.reason || 'Not specified'}</p>
//                 <p><strong>CV Link:</strong> <a href={application.cvLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{application.cvLink || 'Not provided'}</a></p>
//                 <p>
//                   <strong>Submitted At:</strong>{' '}
//                   {application.submittedAt
//                     ? new Date(application.submittedAt).toLocaleString('en-US', {
//                         timeZone: 'Asia/Dhaka',
//                       })
//                     : 'Not specified'}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{' '}
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       application.status === 'pending'
//                         ? 'bg-yellow-200 text-yellow-800'
//                         : application.status === 'approved'
//                         ? 'bg-green-200 text-green-800'
//                         : 'bg-red-200 text-red-800'
//                     }`}
//                   >
//                     {application.status?.charAt(0).toUpperCase() +
//                       application.status?.slice(1) || 'Pending'}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowTeachersApplication;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaEnvelope, FaFileAlt, FaClock, FaCheck, FaTimes, FaEye } from 'react-icons/fa';

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

  const { data: applications = [], isLoading, error, refetch } = useQuery({
    queryKey: ['teacherApplications'],
    queryFn: async () => (await axiosSecure.get('/teacher-requests')).data,
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

  if (isLoading) {
    return (
      <div className="w-full p-8">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {[1, 2].map((index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error loading applications</p>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-8">
      {applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaUserGraduate className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No applications found</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {applications.map((application) => (
            <motion.div
              key={application._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Header Section */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--color-text-dark)] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <FaUserGraduate className="text-xl" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {application.title || 'To Join as a teacher'}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <FaEnvelope className="mr-2" />
                      <span className="text-sm">{application.email}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                      <FaFileAlt className="mr-2 mt-1 text-gray-500" />
                      <span className="text-gray-700">{application.reason || 'I want to join'}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FaClock className="mr-2" />
                      <span className="text-sm">{formatDate(application.submittedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Section - Always at bottom */}
                <div className="mt-6 pt-4 border-t">
                  <button
                    onClick={() => handleViewDetails(application)}
                    className="flex items-center text-[var(--color-text-dark)] hover:text-blue-700 font-medium ml-auto"
                  >
                    <FaEye className="mr-1" /> View Details
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseDetails}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Application Details</h3>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Title</label>
                    <p className="mt-1">{selectedApplication.title || 'To Join as a teacher'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="mt-1">{selectedApplication.email}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Reason for Application</label>
                  <p className="mt-1 text-gray-800">{selectedApplication.reason || 'I want to join'}</p>
                </div>

                {selectedApplication.cvLink && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">CV/Resume</label>
                    <div className="mt-1">
                      <a
                        href={selectedApplication.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        View CV/Resume
                      </a>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600">Submission Date</label>
                  <p className="mt-1">{formatDate(selectedApplication.submittedAt)}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <p className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedApplication.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    selectedApplication.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedApplication.status?.charAt(0).toUpperCase() + selectedApplication.status?.slice(1) || 'Pending'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
                <button
                  onClick={handleCloseDetails}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShowTeachersApplication;