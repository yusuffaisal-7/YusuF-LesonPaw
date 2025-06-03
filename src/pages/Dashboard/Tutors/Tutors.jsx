import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import { 
  FaGraduationCap, FaChalkboardTeacher, FaClock, FaDollarSign, 
  FaMapMarkerAlt, FaEnvelope, FaPhone, FaEdit, FaTrash, FaEye,
  FaFilter, FaSearch, FaSortAmountDown, FaSortAmountUp, FaTimes,
  FaUniversity, FaCalendarAlt, FaBook, FaUserGraduate
} from 'react-icons/fa';

// Skeleton loader component
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="w-16 h-16 bg-[#70C5D7] bg-opacity-10 rounded-xl"></div>
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-[#70C5D7] bg-opacity-10 rounded-xl w-3/4"></div>
        <div className="h-4 bg-[#70C5D7] bg-opacity-10 rounded-xl w-1/2"></div>
      </div>
    </div>
    <div className="mt-4 space-y-3">
      <div className="h-4 bg-[#70C5D7] bg-opacity-10 rounded-xl w-full"></div>
      <div className="h-4 bg-[#70C5D7] bg-opacity-10 rounded-xl w-5/6"></div>
      <div className="h-4 bg-[#70C5D7] bg-opacity-10 rounded-xl w-4/6"></div>
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="h-10 bg-[#70C5D7] bg-opacity-10 rounded-xl w-full sm:w-24"></div>
        <div className="h-10 bg-[#70C5D7] bg-opacity-10 rounded-xl w-full sm:w-24"></div>
        <div className="h-10 bg-[#70C5D7] bg-opacity-10 rounded-xl w-full sm:w-24"></div>
      </div>
    </div>
  </div>
);

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-[#70C5D7]/20 p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
    <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center flex-shrink-0`}>
      <Icon className={`w-6 h-6 text-${color}`} />
    </div>
    <div className="text-center sm:text-left">
      <p className="text-sm text-[#005482]/60">{label}</p>
      <p className="text-xl font-bold text-[#005482]">{value}</p>
    </div>
  </div>
);

const Tutors = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingTutor, setEditingTutor] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [tutorToDelete, setTutorToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const { data: tutors = [], isLoading, error } = useQuery({
    queryKey: ['tutors', searchQuery, filterStatus, sortField, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutors', {
        params: { search: searchQuery, status: filterStatus, sort: sortField, order: sortOrder }
      });
      return res.data;
    },
  });

  const updateTutorMutation = useMutation({
    mutationFn: async (tutorData) =>
      (await axiosSecure.put(`/tutors/${tutorData._id}`, tutorData)).data,
    onSuccess: () => {
      queryClient.invalidateQueries(['tutors']);
      setEditingTutor(null);
    },
    onError: (error) => {
      console.error('Error updating tutor:', error);
      alert(`Failed to update tutor: ${error.response?.data?.message || error.message}`);
    },
  });

  const deleteTutorMutation = useMutation({
    mutationFn: async (tutorId) => (await axiosSecure.delete(`/tutors/${tutorId}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries(['tutors']);
      setIsDeleteConfirmOpen(false);
      setTutorToDelete(null);
    },
    onError: (error) => {
      console.error('Error deleting tutor:', error);
      alert(`Failed to delete tutor: ${error.response?.data?.message || error.message}`);
    },
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (tutor) => {
    setTutorToDelete(tutor);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteTutorMutation.mutate(tutorToDelete._id);
  };

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tutor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <FaUserGraduate className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Error Loading Tutors</h3>
            <p className="text-red-600">{error.message || 'Failed to fetch tutors. Please try again later.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Glassmorphism */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-3xl shadow-lg"></div>
          <div className="relative z-10 p-6 sm:p-8">
            {/* Title and Search Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-[#005482] to-[#70C5D7] p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                  <FaChalkboardTeacher className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#005482]">Manage Tutors</h2>
                  <p className="text-[#005482]/60 mt-1">Oversee and manage your teaching staff</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search tutors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:ring-2 focus:ring-[#70C5D7]/20 bg-white/80 backdrop-blur-sm text-[#005482]"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                </div>
              </div>
            </div>

            {/* Filters and Stats */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filter Status */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full appearance-none pl-12 pr-4 py-3 rounded-xl border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:ring-2 focus:ring-[#70C5D7]/20 bg-white/80 backdrop-blur-sm text-[#005482]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
              </div>

              {/* Sort Button */}
              <button
                onClick={() => handleSort('name')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#005482] text-white rounded-xl hover:bg-[#005482]/90 transition-all"
              >
                {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                <span>Sort by Name</span>
              </button>

              {/* Quick Stats */}
              <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#70C5D7]/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#70C5D7]/10 rounded-lg">
                      <FaChalkboardTeacher className="text-[#70C5D7] text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-[#005482]/60">Total Tutors</p>
                      <p className="text-xl font-bold text-[#005482]">{filteredTutors.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#70C5D7]/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FCBB45]/10 rounded-lg">
                      <FaUserGraduate className="text-[#FCBB45] text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-[#005482]/60">Active Tutors</p>
                      <p className="text-xl font-bold text-[#005482]">
                        {filteredTutors.filter(t => t.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tutors Grid with Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          <AnimatePresence>
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
            ) : filteredTutors.length === 0 ? (
              <motion.div
                className="col-span-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-3xl border border-[#70C5D7]/20">
                  <FaChalkboardTeacher className="text-[#70C5D7] text-5xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#005482] mb-2">No Tutors Found</h3>
                  <p className="text-[#005482]/60">Try adjusting your search or filters</p>
                </div>
              </motion.div>
            ) : (
              filteredTutors.map((tutor) => (
                <motion.div
                  key={tutor._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#70C5D7]/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#70C5D7]/40">
                    {/* Tutor Header */}
                    <div className="relative h-32 bg-gradient-to-r from-[#005482] to-[#70C5D7] p-6">
                      <div className="absolute inset-0 bg-[url('path/to/pattern.svg')] opacity-10"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-white/10 ring-4 ring-white/30 overflow-hidden">
                          {tutor.photoURL ? (
                            <img
                              src={tutor.photoURL}
                              alt={tutor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                              {tutor.name?.charAt(0).toUpperCase() || "T"}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-white mb-1 truncate">
                            {tutor.name || 'Unnamed Tutor'}
                          </h3>
                          <div className="flex items-center gap-2 text-white/80">
                            <FaEnvelope className="flex-shrink-0 text-sm" />
                            <span className="truncate text-sm">{tutor.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tutor Details */}
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[#005482]/70">
                          <div className="p-2 bg-[#70C5D7]/10 rounded-lg">
                            <FaUniversity className="text-[#70C5D7]" />
                          </div>
                          <span className="truncate text-sm">{tutor.institution || 'Institution not specified'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#005482]/70">
                          <div className="p-2 bg-[#70C5D7]/10 rounded-lg">
                            <FaBook className="text-[#70C5D7]" />
                          </div>
                          <span className="truncate text-sm">{tutor.subjects?.join(', ') || 'No subjects specified'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#005482]/70">
                          <div className="p-2 bg-[#70C5D7]/10 rounded-lg">
                            <FaMapMarkerAlt className="text-[#70C5D7]" />
                          </div>
                          <span className="truncate text-sm">{tutor.location || 'Location not specified'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#005482]/70">
                          <div className="p-2 bg-[#70C5D7]/10 rounded-lg">
                            <FaDollarSign className="text-[#70C5D7]" />
                          </div>
                          <span className="truncate text-sm">${tutor.hourlyRate?.toFixed(2) || '0.00'}/hour</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mt-6 flex items-center justify-between">
                        <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                          tutor.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : tutor.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {tutor.status?.charAt(0).toUpperCase() + tutor.status?.slice(1) || 'Active'}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#70C5D7]/20">
                        <Link
                          to={`/dashboard/tutors/${tutor._id}`}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#005482] text-white rounded-xl hover:bg-[#005482]/90 transition-colors text-sm font-medium"
                        >
                          <FaEye className="text-xs" />
                          <span className="hidden sm:inline">View</span>
                        </Link>
                        <button
                          onClick={() => setEditingTutor(tutor)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#70C5D7] text-white rounded-xl hover:bg-[#70C5D7]/90 transition-colors text-sm font-medium"
                        >
                          <FaEdit className="text-xs" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(tutor)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#DA3A60] text-white rounded-xl hover:bg-[#DA3A60]/90 transition-colors text-sm font-medium"
                        >
                          <FaTrash className="text-xs" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {editingTutor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setEditingTutor(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#005482]">Edit Tutor</h3>
                  <button
                    onClick={() => setEditingTutor(null)}
                    className="p-2 hover:bg-[#005482]/5 rounded-lg transition-colors"
                  >
                    <FaTimes className="w-5 h-5 text-[#005482]" />
                  </button>
                </div>

                <Formik
                  initialValues={{
                    name: editingTutor.name || '',
                    email: editingTutor.email || '',
                    subjects: editingTutor.subjects?.join(', ') || '',
                    educationalQualifications: editingTutor.educationalQualifications || '',
                    experience: editingTutor.experience || 0,
                    hourlyRate: editingTutor.hourlyRate || 0,
                    teachingMode: editingTutor.teachingMode || '',
                    availability: editingTutor.availability?.join(', ') || '',
                    bio: editingTutor.bio || '',
                    photoURL: editingTutor.photoURL || '',
                    status: editingTutor.status || 'active',
                    contactNumber: editingTutor.contactNumber || '',
                    institution: editingTutor.institution || '',
                    location: editingTutor.location || ''
                  }}
                  onSubmit={(values) => {
                    const tutorData = {
                      _id: editingTutor._id,
                      ...values,
                      subjects: values.subjects.split(',').map(s => s.trim()).filter(Boolean),
                      availability: values.availability.split(',').map(a => a.trim()).filter(Boolean),
                      experience: parseInt(values.experience),
                      hourlyRate: parseFloat(values.hourlyRate)
                    };
                    updateTutorMutation.mutate(tutorData);
                  }}
                >
                  <Form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#005482] mb-1">Name</label>
                        <Field
                          name="name"
                          className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none text-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#005482] mb-1">Email</label>
                        <Field
                          name="email"
                          type="email"
                          className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none text-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#005482] mb-1">Subjects (comma-separated)</label>
                        <Field
                          name="subjects"
                          className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none text-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#005482] mb-1">Institution</label>
                        <Field
                          name="institution"
                          className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none text-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#005482] mb-1">Experience (years)</label>
                        <Field
                          name="experience"
                          type="number"
                          className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none text-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#005482] mb-1">Hourly Rate ($)</label>
                        <Field
                          name="hourlyRate"
                          type="number"
                          step="0.01"
                          className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none text-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#005482] mb-1">Teaching Mode</label>
                        <Field
                          name="teachingMode"
                          as="select"
                          className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none text-[#005482]"
                        >
                          <option value="">Select Mode</option>
                          <option value="online">Online</option>
                          <option value="in-person">In-Person</option>
                          <option value="hybrid">Hybrid</option>
                        </Field>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#005482] mb-1">Status</label>
                        <Field
                          name="status"
                          as="select"
                          className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none text-[#005482]"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="inactive">Inactive</option>
                        </Field>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#005482] mb-1">Bio</label>
                      <Field
                        name="bio"
                        as="textarea"
                        rows="4"
                        className="w-full px-4 py-2 rounded-lg border-2 border-[#70C5D7]/30 focus:border-[#70C5D7] focus:outline-none text-[#005482]"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setEditingTutor(null)}
                        className="px-4 py-2 text-[#005482] hover:bg-[#005482]/5 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#005482] text-white rounded-lg hover:bg-[#005482]/90 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </Form>
                </Formik>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {isDeleteConfirmOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full p-4 sm:p-6 mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#005482] mb-4">Confirm Delete</h3>
                <p className="text-sm sm:text-base text-[#005482]/70 mb-6">
                  Are you sure you want to delete {tutorToDelete?.name}? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsDeleteConfirmOpen(false)}
                    className="px-4 py-2 text-[#005482] hover:bg-[#005482]/5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-[#DA3A60] text-white rounded-lg hover:bg-[#DA3A60]/90 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tutors;