// import React, { useContext, useState } from 'react';

// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../../providers/AuthProvider';

// const TutorJobApplications = () => {
//   const axiosSecure = useAxiosSecure();
//    const { user } = useContext(AuthContext);
//   const [applying, setApplying] = useState(null); 

//   const { data: jobs = [], isLoading } = useQuery({
//     queryKey: ['available-jobs'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/jobs/available');
//       return res.data;
//     },
//   });

//   const handleApply = async (jobId) => {
//     setApplying(jobId);
//     try {
//       await axiosSecure.post(`/jobs/apply/${jobId}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Applied to Job',
//         text: 'Your application has been submitted!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to apply to job.',
//       });
//     } finally {
//       setApplying(null);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Available Tutoring Jobs</h2>
//       {jobs.length === 0 ? (
//         <div className="text-center text-gray-600 py-10">
//           No available jobs at the moment. Check back later!
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
//             >
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   {job.userPhotoURL ? (
//                     <img
//                       src={job.userPhotoURL}
//                       alt={job.userName || 'User'}
//                       className="w-12 h-12 rounded-full mr-3 object-cover"
//                       onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
//                     />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                       <span className="text-gray-500">No Image</span>
//                     </div>
//                   )}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {job.userName || job.email}
//                     </h3>
//                     <p className="text-sm text-gray-500">{job.email}</p>
//                   </div>
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-800 mb-3">{job.subject}</h4>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                     </svg>
//                     <span><strong>Goal:</strong> {job.topicsGoals || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
//                     </svg>
//                     <span><strong>Grade:</strong> {job.gradeLevel || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Mode:</strong> {job.modeOfLearning || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     </svg>
//                     <span><strong>Location:</strong> {job.location || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Sessions/Week:</strong> {job.sessionsPerWeek || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Budget:</strong> ${job.budget || 'Not specified'} {job.openToNegotiation === 'Yes' ? '(Negotiable)' : ''}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Start Date:</strong> {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Help Type:</strong> {job.helpType?.join(', ') || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                     </svg>
//                     <span><strong>Notes:</strong> {job.additionalNotes || 'None'}</span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleApply(job._id)}
//                   className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                   disabled={applying === job._id}
//                 >
//                   {applying === job._id ? 'Applying...' : 'Apply to Job'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorJobApplications;


// import React, { useState, useContext } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';
// import Swal from 'sweetalert2';

// const TutorJobApplications = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [applying, setApplying] = useState(null);

//   const { data: jobs = [], isLoading } = useQuery({
//     queryKey: ['available-jobs'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/jobs/available');
//       return res.data;
//     },
//   });

//   const handleApply = async (jobId) => {
//     setApplying(jobId);
//     try {
//       await axiosSecure.post(`/jobs/apply/${jobId}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Applied to Job',
//         text: 'Your application has been submitted!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to apply to job.',
//       });
//     } finally {
//       setApplying(null);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!user?.email) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-red-500 text-lg font-semibold">Please log in to view available jobs.</p>
//         <a href="/login" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//           Go to Login
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Available Tutoring Jobs</h2>
//       {jobs.length === 0 ? (
//         <div className="text-center text-gray-600 py-10">
//           No available jobs at the moment. Check back later!
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
//             >
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   {job.userPhotoURL ? (
//                     <img
//                       src={job.userPhotoURL}
//                       alt={job.userName || 'User'}
//                       className="w-12 h-12 rounded-full mr-3 object-cover"
//                       onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
//                     />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                       <span className="text-gray-500">No Image</span>
//                     </div>
//                   )}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {job.userName || job.email}
//                     </h3>
//                     <p className="text-sm text-gray-500">{job.email}</p>
//                   </div>
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-800 mb-3">{job.subject}</h4>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                     </svg>
//                     <span><strong>Goal:</strong> {job.topicsGoals || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
//                     </svg>
//                     <span><strong>Grade:</strong> {job.gradeLevel || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Mode:</strong> {job.modeOfLearning || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     </svg>
//                     <span><strong>Location:</strong> {job.location || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Sessions/Week:</strong> {job.sessionsPerWeek || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Budget:</strong> ${job.budget || 'Not specified'} {job.openToNegotiation === 'Yes' ? '(Negotiable)' : ''}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Start Date:</strong> {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Help Type:</strong> {job.helpType?.join(', ') || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                     </svg>
//                     <span><strong>Notes:</strong> {job.additionalNotes || 'None'}</span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleApply(job._id)}
//                   className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                   disabled={applying === job._id || job.applicants?.includes(user.name)}
//                 >
//                   {applying === job._id ? 'Applying...' : job.applicants?.includes(user.name) ? 'Already Applied' : 'Apply to Job'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorJobApplications;


// import React, { useState, useContext } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';
// import Swal from 'sweetalert2';

// const TutorJobApplications = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [applying, setApplying] = useState(null);

//   const { data: jobs = [], isLoading } = useQuery({
//     queryKey: ['available-jobs'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/jobs/available');
//       return res.data;
//     },
//   });

//   const handleApply = async (jobId) => {
//     setApplying(jobId);
//     try {
//       await axiosSecure.post(`/jobs/apply/${jobId}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Applied to Job',
//         text: 'Your application has been submitted!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to apply to job.',
//       });
//     } finally {
//       setApplying(null);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!user?.email) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-red-500 text-lg font-semibold">Please log in to view available jobs.</p>
//         <a href="/login" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//           Go to Login
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Available Tutoring Jobs</h2>
//       {jobs.length === 0 ? (
//         <div className="text-center text-gray-600 py-10">
//           No available jobs at the moment. Check back later!
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
//             >
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   {job.userPhotoURL ? (
//                     <img
//                       src={job.userPhotoURL}
//                       alt={job.userName || 'User'}
//                       className="w-12 h-12 rounded-full mr-3 object-cover"
//                       onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
//                     />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                       <span className="text-gray-500">No Image</span>
//                     </div>
//                   )}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {job.userName || job.email}
//                     </h3>
//                     <p className="text-sm text-gray-500">{job.email}</p>
//                   </div>
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-800 mb-3">{job.subject}</h4>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                     </svg>
//                     <span><strong>Goal:</strong> {job.topicsGoals || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
//                     </svg>
//                     <span><strong>Grade:</strong> {job.gradeLevel || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Mode:</strong> {job.modeOfLearning || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     </svg>
//                     <span><strong>Location:</strong> {job.location || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Sessions/Week:</strong> {job.sessionsPerWeek || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Budget:</strong> ${job.budget || 'Not specified'} {job.openToNegotiation === 'Yes' ? '(Negotiable)' : ''}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Start Date:</strong> {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Help Type:</strong> {job.helpType?.join(', ') || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                     </svg>
//                     <span><strong>Notes:</strong> {job.additionalNotes || 'None'}</span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleApply(job._id)}
//                   className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                   disabled={applying === job._id || job.applicants?.includes(user.email)}
//                 >
//                   {applying === job._id ? 'Applying...' : job.applicants?.includes(user.email) ? 'Already Applied' : 'Apply to Job'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorJobApplications;



// import React, { useContext, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';
// import Swal from 'sweetalert2';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaGraduationCap, FaBook, FaClock, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaUserTie, FaChalkboardTeacher, FaFilter, FaSearch } from 'react-icons/fa';

// const TutorJobApplications = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [applying, setApplying] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedJob, setSelectedJob] = useState(null);

//   const { data: jobs = [], isLoading } = useQuery({
//     queryKey: ['available-jobs'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/jobs/available');
//       return res.data;
//     },
//   });

//   const handleApply = async (jobId) => {
//     setApplying(jobId);
//     try {
//       await axiosSecure.post(`/jobs/apply/${jobId}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Applied to Job',
//         text: 'Your application has been submitted!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to apply to job.',
//       });
//     } finally {
//       setApplying(null);
//     }
//   };

//   const filteredJobs = jobs.filter(job => {
//     if (!searchQuery) return true;
//     const query = searchQuery.toLowerCase();
//     return (
//       job.subject?.toLowerCase().includes(query) ||
//       job.topicsGoals?.toLowerCase().includes(query) ||
//       job.location?.toLowerCase().includes(query)
//     );
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#ffffff] p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#70C5D7]"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!user?.email) {
//     return (
//       <div className="min-h-screen bg-[#ffffff] p-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="bg-[#70C5D7] bg-opacity-10 rounded-xl p-8">
//             <FaUserTie className="text-[#DA3A60] text-5xl mx-auto mb-4" />
//             <p className="text-[#005482] text-lg font-semibold mb-4">Please log in to view available jobs</p>
//             <a href="/login" className="inline-block bg-[#DA3A60] text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors">
//           Go to Login
//         </a>
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
//           <h2 className="text-3xl font-bold text-[#005482] mb-4">Available Tutoring Jobs</h2>
//           <div className="bg-[#70C5D7] rounded-xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="relative flex-1 w-full">
//               <input
//                 type="text"
//                 placeholder="Search by subject, topics, or location..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#ffffff] focus:outline-none focus:border-[#DA3A60] bg-white text-[#005482]"
//               />
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
//             </div>
//             <div className="flex items-center gap-4">
//               <span className="text-white font-medium">Total Jobs: {filteredJobs.length}</span>
//             </div>
//           </div>
//         </div>

//         {/* Jobs Grid */}
//         {filteredJobs.length === 0 ? (
//           <div className="bg-[#70C5D7] bg-opacity-10 rounded-xl p-8 text-center">
//             <FaBook className="text-[#DA3A60] text-5xl mx-auto mb-4" />
//             <p className="text-[#005482] text-lg font-semibold">No available jobs found</p>
//             <p className="text-[#005482] mt-2">Check back later for new opportunities</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredJobs.map((job) => (
//               <motion.div
//               key={job._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <div className="p-6">
//                   {/* Job Header */}
//                   <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
//                     <div className="w-16 h-16 bg-[#70C5D7] bg-opacity-10 rounded-xl flex items-center justify-center">
//                       <FaChalkboardTeacher className="text-2xl text-[#70C5D7]" />
//                     </div>
//                   <div>
//                       <h3 className="text-xl font-bold text-[#005482] mb-1">{job.subject}</h3>
//                       <p className="text-[#DA3A60] font-medium">${job.budget}/hr</p>
//                     </div>
//                   </div>

//                   {/* Job Details */}
//                   <div className="space-y-4 mb-6">
//                     <div className="flex items-center gap-3">
//                       <FaGraduationCap className="text-[#70C5D7] flex-shrink-0" />
//                       <span className="text-[#005482]">{job.gradeLevel || 'Grade not specified'}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <FaMapMarkerAlt className="text-[#70C5D7] flex-shrink-0" />
//                       <span className="text-[#005482]">{job.location || 'Location not specified'}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <FaClock className="text-[#70C5D7] flex-shrink-0" />
//                       <span className="text-[#005482]">{job.sessionsPerWeek} sessions/week</span>
//                   </div>
//                 </div>

//                   {/* Goals Section */}
//                   <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl p-4 mb-6">
//                     <h4 className="font-semibold text-[#005482] mb-2">Learning Goals</h4>
//                     <p className="text-[#005482] text-sm line-clamp-2">{job.topicsGoals || 'Goals not specified'}</p>
//                 </div>

//                   {/* Action Buttons */}
//                   <div className="space-y-3">
//                     <button
//                       onClick={() => setSelectedJob(job)}
//                       className="w-full bg-[#70C5D7] bg-opacity-10 text-[#005482] py-2.5 rounded-xl hover:bg-opacity-20 transition-colors font-medium"
//                     >
//                       View Details
//                     </button>
//                 <button
//                   onClick={() => handleApply(job._id)}
//                   disabled={applying === job._id || job.applicants?.includes(user.email)}
//                       className={`w-full py-2.5 rounded-xl font-medium transition-colors ${
//                         applying === job._id || job.applicants?.includes(user.email)
//                           ? 'bg-[#FCBB45] text-white cursor-not-allowed'
//                           : 'bg-[#DA3A60] text-white hover:bg-opacity-90'
//                       }`}
//                     >
//                       {applying === job._id 
//                         ? 'Applying...' 
//                         : job.applicants?.includes(user.email)
//                         ? 'Already Applied'
//                         : 'Apply Now'
//                       }
//                 </button>
//               </div>
//             </div>
//               </motion.div>
//           ))}
//         </div>
//       )}

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
//                 className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-2xl font-bold text-[#005482]">Job Details</h3>
//                   <button
//                     onClick={() => setSelectedJob(null)}
//                     className="text-[#005482] hover:text-[#DA3A60] text-2xl"
//                   >
//                     ×
//                   </button>
//                 </div>

//                 <div className="space-y-6">
//                   {/* Subject and Budget */}
//                   <div className="flex items-center justify-between pb-4 border-b border-gray-100">
//                     <div>
//                       <h4 className="text-xl font-bold text-[#005482]">{selectedJob.subject}</h4>
//                       <p className="text-[#DA3A60] font-medium mt-1">
//                         ${selectedJob.budget}/hr {selectedJob.openToNegotiation === 'Yes' && '(Negotiable)'}
//                       </p>
//                     </div>
//                     <div className="bg-[#70C5D7] bg-opacity-10 px-4 py-2 rounded-xl">
//                       <span className="text-[#005482] font-medium">{selectedJob.modeOfLearning}</span>
//                     </div>
//                   </div>

//                   {/* Detailed Information */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <DetailItem icon={<FaGraduationCap />} label="Grade Level" value={selectedJob.gradeLevel} />
//                     <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={selectedJob.location} />
//                     <DetailItem icon={<FaClock />} label="Sessions/Week" value={selectedJob.sessionsPerWeek} />
//                     <DetailItem 
//                       icon={<FaCalendarAlt />} 
//                       label="Start Date" 
//                       value={selectedJob.startDate ? new Date(selectedJob.startDate).toLocaleDateString() : 'Not specified'} 
//                     />
//                   </div>

//                   {/* Learning Goals */}
//                   <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl p-6">
//                     <h4 className="font-semibold text-[#005482] mb-3">Learning Goals</h4>
//                     <p className="text-[#005482]">{selectedJob.topicsGoals || 'Goals not specified'}</p>
//                   </div>

//                   {/* Additional Notes */}
//                   {selectedJob.additionalNotes && (
//                     <div className="bg-[#FCBB45] bg-opacity-5 rounded-xl p-6">
//                       <h4 className="font-semibold text-[#005482] mb-3">Additional Notes</h4>
//                       <p className="text-[#005482]">{selectedJob.additionalNotes}</p>
//                     </div>
//                   )}

//                   {/* Action Button */}
//                   <button
//                     onClick={() => {
//                       handleApply(selectedJob._id);
//                       setSelectedJob(null);
//                     }}
//                     disabled={applying === selectedJob._id || selectedJob.applicants?.includes(user.email)}
//                     className={`w-full py-3 rounded-xl font-medium transition-colors ${
//                       applying === selectedJob._id || selectedJob.applicants?.includes(user.email)
//                         ? 'bg-[#FCBB45] text-white cursor-not-allowed'
//                         : 'bg-[#DA3A60] text-white hover:bg-opacity-90'
//                     }`}
//                   >
//                     {applying === selectedJob._id 
//                       ? 'Applying...' 
//                       : selectedJob.applicants?.includes(user.email)
//                       ? 'Already Applied'
//                       : 'Apply Now'
//                     }
//                   </button>
//                 </div>
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
//   <div className="flex items-center gap-3">
//     <div className="text-[#70C5D7]">{icon}</div>
//     <div>
//       <p className="text-sm text-[#005482] opacity-75">{label}</p>
//       <p className="text-[#005482] font-medium">{value || 'Not specified'}</p>
//     </div>
//   </div>
// );

// export default TutorJobApplications;

import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGraduationCap,
  FaBook,
  FaClock,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaUserTie,
  FaChalkboardTeacher,
  FaSearch,
} from 'react-icons/fa';

const TutorJobApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [applying, setApplying] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['available-jobs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/jobs/available');
      return res.data;
    },
  });

  const handleApply = async (jobId) => {
    setApplying(jobId);
    try {
      await axiosSecure.post(`/jobs/apply/${jobId}`);
      Swal.fire({
        icon: 'success',
        title: 'Applied to Job',
        text: 'Your application has been submitted!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to apply to job.',
      });
    } finally {
      setApplying(null);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      job.subject?.toLowerCase().includes(query) ||
      job.topicsGoals?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#70C5D7]"></div>
        </div>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-[#70C5D7] bg-opacity-10 rounded-xl p-8">
            <FaUserTie className="text-[#DA3A60] text-5xl mx-auto mb-4" />
            <p className="text-[#005482] text-lg font-semibold mb-4">Please log in to view available jobs</p>
            <a
              href="/login"
              className="inline-block bg-[#DA3A60] text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors"
            >
              Go to Login
            </a>
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
          <h2 className="text-3xl font-bold text-[#005482] mb-4">Available Tutoring Jobs</h2>
          <div className="bg-[#70C5D7] rounded-xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search by subject, topics, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#ffffff] focus:outline-none focus:border-[#DA3A60] bg-white text-[#005482]"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
            </div>
            <span className="text-white font-medium">Total Jobs: {filteredJobs.length}</span>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-[#70C5D7] bg-opacity-10 rounded-xl p-8 text-center">
            <FaBook className="text-[#DA3A60] text-5xl mx-auto mb-4" />
            <p className="text-[#005482] text-lg font-semibold">No available jobs found</p>
            <p className="text-[#005482] mt-2">Check back later for new opportunities</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 bg-[#70C5D7] bg-opacity-10 rounded-xl flex items-center justify-center">
                      <FaChalkboardTeacher className="text-2xl text-[#70C5D7]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#005482] mb-1">{job.subject}</h3>
                      <p className="text-[#DA3A60] font-medium">${job.budget}/hr</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <FaGraduationCap className="text-[#70C5D7]" />
                      <span className="text-[#005482]">{job.gradeLevel || 'Grade not specified'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-[#70C5D7]" />
                      <span className="text-[#005482]">{job.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaClock className="text-[#70C5D7]" />
                      <span className="text-[#005482]">{job.sessionsPerWeek} sessions/week</span>
                    </div>
                  </div>

                  <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-[#005482] mb-2">Learning Goals</h4>
                    <p className="text-[#005482] text-sm line-clamp-2">{job.topicsGoals || 'Goals not specified'}</p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-full bg-[#70C5D7] bg-opacity-10 text-[#005482] py-2.5 rounded-xl hover:bg-opacity-20 transition-colors font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApply(job._id)}
                      disabled={applying === job._id || job.applicants?.includes(user.email)}
                      className={`w-full py-2.5 rounded-xl font-medium transition-colors ${
                        applying === job._id || job.applicants?.includes(user.email)
                          ? 'bg-[#FCBB45] text-white cursor-not-allowed'
                          : 'bg-[#DA3A60] text-white hover:bg-opacity-90'
                      }`}
                    >
                      {applying === job._id
                        ? 'Applying...'
                        : job.applicants?.includes(user.email)
                        ? 'Already Applied'
                        : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
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
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#005482]">Job Details</h3>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-[#005482] hover:text-[#DA3A60] text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <h4 className="text-xl font-bold text-[#005482]">{selectedJob.subject}</h4>
                      <p className="text-[#DA3A60] font-medium mt-1">
                        ${selectedJob.budget}/hr{' '}
                        {selectedJob.openToNegotiation === 'Yes' && '(Negotiable)'}
                      </p>
                    </div>
                    <div className="bg-[#70C5D7] bg-opacity-10 px-4 py-2 rounded-xl">
                      <span className="text-[#005482] font-medium">{selectedJob.modeOfLearning}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem icon={<FaGraduationCap />} label="Grade Level" value={selectedJob.gradeLevel} />
                    <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={selectedJob.location} />
                    <DetailItem icon={<FaClock />} label="Sessions/Week" value={selectedJob.sessionsPerWeek} />
                    <DetailItem
                      icon={<FaCalendarAlt />}
                      label="Start Date"
                      value={
                        selectedJob.startDate
                          ? new Date(selectedJob.startDate).toLocaleDateString()
                          : 'Not specified'
                      }
                    />
                  </div>

                  <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl p-6">
                    <h4 className="font-semibold text-[#005482] mb-3">Learning Goals</h4>
                    <p className="text-[#005482] text-sm">{selectedJob.topicsGoals || 'Not specified'}</p>
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

// DetailItem Component
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-[#70C5D7]">{icon}</div>
    <div>
      <p className="text-sm text-[#005482] font-semibold">{label}</p>
      <p className="text-[#005482]">{value || 'Not specified'}</p>
    </div>
  </div>
);

export default TutorJobApplications;
