// import React from 'react';

// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';


// const TutorProfile = () => {
//   const { email } = useParams();
//   const axiosSecure = useAxiosSecure();

//   const { data: tutor, isLoading } = useQuery({
//     queryKey: ['tutor', email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/tutors/${email}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <div>Loading tutor profile...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title">{tutor.name}</h2>
//           <p><strong>Email:</strong> {tutor.email}</p>
//           <p><strong>Location:</strong> {tutor.location}</p>
//           <p><strong>Experience:</strong> {tutor.experience || 'Not specified'}</p>
//           <p><strong>Availability:</strong> {tutor.availability || 'Not specified'}</p>
//           <h3 className="text-xl font-semibold mt-4">Services Offered</h3>
//           <ul className="list-disc pl-5">
//             {tutor.services?.map((service, index) => (
//               <li key={index}>{service.subject}: {service.description}</li>
//             ))}
//           </ul>
//           <button className="btn btn-primary mt-4">Contact Tutor</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TutorProfile;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TutorProfile = () => {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();

  // Get tutor details
  const { data: tutor, isLoading } = useQuery({
    queryKey: ['tutor', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${email}`);
      return res.data;
    },
  });

  // Get ratings based on tutor._id
  const { data: ratings = [] } = useQuery({
    enabled: !!tutor?._id, // wait until tutor data is loaded
    queryKey: ['ratings', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ratings/${tutor._id}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading tutor profile...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{tutor.name}</h2>
          <p><strong>Email:</strong> {tutor.email}</p>
          <p><strong>Location:</strong> {tutor.location}</p>
          <p><strong>Experience:</strong> {tutor.experience || 'Not specified'}</p>
          <p><strong>Availability:</strong> {tutor.availability || 'Not specified'}</p>

          <h3 className="text-xl font-semibold mt-4">Services Offered</h3>
          <ul className="list-disc pl-5">
            {tutor.services?.map((service, index) => (
              <li key={index}>{service.subject}: {service.description}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-6">Ratings</h3>
          <ul className="list-disc pl-5">
            {ratings.length > 0 ? (
              ratings.map((rating, index) => (
                <li key={index}>
                  {rating.rating}/5 - {rating.comment} (by {rating.studentEmail})
                </li>
              ))
            ) : (
              <p>No ratings available.</p>
            )}
          </ul>

          <button className="btn btn-primary mt-4">Contact Tutor</button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
