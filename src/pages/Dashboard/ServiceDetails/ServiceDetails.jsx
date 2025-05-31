import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ServiceDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: service, isLoading } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services?${new URLSearchParams({ _id: id }).toString()}`);
      return res.data[0]; // Assuming single service
    },
  });

  if (isLoading) return <div>Loading service details...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{service.subject}</h2>
          <p>Tutor: {service.tutorName}</p>
          <p>Location: {service.location}</p>
          <p>{service.description}</p>
          <button className="btn btn-primary">Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;