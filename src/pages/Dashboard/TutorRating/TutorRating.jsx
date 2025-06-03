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
    const tutorId = data.selectedTutor || paramTutorId;
    
    try {
      // Check if user has already rated this tutor
      const existingRatings = await axiosSecure.get(`/ratings/${tutorId}`);
      const hasAlreadyRated = existingRatings.data.some(rating => rating.studentEmail === user.email);
      
      if (hasAlreadyRated) {
        Swal.fire({
          icon: 'error',
          title: 'Already Rated',
          text: 'You have already submitted a rating for this tutor.',
          confirmButtonColor: 'var(--color-text-dark)',
        });
        return;
      }

      const ratingData = {
        tutorId,
        studentEmail: user.email,
        rating: parseInt(data.rating),
        comment: data.comment,
        date: new Date().toISOString()
      };

      const res = await axiosSecure.post('/ratings', ratingData);
      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Rating Submitted',
          text: 'Thank you for your feedback!',
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
        text: error.response?.data?.message || 'Something went wrong!',
        confirmButtonColor: 'var(--color-text-dark)',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-6">Rate Tutor</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!paramTutorId && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Tutor</label>
                <select 
                  {...register('selectedTutor', { required: 'Please select a tutor' })} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                >
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
              <input
                {...register('rating', { 
                  required: 'Rating is required',
                  min: { value: 1, message: 'Rating must be at least 1' },
                  max: { value: 5, message: 'Rating cannot exceed 5' }
                })}
                type="number"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea 
                {...register('comment', {
                  required: 'Please provide a comment',
                  minLength: { value: 10, message: 'Comment must be at least 10 characters long' }
                })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent resize-none"
                placeholder="Share your experience with this tutor..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[var(--color-text-dark)] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              Submit Rating
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorRating;
