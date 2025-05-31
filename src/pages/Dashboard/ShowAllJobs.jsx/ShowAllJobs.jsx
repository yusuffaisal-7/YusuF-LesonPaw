// import React from 'react';

// const ShowAllJobs = () => {
//     return (
//         <div>
//             <h1>Shw</h1>
//         </div>
//     );
// };

// export default ShowAllJobs;

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
//       <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//     </div>
//   </div>
// );

// const ShowAllJobs = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: jobs = [], isLoading, error } = useQuery({
//     queryKey: ['jobs'],
//     queryFn: async () => (await axiosSecure.get('/jobs')).data,
//   });

//   if (isLoading) {
//     return (
//       <div className="p-6 max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
//           All Jobs
//         </h2>
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)}
//         </div>
//       </div>
//     );
//   }

//   if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">All Jobs</h2>
//       <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {jobs.map((job) => (
//           <div
//             key={job._id}
//             className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300"
//           >
//             <div className="p-6 space-y-4">
//               <h3 className="text-xl font-bold">{job.subject || 'Untitled Job'}</h3>
//               <p><strong>Email:</strong> {job.email || 'Not specified'}</p>
//               <p><strong>Topics/Goals:</strong> {job.topicsGoals || 'Not specified'}</p>
//               <p><strong>Grade Level:</strong> {job.gradeLevel || 'Not specified'}</p>
//               <p><strong>Sessions/Week:</strong> {job.sessionsPerWeek || 'Not specified'}</p>
//               <p><strong>Budget:</strong> ${job.budget || 'Not specified'}</p>
//               <p><strong>Location:</strong> {job.location || 'Not specified'}</p>
//               <p><strong>Mode of Learning:</strong> {job.modeOfLearning || 'Not specified'}</p>
//               <p><strong>Availability:</strong> {job.availability || 'Not specified'}</p>
//               <p><strong>Open to Negotiation:</strong> {job.openToNegotiation === 'Yes' || job.openToNegotiation === true ? 'Yes' : 'No'}</p>
//               <p><strong>Start Date:</strong> {job.startDate || 'Not specified'}</p>
//               <p><strong>Deadline:</strong> {job.deadline || 'Not specified'}</p>
//               <p><strong>Help Type:</strong> {job.helpType?.join(', ') || 'Not specified'}</p>
//               <p><strong>Additional Notes:</strong> {job.additionalNotes || 'None'}</p>
//               <p><strong>Posted At:</strong> {job.postedAt ? new Date(job.postedAt).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) : 'Not specified'}</p>
//               <p>
//                 <strong>Status:</strong>{' '}
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs ${
//                     job.status === 'pending' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
//                   }`}
//                 >
//                   {job.status?.charAt(0).toUpperCase() + job.status?.slice(1) || 'Pending'}
//                 </span>
//               </p>
//               <div className="border-t pt-2">
//                 <h4 className="font-semibold">Applicants</h4>
//                 {job.applicants && job.applicants.length > 0 ? (
//                   <ul className="list-disc pl-5">
//                     {job.applicants.map((applicant, index) => (
//                       <li key={index} className="text-sm">
//                         {applicant.name || 'Unknown'} ({applicant.email || 'Not specified'})
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-sm">No applicants yet</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShowAllJobs;


// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { FaSearch, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaDollarSign, FaUserGraduate, FaFilter, FaSortAmountDown } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';

// // Skeleton loader
// const SkeletonCard = () => (
//   <div className="bg-[#ffffff] rounded-xl shadow-md overflow-hidden animate-pulse p-6">
//     <div className="flex items-center gap-4 mb-6">
//       <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
//       <div className="flex-1">
//         <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
//         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//       </div>
//     </div>
//     <div className="space-y-4">
//       <div className="h-4 bg-gray-200 rounded w-full"></div>
//       <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//       <div className="h-4 bg-gray-200 rounded w-4/6"></div>
//       <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
//     </div>
//   </div>
// );

// const ShowAllJobs = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('postedAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [filterBy, setFilterBy] = useState('all');
//   const [selectedJob, setSelectedJob] = useState(null);

//   const { data: jobs = [], isLoading, error } = useQuery({
//     queryKey: ['jobs'],
//     queryFn: async () => (await axiosSecure.get('/jobs')).data,
//   });

//   // Filter and sort jobs
//   const filteredJobs = jobs
//     .filter(job => {
//       if (searchQuery) {
//         const searchLower = searchQuery.toLowerCase();
//         return (
//           job.subject?.toLowerCase().includes(searchLower) ||
//           job.email?.toLowerCase().includes(searchLower) ||
//           job.topicsGoals?.toLowerCase().includes(searchLower)
//         );
//       }
//       if (filterBy === 'all') return true;
//       return job.status === filterBy;
//     })
//     .sort((a, b) => {
//       const aValue = a[sortBy] || '';
//       const bValue = b[sortBy] || '';
//       if (sortBy === 'postedAt') {
//         return sortOrder === 'desc' 
//           ? new Date(bValue) - new Date(aValue)
//           : new Date(aValue) - new Date(bValue);
//       }
//       return sortOrder === 'desc'
//         ? bValue.localeCompare(aValue)
//         : aValue.localeCompare(bValue);
//     });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#ffffff] p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <h3 className="text-3xl font-bold text-[#005482] mb-3">Job Management</h3>
//             <p className="text-[#005482]">Loading job listings...</p>
//           </div>
//           <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {[1, 2, 3].map((index) => (
//               <SkeletonCard key={index} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#ffffff] p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
//             <FaBriefcase className="text-[#DA3A60] text-5xl mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-[#DA3A60] mb-2">Error Loading Jobs</h3>
//             <p className="text-[#DA3A60]">{error.message || 'Failed to fetch jobs. Please try again later.'}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#ffffff] p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-3">
//             <div>
//               <h3 className="text-3xl font-bold text-[#005482] mb-2">Job Management</h3>
//               <p className="text-[#005482]">Total Jobs: {filteredJobs.length}</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="text-sm font-medium text-[#005482]">Quick Stats:</span>
//               <span className="px-4 py-2 bg-[#FCBB45] text-[#ffffff] rounded-lg text-sm font-medium">
//                 Active: {jobs.filter(job => job.status === 'active').length}
//               </span>
//               <span className="px-4 py-2 bg-[#DA3A60] text-[#ffffff] rounded-lg text-sm font-medium">
//                 Pending: {jobs.filter(job => job.status === 'pending').length}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="bg-[#70C5D7] rounded-xl shadow-md p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Search */}
//             <div className="md:col-span-2">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search by subject, email, or goals..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 border border-[#ffffff] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-[#ffffff] text-[#005482]"
//                 />
//                 <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482] text-lg" />
//               </div>
//             </div>

//             {/* Filters */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="relative">
//                 <select
//                   value={filterBy}
//                   onChange={(e) => setFilterBy(e.target.value)}
//                   className="w-full appearance-none pl-12 pr-4 py-3 border border-[#ffffff] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-[#ffffff] text-[#005482]"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="active">Active</option>
//                   <option value="pending">Pending</option>
//                   <option value="completed">Completed</option>
//                 </select>
//                 <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
//               </div>

//               <div className="relative">
//                 <select
//                   value={`${sortBy}-${sortOrder}`}
//                   onChange={(e) => {
//                     const [field, order] = e.target.value.split('-');
//                     setSortBy(field);
//                     setSortOrder(order);
//                   }}
//                   className="w-full appearance-none pl-12 pr-4 py-3 border border-[#ffffff] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-[#ffffff] text-[#005482]"
//                 >
//                   <option value="postedAt-desc">Newest First</option>
//                   <option value="postedAt-asc">Oldest First</option>
//                   <option value="subject-asc">Subject (A-Z)</option>
//                   <option value="subject-desc">Subject (Z-A)</option>
//                   <option value="budget-desc">Budget (High-Low)</option>
//                   <option value="budget-asc">Budget (Low-High)</option>
//                 </select>
//                 <FaSortAmountDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Jobs Grid */}
//         {filteredJobs.length === 0 ? (
//           <div className="bg-[#ffffff] rounded-xl shadow-md p-12 text-center">
//             <FaBriefcase className="text-5xl text-[#DA3A60] mx-auto mb-4" />
//             <p className="text-[#005482] text-lg mb-2">No jobs found matching your criteria</p>
//             <p className="text-[#005482]">Try adjusting your search or filters</p>
//           </div>
//         ) : (
//           <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {filteredJobs.map((job) => (
//               <motion.div
//                 key={job._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-[#ffffff] rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="p-6">
//                   {/* Job Header */}
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="w-16 h-16 bg-[#70C5D7] rounded-full flex items-center justify-center text-[#ffffff]">
//                       <FaBriefcase className="text-2xl" />
//                     </div>
//                     <div>
//                       <h4 className="text-xl font-semibold text-[#005482] mb-1">
//                         {job.subject || 'Untitled Job'}
//                       </h4>
//                       <div className="flex items-center gap-2">
//                         <span className={`px-3 py-1 ${
//                           job.status === 'active' ? 'bg-[#FCBB45]' : 
//                           job.status === 'pending' ? 'bg-[#DA3A60]' : 
//                           'bg-[#70C5D7]'
//                         } text-[#ffffff] rounded-full text-sm font-medium capitalize`}>
//                           {job.status || 'Status N/A'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Job Details */}
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
//                       <FaGraduationCap className="text-[#DA3A60] flex-shrink-0" />
//                       <span className="truncate">{job.topicsGoals || 'Goals not specified'}</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
//                       <FaMapMarkerAlt className="text-[#DA3A60] flex-shrink-0" />
//                       <span>{job.location || 'Location not specified'}</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
//                       <FaDollarSign className="text-[#DA3A60] flex-shrink-0" />
//                       <span>Budget: ${job.budget || 'Not specified'} {job.openToNegotiation ? '(Negotiable)' : ''}</span>
//                     </div>

//                     {/* Key Information */}
//                     <div className="grid grid-cols-2 gap-4 mt-4">
//                       <div className="flex items-center gap-2 text-[#005482]">
//                         <FaCalendarAlt className="text-[#FCBB45]" />
//                         <span className="text-sm">
//                           {job.sessionsPerWeek || '0'} Sessions/Week
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 text-[#005482]">
//                         <FaClock className="text-[#FCBB45]" />
//                         <span className="text-sm">
//                           {new Date(job.postedAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>

//                     {/* View Details Button */}
//                     <button
//                       onClick={() => setSelectedJob(job)}
//                       className="w-full bg-[#DA3A60] text-[#ffffff] py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors duration-200 mt-6"
//                     >
//                       View Complete Details
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Job Details Modal */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//               onClick={() => setSelectedJob(null)}
//             >
//               <motion.div
//                 initial={{ scale: 0.95 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.95 }}
//                 className="bg-[#ffffff] rounded-xl shadow-xl max-w-3xl w-full p-8 overflow-y-auto max-h-[90vh]"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center mb-8">
//                   <h3 className="text-2xl font-bold text-[#005482]">Job Details</h3>
//                   <button
//                     onClick={() => setSelectedJob(null)}
//                     className="text-[#005482] hover:text-[#DA3A60] text-2xl font-semibold"
//                   >
//                     ×
//                   </button>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <DetailItem 
//                     icon={<FaBriefcase />}
//                     label="Subject" 
//                     value={selectedJob.subject} 
//                   />
//                   <DetailItem 
//                     icon={<FaGraduationCap />}
//                     label="Topics/Goals" 
//                     value={selectedJob.topicsGoals}
//                   />
//                   <DetailItem 
//                     icon={<FaMapMarkerAlt />}
//                     label="Location" 
//                     value={selectedJob.location} 
//                   />
//                   <DetailItem 
//                     icon={<FaDollarSign />}
//                     label="Budget" 
//                     value={`$${selectedJob.budget}${selectedJob.openToNegotiation ? ' (Negotiable)' : ''}`}
//                   />
//                   <DetailItem 
//                     icon={<FaCalendarAlt />}
//                     label="Sessions/Week" 
//                     value={selectedJob.sessionsPerWeek} 
//                   />
//                   <DetailItem 
//                     icon={<FaClock />}
//                     label="Posted At" 
//                     value={new Date(selectedJob.postedAt).toLocaleString()} 
//                   />
//                   <DetailItem 
//                     icon={<FaUserGraduate />}
//                     label="Help Type" 
//                     value={selectedJob.helpType?.join(', ')} 
//                   />
//                   <DetailItem 
//                     icon={<FaCalendarAlt />}
//                     label="Start Date" 
//                     value={selectedJob.startDate ? new Date(selectedJob.startDate).toLocaleDateString() : 'Not specified'} 
//                   />
//                 </div>

//                 {selectedJob.applicants && selectedJob.applicants.length > 0 && (
//                   <div className="mt-8">
//                     <h4 className="text-lg font-semibold text-[#005482] mb-4">Applicants</h4>
//                     <div className="bg-[#70C5D7] bg-opacity-10 rounded-xl p-4">
//                       <div className="grid gap-4">
//                         {selectedJob.applicants.map((applicant, index) => (
//                           <div key={index} className="flex items-center gap-3">
//                             <FaUserGraduate className="text-[#DA3A60]" />
//                             <div>
//                               <p className="text-[#005482] font-medium">{applicant.name || 'Unnamed Applicant'}</p>
//                               <p className="text-sm text-[#005482]">{applicant.email}</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// // Helper component for detail items in modal
// const DetailItem = ({ icon, label, value }) => (
//   <div className="bg-[#70C5D7] bg-opacity-10 p-4 rounded-xl">
//     <div className="flex items-center gap-3 mb-2">
//       <div className="text-[#DA3A60]">{icon}</div>
//       <label className="text-sm font-medium text-[#005482]">{label}</label>
//     </div>
//     <p className="text-[#005482] font-medium pl-9">{value || 'Not specified'}</p>
//   </div>
// );

// export default ShowAllJobs;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaSearch, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaDollarSign, FaUserGraduate, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Skeleton loader
const SkeletonCard = () => (
  <div className="bg-[#ffffff] rounded-xl shadow-md overflow-hidden animate-pulse p-6">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
    </div>
  </div>
);

const ShowAllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('postedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => (await axiosSecure.get('/jobs')).data,
  });

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter(job => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          job.subject?.toLowerCase().includes(searchLower) ||
          job.email?.toLowerCase().includes(searchLower) ||
          job.topicsGoals?.toLowerCase().includes(searchLower)
        );
      }
      if (filterBy === 'all') return true;
      return job.status === filterBy;
    })
    .sort((a, b) => {
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      if (sortBy === 'postedAt') {
        return sortOrder === 'desc' 
          ? new Date(bValue) - new Date(aValue)
          : new Date(aValue) - new Date(bValue);
      }
      return sortOrder === 'desc'
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-[#005482] mb-3">Job Management</h3>
            <p className="text-[#005482]">Loading job listings...</p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <FaBriefcase className="text-[#DA3A60] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#DA3A60] mb-2">Error Loading Jobs</h3>
            <p className="text-[#DA3A60]">{error.message || 'Failed to fetch jobs. Please try again later.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-3xl font-bold text-[#005482] mb-2">Job Management</h3>
              <p className="text-[#005482]">Total Jobs: {filteredJobs.length}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#005482]">Quick Stats:</span>
              <span className="px-4 py-2 bg-[#FCBB45] text-[#ffffff] rounded-lg text-sm font-medium">
                Active: {jobs.filter(job => job.status === 'active').length}
              </span>
              <span className="px-4 py-2 bg-[#DA3A60] text-[#ffffff] rounded-lg text-sm font-medium">
                Pending: {jobs.filter(job => job.status === 'pending').length}
              </span>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-[#70C5D7] rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by subject, email, or goals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#ffffff] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-[#ffffff] text-[#005482]"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482] text-lg" />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full appearance-none pl-12 pr-4 py-3 border border-[#ffffff] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-[#ffffff] text-[#005482]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
              </div>

              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="w-full appearance-none pl-12 pr-4 py-3 border border-[#ffffff] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-[#ffffff] text-[#005482]"
                >
                  <option value="postedAt-desc">Newest First</option>
                  <option value="postedAt-asc">Oldest First</option>
                  <option value="subject-asc">Subject (A-Z)</option>
                  <option value="subject-desc">Subject (Z-A)</option>
                  <option value="budget-desc">Budget (High-Low)</option>
                  <option value="budget-asc">Budget (Low-High)</option>
                </select>
                <FaSortAmountDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-[#ffffff] rounded-xl shadow-md p-12 text-center">
            <FaBriefcase className="text-5xl text-[#DA3A60] mx-auto mb-4" />
            <p className="text-[#005482] text-lg mb-2">No jobs found matching your criteria</p>
            <p className="text-[#005482]">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#ffffff] rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  {/* Job Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#70C5D7] rounded-full flex items-center justify-center text-[#ffffff]">
                      <FaBriefcase className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#005482] mb-1">
                        {job.subject || 'Untitled Job'}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 ${
                          job.status === 'active' ? 'bg-[#FCBB45]' : 
                          job.status === 'pending' ? 'bg-[#DA3A60]' : 
                          'bg-[#70C5D7]'
                        } text-[#ffffff] rounded-full text-sm font-medium capitalize`}>
                          {job.status || 'Status N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
                      <FaGraduationCap className="text-[#DA3A60] flex-shrink-0" />
                      <span className="truncate">{job.topicsGoals || 'Goals not specified'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
                      <FaMapMarkerAlt className="text-[#DA3A60] flex-shrink-0" />
                      <span>{job.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
                      <FaDollarSign className="text-[#DA3A60] flex-shrink-0" />
                      <span>Budget: ${job.budget || 'Not specified'} {job.openToNegotiation ? '(Negotiable)' : ''}</span>
                    </div>

                    {/* Key Information */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-[#005482]">
                        <FaCalendarAlt className="text-[#FCBB45]" />
                        <span className="text-sm">
                          {job.sessionsPerWeek || '0'} Sessions/Week
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#005482]">
                        <FaClock className="text-[#FCBB45]" />
                        <span className="text-sm">
                          {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-full bg-[#DA3A60] text-[#ffffff] py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors duration-200 mt-6"
                    >
                      View Complete Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Job Details Modal */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-[#ffffff] rounded-xl shadow-xl max-w-3xl w-full p-8 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-[#005482]">Job Details</h3>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-[#005482] hover:text-[#DA3A60] text-2xl font-semibold"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailItem 
                    icon={<FaBriefcase />}
                    label="Subject" 
                    value={selectedJob.subject} 
                  />
                  <DetailItem 
                    icon={<FaGraduationCap />}
                    label="Topics/Goals" 
                    value={selectedJob.topicsGoals}
                  />
                  <DetailItem 
                    icon={<FaMapMarkerAlt />}
                    label="Location" 
                    value={selectedJob.location} 
                  />
                  <DetailItem 
                    icon={<FaDollarSign />}
                    label="Budget" 
                    value={`$${selectedJob.budget}${selectedJob.openToNegotiation ? ' (Negotiable)' : ''}`}
                  />
                  <DetailItem 
                    icon={<FaCalendarAlt />}
                    label="Sessions/Week" 
                    value={selectedJob.sessionsPerWeek} 
                  />
                  <DetailItem 
                    icon={<FaClock />}
                    label="Posted At" 
                    value={new Date(selectedJob.postedAt).toLocaleString()} 
                  />
                  <DetailItem 
                    icon={<FaUserGraduate />}
                    label="Help Type" 
                    value={selectedJob.helpType?.join(', ')} 
                  />
                  <DetailItem 
                    icon={<FaCalendarAlt />}
                    label="Start Date" 
                    value={selectedJob.startDate ? new Date(selectedJob.startDate).toLocaleDateString() : 'Not specified'} 
                  />
                </div>

                {selectedJob.applicants && selectedJob.applicants.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-[#005482] mb-4">Applicants</h4>
                    <div className="bg-[#70C5D7] bg-opacity-10 rounded-xl p-4">
                      <div className="grid gap-4">
                        {selectedJob.applicants.map((applicant, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <FaUserGraduate className="text-[#DA3A60]" />
                            <div>
                              <p className="text-[#005482] font-medium">{applicant.name || 'Unnamed Applicant'}</p>
                              <p className="text-sm text-[#005482]">{applicant.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper component for detail items in modal
const DetailItem = ({ icon, label, value }) => (
  <div className="bg-[#70C5D7] bg-opacity-10 p-4 rounded-xl">
    <div className="flex items-center gap-3 mb-2">
      <div className="text-[#DA3A60]">{icon}</div>
      <label className="text-sm font-medium text-[#005482]">{label}</label>
    </div>
    <p className="text-[#005482] font-medium pl-9">{value || 'Not specified'}</p>
  </div>
);

export default ShowAllJobs;

