// import React from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// // Create SweetAlert2 instance with React support
// const MySwal = withReactContent(Swal);

// // Skeleton loader for a single service card
// const ServiceCardSkeleton = () => (
//   <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
//     <div className="p-6 space-y-2">
//       <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//       <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//     </div>
//   </div>
// );

// // ServiceCard component
// const ServiceCard = ({ service }) => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Mutation for deleting a service
//   const deleteServiceMutation = useMutation({
//     mutationFn: async (id) => {
//       const response = await axiosSecure.delete(`/services/${id}`);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(['services']);
//       MySwal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: data.message || 'Service deleted successfully',
//         confirmButtonColor: '#3085d6',
//       });
//     },
//     onError: (err) => {
//       console.error('Error deleting service:', err);
//       const errorMessage = err.response?.data?.message || 'Failed to delete service';
//       MySwal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: errorMessage,
//         confirmButtonColor: '#d33',
//       });
//     },
//   });

//   // Handle delete button click
//   const handleDelete = (id) => {
//     MySwal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to delete this service?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteServiceMutation.mutate(id);
//       }
//     });
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300">
//       <div className="p-6 space-y-4">
//         <h3 className="text-lg font-semibold text-gray-800">
//           {service.subject || 'Not specified'}
//         </h3>
//         <p>
//           <strong>Tutor:</strong> {service.tutorName || 'Not specified'}
//         </p>
//         <p>
//           <strong>Email:</strong> {service.tutorEmail || 'Not specified'}
//         </p>
//         <p>
//           <strong>Teaching Mode:</strong> {service.teachingMode || 'Not specified'}
//         </p>
//         <p>
//           <strong>Hourly Rate:</strong> ${service.hourlyRate || 'Not specified'}
//         </p>
//         <p>
//           <strong>Location:</strong>{' '}
//           {service.location || service.teachingMode === 'Online' ? 'Online' : 'Not specified'}
//         </p>
//         <p>
//           <strong>Availability:</strong> {service.availability || 'Not specified'}
//         </p>
//         <p>
//           <strong>Description:</strong> {service.description || 'Not specified'}
//         </p>
//         <p>
//           <strong>Created At:</strong>{' '}
//           {service.createdAt
//             ? new Date(service.createdAt).toLocaleString('en-US', {
//                 timeZone: 'Asia/Dhaka',
//               })
//             : 'Not specified'}
//         </p>
//         <button
//           onClick={() => handleDelete(service._id)}
//           className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//           disabled={deleteServiceMutation.isLoading}
//         >
//           {deleteServiceMutation.isLoading ? 'Deleting...' : 'Delete Service'}
//         </button>
//       </div>
//     </div>
//   );
// };

// // ShowAllService component
// const ShowAllService = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: services = [], isLoading, error } = useQuery({
//     queryKey: ['services'],
//     queryFn: async () => {
//       try {
//         const response = await axiosSecure.get('/services/all');
//         return response.data;
//       } catch (err) {
//         console.error('Error fetching services:', err);
//         throw err;
//       }
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="p-6 max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
//           All Services
//         </h2>
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {Array(3).fill(0).map((_, index) => (
//             <ServiceCardSkeleton key={index} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 py-10">
//         Error: {error.message || 'Failed to fetch services.'}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
//         All Services
//       </h2>
//       {services.length === 0 ? (
//         <p className="text-center text-gray-500">No services found.</p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {services.map((service) => (
//             <ServiceCard key={service._id} service={service} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowAllService;


import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaTrash, FaSearch, FaFilter, FaClock, FaMapMarkerAlt, FaDollarSign, FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Create SweetAlert2 instance with React support
const MySwal = withReactContent(Swal);

// Skeleton loader for a single service card
const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
      <div className="h-16 bg-gray-200 rounded w-full"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
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
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="p-3 bg-[#70C5D7] bg-opacity-10 rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChalkboardTeacher className="text-2xl text-[#70C5D7]" />
            </motion.div>
            <div>
              <h3 className="text-xl font-semibold text-[#005482]">
                {service.subject || 'Not specified'}
              </h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="text-sm text-[#70C5D7]"
              >
                {service.teachingMode || 'Mode not specified'}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section - Grows to fill available space */}
        <div className="flex-grow flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4 p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <FaGraduationCap className="text-[#005482]" />
              <span className="text-gray-600">{service.tutorName || 'Not specified'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaDollarSign className="text-[#FCBB45]" />
              <span className="text-gray-600">${service.hourlyRate || 'Not specified'}/hr</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-[#DA3A60]" />
              <span className="text-gray-600">
                {service.location || (service.teachingMode === 'Online' ? 'Online' : 'Not specified')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-[#70C5D7]" />
              <span className="text-gray-600">{service.availability || 'Not specified'}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-600 line-clamp-2 hover:line-clamp-none transition-all duration-300">
              {service.description || 'No description available'}
            </p>
          </div>
        </div>

        {/* Footer Section - Always at bottom */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Created: {new Date(service.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(service._id)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-[#DA3A60] rounded-lg hover:bg-red-100 transition-colors"
            disabled={deleteServiceMutation.isLoading}
          >
            <FaTrash />
            <span>{deleteServiceMutation.isLoading ? 'Deleting...' : 'Delete'}</span>
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
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#005482]">Services Management</h2>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, index) => (
            <ServiceCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-[#DA3A60] py-10">
        Error: {error.message || 'Failed to fetch services.'}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-[#005482] mb-2">Services Management</h2>
            <p className="text-gray-600">Total Services: {filteredAndSortedServices.length}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="relative flex-1 sm:flex-none">
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 appearance-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent"
              >
                <option value="all">All Modes</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Hybrid</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="priceLow">Price: Low to High</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {filteredAndSortedServices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-10 bg-white rounded-xl shadow-sm"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#005482] mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShowAllService;