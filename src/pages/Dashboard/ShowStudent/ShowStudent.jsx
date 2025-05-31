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

// const ShowStudent = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: students = [], isLoading, error } = useQuery({
//     queryKey: ['students'],
//     queryFn: async () => {
//       try {
//         const response = await axiosSecure.get('/students');
//         return response.data;
//       } catch (err) {
//         console.error('Error fetching students:', err);
//         throw err;
//       }
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="p-6 max-w-7xl mx-auto">
//         <h3 className="text-4xl font-bold mb-10 text-center text-gray-800">
//           All Students
//         </h3>
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {Array(3).fill(0).map((_, index) => <SkeletonCard key={index} />)}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 py-10">
//         Error: {error.message || 'Failed to fetch students. You may not have admin access.'}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h3 className="text-4xl font-bold mb-10 text-center text-gray-800">
//         All Students
//       </h3>
//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {students.map((student) => (
//             <div
//               key={student._id}
//               className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300"
//             >
//               <div className="p-6 space-y-4">
//                 <p><strong>ID:</strong> {student._id || 'Not specified'}</p>
//                 <p><strong>Full Name:</strong> {student.fullName || 'Not specified'}</p>
//                 <p><strong>Email:</strong> {student.email || 'Not specified'}</p>
//                 <p><strong>Institution:</strong> {student.institution || 'Not specified'}</p>
//                 <p><strong>Grade/Year:</strong> {student.gradeYearOfStudy || 'Not specified'}</p>
//                 <p><strong>Contact:</strong> {student.contactNumber || 'Not specified'}</p>
//                 <p><strong>City/State/Country:</strong> {student.cityStateCountry || 'Not specified'}</p>
//                 <p>
//                   <strong>Updated At:</strong>{' '}
//                   {student.updatedAt
//                     ? new Date(student.updatedAt).toLocaleString('en-US', {
//                         timeZone: 'Asia/Dhaka',
//                       })
//                     : 'Not specified'}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowStudent;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaSearch, FaGraduationCap, FaUniversity, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFilter, FaSortAmountDown, FaEye, FaUserGraduate } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Skeleton loader component
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse p-6">
    <div className="flex items-center space-x-4 mb-6">
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

const ShowStudent = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('fullName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/students');
        return response.data;
      } catch (err) {
        console.error('Error fetching students:', err);
        throw err;
      }
    },
  });

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          student.fullName?.toLowerCase().includes(searchLower) ||
          student.email?.toLowerCase().includes(searchLower) ||
          student.institution?.toLowerCase().includes(searchLower)
        );
      }
      if (filterBy === 'all') return true;
      return student.gradeYearOfStudy?.toLowerCase().includes(filterBy.toLowerCase());
    })
    .sort((a, b) => {
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-[#005482] mb-3">Student Management</h3>
            <p className="text-gray-600">Loading student information...</p>
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
            <FaUserGraduate className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Error Loading Students</h3>
            <p className="text-red-600">{error.message || 'Failed to fetch students. You may not have admin access.'}</p>
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
              <h3 className="text-3xl font-bold text-[#005482] mb-2">Student Management</h3>
              <p className="text-[#005482]">Total Students: {filteredStudents.length}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#005482]">Quick Stats:</span>
              <span className="px-4 py-2 bg-[#DA3A60] text-[#ffffff] rounded-lg text-sm font-medium">
                Active: {filteredStudents.length}
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
                  placeholder="Search by name, email, or institution..."
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
                  <option value="all">All Grades</option>
                  <option value="grade-4">Grade 4</option>
                  <option value="grade-5">Grade 5</option>
                  <option value="grade-3">Grade 3</option>
                  <option value="grade-2">Grade 2</option>
                  <option value="grade-1">Grade 1</option>
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
                  <option value="fullName-asc">Name (A-Z)</option>
                  <option value="fullName-desc">Name (Z-A)</option>
                  <option value="gradeYearOfStudy-asc">Grade (Low-High)</option>
                  <option value="gradeYearOfStudy-desc">Grade (High-Low)</option>
                </select>
                <FaSortAmountDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        {filteredStudents.length === 0 ? (
          <div className="bg-[#ffffff] rounded-xl shadow-md p-12 text-center">
            <FaUserGraduate className="text-5xl text-[#DA3A60] mx-auto mb-4" />
            <p className="text-[#005482] text-lg mb-2">No students found matching your criteria</p>
            <p className="text-[#005482]">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#ffffff] rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  {/* Student Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#70C5D7] rounded-full flex items-center justify-center text-[#ffffff]">
                      <FaGraduationCap className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#005482] mb-1">
                        {student.fullName || 'Unnamed Student'}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[#FCBB45] text-[#ffffff] rounded-full text-sm font-medium">
                          Grade {student.gradeYearOfStudy || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
                      <FaEnvelope className="text-[#DA3A60] flex-shrink-0" />
                      <span className="truncate">{student.email || 'Email not specified'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
                      <FaPhone className="text-[#DA3A60] flex-shrink-0" />
                      <span>{student.contactNumber || 'Contact not specified'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
                      <FaMapMarkerAlt className="text-[#DA3A60] flex-shrink-0" />
                      <span className="truncate">{student.cityStateCountry || 'Location not specified'}</span>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="w-full bg-[#DA3A60] text-[#ffffff] py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors duration-200 mt-6"
                    >
                      <FaEye /> View Complete Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Student Details Modal */}
        <AnimatePresence>
          {selectedStudent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedStudent(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-[#ffffff] rounded-xl shadow-xl max-w-3xl w-full p-8 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-[#005482]">Student Profile</h3>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="text-[#005482] hover:text-[#DA3A60] text-2xl font-semibold"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 flex justify-center mb-8">
                    <div className="w-32 h-32 bg-[#70C5D7] rounded-full flex items-center justify-center text-[#ffffff]">
                      <FaGraduationCap className="text-5xl" />
                    </div>
                  </div>
                  <DetailItem 
                    icon={<FaUserGraduate />}
                    label="Full Name" 
                    value={selectedStudent.fullName} 
                  />
                  <DetailItem 
                    icon={<FaGraduationCap />}
                    label="Grade" 
                    value={`Grade ${selectedStudent.gradeYearOfStudy || 'N/A'}`}
                    badge={true}
                  />
                  <DetailItem 
                    icon={<FaEnvelope />}
                    label="Email" 
                    value={selectedStudent.email} 
                  />
                  <DetailItem 
                    icon={<FaUniversity />}
                    label="Institution" 
                    value={selectedStudent.institution} 
                  />
                  <DetailItem 
                    icon={<FaPhone />}
                    label="Contact" 
                    value={selectedStudent.contactNumber} 
                  />
                  <DetailItem 
                    icon={<FaMapMarkerAlt />}
                    label="Location" 
                    value={selectedStudent.cityStateCountry} 
                  />
                  <DetailItem 
                    icon={<FaUserGraduate />}
                    label="Guardian Name" 
                    value={selectedStudent.guardianName} 
                  />
                  <DetailItem 
                    icon={<FaPhone />}
                    label="Guardian Contact" 
                    value={selectedStudent.guardianContactNumber} 
                  />
                  <DetailItem 
                    icon={<FaEnvelope />}
                    label="Guardian Email" 
                    value={selectedStudent.guardianEmail} 
                  />
                  <DetailItem 
                    icon={<FaUniversity />}
                    label="Updated At" 
                    value={
                      selectedStudent.updatedAt
                        ? new Date(selectedStudent.updatedAt).toLocaleString('en-US', {
                            timeZone: 'Asia/Dhaka',
                          })
                        : 'Not specified'
                    } 
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper component for detail items in modal
const DetailItem = ({ icon, label, value, badge }) => (
  <div className="bg-[#70C5D7] bg-opacity-10 p-4 rounded-xl">
    <div className="flex items-center gap-3 mb-2">
      <div className="text-[#DA3A60]">{icon}</div>
      <label className="text-sm font-medium text-[#005482]">{label}</label>
    </div>
    {badge ? (
      <div className="pl-9">
        <span className="inline-block px-3 py-1 bg-[#FCBB45] text-[#ffffff] rounded-full text-sm font-medium">
          {value}
        </span>
      </div>
    ) : (
      <p className="text-[#005482] font-medium pl-9">{value || 'Not specified'}</p>
    )}
  </div>
);

export default ShowStudent;