
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ServiceListing = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const [search, setSearch] = useState(searchQuery);

  // Fetch services based on search
  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services', search],
    queryFn: async () => {
      const queryParams = new URLSearchParams({ search });
      const res = await axiosSecure.get(`/services?${queryParams.toString()}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading services...</div>;
  if (error) return <div className="alert alert-error">Error loading services</div>;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 pt-32"
    >
      <div className="form-control mb-6">
        <input
          type="text"
          placeholder="Search services..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Available Tutoring Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{service.subject}</h3>
              <p><strong>Tutor:</strong> {service.tutorName}</p>
              <p><strong>Location:</strong> {service.location}</p>
              <p>{service.description}</p>
              <div className="card-actions justify-end">
                <Link to={`/services/${service._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && <p className="mt-4 text-center">No services found.</p>}
    </motion.div>
  );
};

export default ServiceListing;
