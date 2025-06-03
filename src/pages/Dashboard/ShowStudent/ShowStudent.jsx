import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import defaultProfileImage from '../../../assets/default-profile';
import { 
  FaSearch, 
  FaGraduationCap, 
  FaUniversity, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaFilter, 
  FaSortAmountDown, 
  FaEye, 
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
  FaTimes
} from 'react-icons/fa';
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

const DetailItem = ({ icon: Icon, label, value, badge }) => (
  <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="flex-shrink-0 mt-1">
      <Icon className="text-[#70C5D7] w-5 h-5" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-[#005482]/70">{label}</p>
      <div className="flex items-center space-x-2">
        <p className="font-medium text-[#005482]">{value || 'Not specified'}</p>
        {badge && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#FCBB45]/10 text-[#FCBB45]">
            {badge}
          </span>
        )}
      </div>
    </div>
  </div>
);

// Header Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color }) => (
  <div className={`bg-white rounded-lg sm:rounded-xl shadow-sm border border-${color}/20 p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4`}>
    <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-${color}/10 flex items-center justify-center`}>
      <Icon className={`w-5 sm:w-6 h-5 sm:h-6 text-${color}`} />
    </div>
    <div>
      <p className="text-xs sm:text-sm text-[#005482]/60">{label}</p>
      <p className="text-base sm:text-xl font-bold text-[#005482]">{value}</p>
    </div>
  </div>
);

// Helper function to format grade display
const formatGrade = (grade) => {
  if (!grade) return 'Grade not specified';
  
  // Convert numeric grades
  if (!isNaN(grade)) {
    return `Grade ${grade}`;
  }
  
  // Format text grades
  const gradeMap = {
    '1': '1st Grade',
    '2': '2nd Grade',
    '3': '3rd Grade',
    '4': '4th Grade',
    '5': '5th Grade',
    '6': '6th Grade',
    '7': '7th Grade',
    '8': '8th Grade',
    '9': '9th Grade',
    '10': '10th Grade',
    '11': '11th Grade',
    '12': '12th Grade',
    'freshman': 'Freshman Year',
    'sophomore': 'Sophomore Year',
    'junior': 'Junior Year',
    'senior': 'Senior Year',
    'graduate': 'Graduate Level'
  };

  return gradeMap[grade.toLowerCase()] || grade;
};

// Student Card Component
const StudentCard = ({ student, onView }) => (
  <div className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#70C5D7]/20 flex flex-col h-full">
    {/* Card Header with Gradient */}
    <div className="relative bg-gradient-to-r from-[#005482] to-[#70C5D7] p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Profile Image and Grade */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-3 sm:border-4 border-white/30">
              <img
                src={student.photoURL || defaultProfileImage}
                alt={student.fullName || 'Student'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultProfileImage;
                }}
              />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 bg-[#FCBB45] rounded-lg sm:rounded-xl w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center border-2 sm:border-[3px] border-white">
              <FaGraduationCap className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0 pt-1 sm:pt-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:opacity-90 transition-opacity duration-300 truncate">
              {student.fullName || 'Unnamed Student'}
            </h3>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="bg-[#FCBB45] text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl inline-flex items-center gap-1.5 sm:gap-2 font-medium">
                <FaGraduationCap className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                {formatGrade(student.gradeYearOfStudy)}
              </span>
            </div>
          </div>
        </div>
        {/* Institution */}
        <div className="bg-white/20 text-white rounded-lg sm:rounded-xl py-2 sm:py-3 px-3 sm:px-4 flex items-center gap-2 sm:gap-3">
          <FaUniversity className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
          <span className="truncate text-xs sm:text-sm">{student.institution || 'Institution not specified'}</span>
        </div>
      </div>
    </div>

    {/* Card Content */}
    <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
      {/* Student Details Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <div className="bg-[#005482]/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-center text-[#005482] mb-1.5 sm:mb-2">
            <FaEnvelope className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">Email</span>
          </div>
          <p className="text-xs sm:text-sm truncate text-[#005482]/80" title={student.email}>
            {student.email || 'Not specified'}
          </p>
        </div>
        <div className="bg-[#005482]/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-center text-[#005482] mb-1.5 sm:mb-2">
            <FaPhone className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">Contact</span>
          </div>
          <p className="text-xs sm:text-sm truncate text-[#005482]/80" title={student.contactNumber}>
            {student.contactNumber || 'Not specified'}
          </p>
        </div>
        <div className="bg-[#005482]/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-center text-[#005482] mb-1.5 sm:mb-2">
            <FaMapMarkerAlt className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">Location</span>
          </div>
          <p className="text-xs sm:text-sm truncate text-[#005482]/80" title={student.cityStateCountry}>
            {student.cityStateCountry || 'Not specified'}
          </p>
        </div>
        <div className="bg-[#005482]/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex items-center text-[#005482] mb-1.5 sm:mb-2">
            <FaCalendarAlt className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">Updated</span>
          </div>
          <p className="text-xs sm:text-sm truncate text-[#005482]/80">
            {student.updatedAt
              ? new Date(student.updatedAt).toLocaleDateString('en-US', {
                  timeZone: 'Asia/Dhaka',
                  dateStyle: 'medium'
                })
              : 'Not specified'}
          </p>
        </div>
      </div>

      {/* Spacer to push button to bottom */}
      <div className="flex-1"></div>

      {/* View Button */}
      <button
        onClick={() => onView(student)}
        className="w-full bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white py-3 sm:py-4 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_4px_12px_rgb(218,58,96,0.25)] hover:shadow-[0_6px_20px_rgb(218,58,96,0.35)] transform hover:-translate-y-0.5"
      >
        <FaEye className="w-4 sm:w-5 h-4 sm:h-5" />
        <span className="text-sm sm:text-base">View Profile</span>
      </button>
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
    <div className="min-h-screen bg-[#ffffff] p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Unique Header Design */}
        <div className="relative mb-6 md:mb-8 lg:mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7] transform skew-y-3 rounded-2xl md:rounded-3xl shadow-lg opacity-10 -z-10"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 p-4 sm:p-6">
              {/* Left Side - Title and Search */}
              <div className="flex-1 w-full lg:w-auto space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="bg-gradient-to-br from-[#005482] via-[#70C5D7] to-[#FCBB45] p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg">
                    <FaUserGraduate className="text-2xl sm:text-3xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#005482]">Student Management</h2>
                    <p className="text-sm sm:text-base text-[#005482]/60 mt-1">Manage and monitor student profiles</p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-xl relative">
                  <input
                    type="text"
                    placeholder="Search by name, email, or institution..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#70C5D7]/20 bg-white text-[#005482] text-sm sm:text-base transition-all duration-200"
                  />
                  <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#70C5D7] text-sm sm:text-base" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-[#DA3A60] hover:text-[#DA3A60]/80 text-sm sm:text-base"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Side - Filters */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                    className="w-full sm:w-[200px] appearance-none pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 rounded-xl border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#70C5D7]/20 bg-white text-[#005482] text-sm sm:text-base"
                  >
                    <option value="fullName-asc">Name (A-Z)</option>
                    <option value="fullName-desc">Name (Z-A)</option>
                    <option value="institution-asc">Institution (A-Z)</option>
                    <option value="institution-desc">Institution (Z-A)</option>
                    <option value="gradeYearOfStudy-asc">Grade (Low-High)</option>
                    <option value="gradeYearOfStudy-desc">Grade (High-Low)</option>
                  </select>
                  <FaSortAmountDown className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#70C5D7] text-sm sm:text-base" />
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="w-full sm:w-[200px] appearance-none pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 rounded-xl border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#70C5D7]/20 bg-white text-[#005482] text-sm sm:text-base"
                  >
                    <option value="all">All Grades</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="graduate">Graduate</option>
                  </select>
                  <FaFilter className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#70C5D7] text-sm sm:text-base" />
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-6 px-4 sm:px-6">
              <StatsCard
                icon={FaUserGraduate}
                label="Total Students"
                value={filteredStudents.length}
                color="[#70C5D7]"
              />
              <StatsCard
                icon={FaUniversity}
                label="Institutions"
                value={new Set(filteredStudents.map(s => s.institution)).size}
                color="[#FCBB45]"
              />
              <StatsCard
                icon={FaGraduationCap}
                label="Grade Levels"
                value={new Set(filteredStudents.map(s => s.gradeYearOfStudy)).size}
                color="[#DA3A60]"
              />
              <StatsCard
                icon={FaBook}
                label="Active Students"
                value={filteredStudents.filter(s => s.status === 'active').length}
                color="[#005482]"
              />
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredStudents.map((student) => (
              <motion.div
                key={student._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <StudentCard 
                  student={student} 
                  onView={() => setSelectedStudent(student)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results Message */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-sm border border-[#70C5D7]/20">
            <FaUserGraduate className="text-[#70C5D7] text-4xl sm:text-5xl mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-[#005482] mb-2">No Students Found</h3>
            <p className="text-sm sm:text-base text-[#005482]/60">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Student Details Modal */}
        <AnimatePresence>
          {selectedStudent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50"
              onClick={() => setSelectedStudent(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Modal Header with Background */}
                  <div className="bg-gradient-to-r from-[#005482] to-[#70C5D7] p-4 sm:p-6 md:p-8 text-white rounded-t-xl sm:rounded-t-2xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <div className="relative">
                        <img
                          src={selectedStudent.photoURL || defaultProfileImage}
                          alt={selectedStudent.fullName || 'Student'}
                          className="w-16 sm:w-24 h-16 sm:h-24 rounded-xl object-cover border-4 border-white shadow-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultProfileImage;
                          }}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-[#FCBB45] rounded-lg w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center border-4 border-white shadow-md">
                          <FaGraduationCap className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 truncate">
                          {selectedStudent.fullName || 'Unnamed Student'}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <div className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center space-x-2">
                            <FaGraduationCap className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                            <span className="text-sm sm:text-base font-medium">{formatGrade(selectedStudent.gradeYearOfStudy)}</span>
                          </div>
                          <div className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center space-x-2">
                            <FaUniversity className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                            <span className="text-sm sm:text-base font-medium truncate">{selectedStudent.institution || 'Institution not specified'}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStudent(null)}
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <FaTimes className="w-5 sm:w-6 h-5 sm:h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <DetailItem
                        icon={FaUserGraduate}
                        label="Full Name"
                        value={selectedStudent.fullName}
                      />
                      <DetailItem
                        icon={FaEnvelope}
                        label="Email"
                        value={selectedStudent.email}
                      />
                      <DetailItem
                        icon={FaUniversity}
                        label="Institution"
                        value={selectedStudent.institution}
                      />
                      <DetailItem
                        icon={FaGraduationCap}
                        label="Grade/Year"
                        value={formatGrade(selectedStudent.gradeYearOfStudy)}
                      />
                      <DetailItem
                        icon={FaPhone}
                        label="Contact"
                        value={selectedStudent.contactNumber}
                      />
                      <DetailItem
                        icon={FaMapMarkerAlt}
                        label="Location"
                        value={selectedStudent.cityStateCountry}
                      />
                    </div>
                    
                    <div className="border-t border-[#70C5D7]/20 mt-4 sm:mt-6 pt-4 sm:pt-6">
                      <DetailItem
                        icon={FaCalendarAlt}
                        label="Last Updated"
                        value={selectedStudent.updatedAt
                          ? new Date(selectedStudent.updatedAt).toLocaleString('en-US', {
                              timeZone: 'Asia/Dhaka',
                              dateStyle: 'full',
                              timeStyle: 'short'
                            })
                          : null}
                      />
                    </div>
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

export default ShowStudent;