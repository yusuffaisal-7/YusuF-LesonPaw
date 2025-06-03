import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaTrash, FaSearch, FaFilter, FaClock, FaMapMarkerAlt, FaDollarSign, FaChalkboardTeacher, FaGraduationCap, FaPlus, FaGlobe, FaExchangeAlt, FaChevronDown, FaSort } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Create SweetAlert2 instance with React support
const MySwal = withReactContent(Swal);

// Skeleton loader for a single service card
const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden animate-pulse">
    {/* Header */}
    <div className="bg-gradient-to-r from-[#2B788B] to-[#5BB5C7] p-3 sm:p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg"></div>
          <div>
            <div className="h-4 sm:h-5 bg-white/20 rounded w-24 sm:w-32 mb-1.5"></div>
            <div className="h-3 sm:h-4 bg-white/20 rounded w-20 sm:w-24"></div>
          </div>
        </div>
        <div className="w-16 sm:w-20 h-5 sm:h-6 bg-white/20 rounded-full"></div>
      </div>
    </div>

    {/* Content */}
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg"></div>
            <div>
              <div className="h-2.5 bg-gray-100 rounded w-12 sm:w-14 mb-1.5"></div>
              <div className="h-3 bg-gray-200 rounded w-16 sm:w-20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-full"></div>
        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
        <div className="h-3 bg-gray-100 rounded w-4/6"></div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
        <div className="h-3 bg-gray-100 rounded w-20 sm:w-24"></div>
        <div className="w-20 sm:w-24 h-7 sm:h-8 bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  </div>
);

// ServiceCard component
const ServiceCard = ({ service }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = React.useState(false);

  // Mutation for deleting a service
  const deleteServiceMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/services/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['services']);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: data.message || 'Service deleted successfully',
        confirmButtonColor: '#DA3A60',
      });
    },
    onError: (err) => {
      console.error('Error deleting service:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete service';
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#DA3A60',
      });
    },
  });

  // Handle delete button click
  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this service?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DA3A60',
      cancelButtonColor: '#005482',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteServiceMutation.mutate(id);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="relative bg-gradient-to-r from-[#2B788B] to-[#5BB5C7] p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg">
              <FaChalkboardTeacher className="text-lg sm:text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-white">
                {service.subject || 'Not specified'}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                by {service.tutorName || 'Unknown Tutor'}
              </p>
            </div>
          </div>
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
            service.teachingMode === 'Online'
              ? 'bg-[#FFE7EC] text-[#DA3A60]'
              : service.teachingMode === 'Offline'
              ? 'bg-[#FFF4E3] text-[#FCBB45]'
              : 'bg-[#E8F7FA] text-[#70C5D7]'
          }`}>
            {service.teachingMode || 'Not specified'}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#F8FAFC]">
              <FaDollarSign className="text-sm sm:text-base text-[#005482]" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-[#64748B]">Rate</p>
              <p className="text-xs sm:text-sm font-medium text-[#005482]">
                ${service.hourlyRate || '0'}/hr
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#F8FAFC]">
              <FaMapMarkerAlt className="text-sm sm:text-base text-[#005482]" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-[#64748B]">Location</p>
              <p className="text-xs sm:text-sm font-medium text-[#005482] truncate max-w-[100px] sm:max-w-[120px]">
                {service.location || 'Not specified'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#F8FAFC]">
              <FaClock className="text-sm sm:text-base text-[#005482]" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-[#64748B]">Availability</p>
              <p className="text-xs sm:text-sm font-medium text-[#005482] truncate max-w-[100px] sm:max-w-[120px]">
                {service.availability || 'Not specified'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#F8FAFC]">
              <FaGraduationCap className="text-sm sm:text-base text-[#005482]" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-[#64748B]">Experience</p>
              <p className="text-xs sm:text-sm font-medium text-[#005482]">
                {service.experience || '0'} Years
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-xs sm:text-sm text-[#64748B] line-clamp-3">
          {service.description || 'No description available'}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#E2E8F0]">
          <div className="text-[10px] sm:text-xs text-[#64748B]">
            {new Date(service.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleDelete(service._id)}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FFE7EC] text-[#DA3A60] rounded-lg hover:bg-[#FFD4DD] transition-colors"
            disabled={deleteServiceMutation.isLoading}
          >
            <FaTrash className="text-xs sm:text-sm" />
            <span className="text-xs sm:text-sm font-medium">
              {deleteServiceMutation.isLoading ? 'Deleting...' : 'Delete'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ShowAllService component
const ShowAllService = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterMode, setFilterMode] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('newest');

  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/services/all');
        return response.data;
      } catch (err) {
        console.error('Error fetching services:', err);
        throw err;
      }
    },
  });

  const filteredAndSortedServices = React.useMemo(() => {
    let result = services.filter(service => {
      const matchesSearch = service.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.tutorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterMode === 'all') return matchesSearch;
      return matchesSearch && service.teachingMode === filterMode;
    });

    // Sort services
    switch (sortBy) {
      case 'newest':
        return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'priceHigh':
        return result.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
      case 'priceLow':
        return result.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
      default:
        return result;
    }
  }, [services, searchTerm, filterMode, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="animate-pulse h-40 bg-gray-100 rounded-3xl"></div>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill(0).map((_, index) => (
              <ServiceCardSkeleton key={index} />
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
          <div className="text-center text-[#DA3A60] py-10 bg-red-50 rounded-3xl">
            <FaChalkboardTeacher className="text-5xl mx-auto mb-4 text-[#DA3A60]" />
            <h3 className="text-xl font-semibold mb-2">Error Loading Services</h3>
            <p>{error.message || 'Failed to fetch services.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-6 md:mb-8 lg:mb-12">
          {/* Background with gradient */}
          <div className="bg-gradient-to-r from-[#2B788B] to-[#5BB5C7] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* Icon with Glow Effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20">
                    <FaChalkboardTeacher className="text-2xl sm:text-4xl text-white" />
                  </div>
                </div>
                
                {/* Title and Subtitle */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                    Services Management
                  </h1>
                  <p className="text-sm sm:text-base text-white/80">
                    Manage and monitor your teaching services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {/* Total Services */}
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-[#E2E8F0] group hover:border-[#70C5D7] transition-colors duration-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-[#005482]/5 rounded-lg group-hover:bg-[#005482]/10 transition-colors duration-200">
                <FaChalkboardTeacher className="text-lg sm:text-xl text-[#005482]" />
              </div>
              <span className="text-xs font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-full">
                Total
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#005482] mb-0.5 sm:mb-1">
              {filteredAndSortedServices.length}
            </div>
            <div className="text-xs sm:text-sm text-[#64748B]">Total Services</div>
          </div>

          {/* Online Services */}
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-[#E2E8F0] group hover:border-[#DA3A60] transition-colors duration-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-[#DA3A60]/5 rounded-lg group-hover:bg-[#DA3A60]/10 transition-colors duration-200">
                <FaGlobe className="text-lg sm:text-xl text-[#DA3A60]" />
              </div>
              <span className="text-xs font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-full">
                Online
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#DA3A60] mb-0.5 sm:mb-1">
              {filteredAndSortedServices.filter(s => s.teachingMode === 'Online').length}
            </div>
            <div className="text-xs sm:text-sm text-[#64748B]">Online Services</div>
          </div>

          {/* Offline Services */}
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-[#E2E8F0] group hover:border-[#FCBB45] transition-colors duration-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-[#FCBB45]/5 rounded-lg group-hover:bg-[#FCBB45]/10 transition-colors duration-200">
                <FaMapMarkerAlt className="text-lg sm:text-xl text-[#FCBB45]" />
              </div>
              <span className="text-xs font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-full">
                Offline
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#FCBB45] mb-0.5 sm:mb-1">
              {filteredAndSortedServices.filter(s => s.teachingMode === 'Offline').length}
            </div>
            <div className="text-xs sm:text-sm text-[#64748B]">Offline Services</div>
          </div>

          {/* Hybrid Services */}
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-[#E2E8F0] group hover:border-[#70C5D7] transition-colors duration-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-[#70C5D7]/5 rounded-lg group-hover:bg-[#70C5D7]/10 transition-colors duration-200">
                <FaExchangeAlt className="text-lg sm:text-xl text-[#70C5D7]" />
              </div>
              <span className="text-xs font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-full">
                Hybrid
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#70C5D7] mb-0.5 sm:mb-1">
              {filteredAndSortedServices.filter(s => s.teachingMode === 'Both').length}
            </div>
            <div className="text-xs sm:text-sm text-[#64748B]">Hybrid Services</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-[#E2E8F0] mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#70C5D7] focus:ring-1 focus:ring-[#70C5D7] outline-none text-sm sm:text-base"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] text-sm sm:text-base" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={filterMode}
                  onChange={(e) => setFilterMode(e.target.value)}
                  className="w-full sm:w-[160px] appearance-none pl-9 sm:pl-10 pr-8 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#70C5D7] focus:ring-1 focus:ring-[#70C5D7] outline-none text-sm sm:text-base text-[#005482]"
                >
                  <option value="all">All Modes</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Both">Hybrid</option>
                </select>
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] text-sm sm:text-base" />
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] text-sm" />
              </div>

              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-[160px] appearance-none pl-9 sm:pl-10 pr-8 py-2 rounded-lg border border-[#E2E8F0] focus:border-[#70C5D7] focus:ring-1 focus:ring-[#70C5D7] outline-none text-sm sm:text-base text-[#005482]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="priceLow">Price: Low to High</option>
                </select>
                <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] text-sm sm:text-base" />
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredAndSortedServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredAndSortedServices.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-4">🎓</div>
            <h3 className="text-lg sm:text-xl font-bold text-[#005482] mb-2">No Services Found</h3>
            <p className="text-sm sm:text-base text-[#64748B]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowAllService;