// import React, { useContext } from 'react';

// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';

// import Swal from 'sweetalert2';
// import { AuthContext } from '../../../providers/AuthProvider';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const TutorRating = () => {
//   const { user } = useContext(AuthContext);
//   const { tutorId } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     const ratingData = {
//       tutorId,
//       studentEmail: user.email,
//       rating: parseInt(data.rating),
//       comment: data.comment,
//     };
//     const res = await axiosSecure.post('/ratings', ratingData);
//     if (res.data.insertedId) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Rating Submitted',
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Rate Tutor</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 shadow-xl p-6">
//         <div className="form-control mb-4">
//           <label className="label">Rating (1-5)</label>
//           <input {...register('rating', { required: true, min: 1, max: 5 })} type="number" className="input input-bordered" />
//         </div>
//         <div className="form-control mb-4">
//           <label className="label">Comment</label>
//           <textarea {...register('comment')} className="textarea textarea-bordered" />
//         </div>
//         <button type="submit" className="btn btn-primary">Submit Rating</button>
//       </form>
//     </div>
//   );
// };

// export default TutorRating;

import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TutorRating = () => {
  const { user } = useContext(AuthContext);
  const { tutorId: paramTutorId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tutors
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axiosSecure.get('/tutors'); // Ensure this route exists
        setTutors(res.data);
      } catch (error) {
        console.error('Failed to fetch tutors', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [axiosSecure]);

  const onSubmit = async (data) => {
  const ratingData = {
    tutorId: data.selectedTutor || paramTutorId,
    studentEmail: user.email,
    rating: parseInt(data.rating),
    comment: data.comment,
  };

  try {
    const res = await axiosSecure.post('/ratings', ratingData);
    if (res.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Rating Submitted',
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    }
  } catch (error) {
    console.error('Rating submission failed', error);
    Swal.fire({
      icon: 'error',
      title: 'Error submitting rating',
      text: error.message || 'Something went wrong!',
    });
  }
};


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Rate Tutor</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 shadow-xl p-6">

        {!paramTutorId && (
          <div className="form-control mb-4">
            <label className="label">Select Tutor</label>
            <select {...register('selectedTutor', { required: true })} className="select select-bordered">
              <option value="">-- Choose a Tutor --</option>
              {loading ? (
                <option disabled>Loading tutors...</option>
              ) : (
                tutors.map((tutor) => (
                  <option key={tutor._id} value={tutor._id}>
                    {tutor.name}
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        <div className="form-control mb-4">
          <label className="label">Rating (1-5)</label>
          <input
            {...register('rating', { required: true, min: 1, max: 5 })}
            type="number"
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Comment</label>
          <textarea {...register('comment')} className="textarea textarea-bordered" />
        </div>

        <button type="submit" className="btn btn-primary">Submit Rating</button>
      </form>
    </div>
  );
};

export default TutorRating;
