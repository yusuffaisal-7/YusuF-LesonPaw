import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaGlobe, FaUserGraduate, FaClock, FaDollarSign, FaBook, FaChalkboardTeacher, 
  FaStar, FaMapMarkerAlt, FaLanguage, FaArrowLeft, FaQuoteLeft, FaEnvelope, 
  FaPhone, FaCalendarAlt, FaCheckCircle, FaWhatsapp, FaComments, FaShare, FaChevronUp, FaChevronDown, FaLock, FaGraduationCap, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import React, { useState } from 'react';

const TeacherDetails = () => {
  const { tutorId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [hasUserRated, setHasUserRated] = useState(false);
  const [hasPaidForTutor, setHasPaidForTutor] = useState(false);

  const { data: tutor, isLoading: tutorLoading, error: tutorError } = useQuery({
    queryKey: ['tutor', tutorId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${tutorId}`);
      return res.data;
    },
  });

  const { data: ratings, isLoading: ratingsLoading, error: ratingsError } = useQuery({
    queryKey: ['ratings', tutorId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ratings/${tutorId}`);
      if (user) {
        const hasRated = res.data.some(rating => rating.studentEmail === user.email);
        setHasUserRated(hasRated);
      }
      return res.data;
    },
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  React.useEffect(() => {
    if (payments && tutor) {
      const paidTutorEmails = payments.flatMap(payment => payment.tutorEmails || []);
      setHasPaidForTutor(paidTutorEmails.includes(tutor.email));
    }
  }, [payments, tutor]);

  const handleBookTutor = async () => {
    if (!user) {
      alert('Please log in to book a tutor.');
      navigate('/login');
      return;
    }

    try {
      const existingBooking = await axiosSecure.get(`/carts?email=${user.email}`);
      const alreadyBooked = existingBooking.data.find((item) => item.tutorId === tutor._id);

      if (alreadyBooked) {
        alert('You have already booked this tutor.');
        return;
      }

      await axiosSecure.post('/carts', {
        email: user.email,
        tutorId: tutor._id,
        tutorName: tutor.name,
        subject: tutor.subjects?.[0] || 'Not specified',
        price: tutor.hourlyRate,
        status: 'Pending',
      });

      alert('Tutor booked successfully!');
      navigate('/dashboard/my-bookings');
    } catch (error) {
      console.error('Error booking tutor:', error);
      alert('Failed to book tutor.');
    }
  };

  const handleContactClick = () => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to contact the tutor',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    if (!hasPaidForTutor) {
      Swal.fire({
        title: 'Subscription Required',
        text: 'Please book this tutor first to get contact access',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Book Now',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          handleBookTutor();
        }
      });
      return;
    }

    window.open(`https://wa.me/${tutor.contactNumber?.replace(/\D/g, '')}`, '_blank');
  };

  if (tutorLoading || ratingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FFFFFF]"></div>
      </div>
    );
  }

  if (tutorError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
        <div className="text-white text-xl">Error: {tutorError.message}</div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
        <div className="text-white text-xl">Tutor not found</div>
      </div>
    );
  }

  const averageRating = ratings?.reduce((acc, curr) => acc + curr.rating, 0) / ratings?.length || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="relative bg-[#005482] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#005482] via-[#005482]/90 to-[#70C5D7]/20"></div>
        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              <span>Back to Search</span>
            </button>
            <div className="text-sm breadcrumbs text-white/60">
              <span>Tutors</span>
              <span className="mx-2">›</span>
              <span className="text-white">{tutor?.name}</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Profile Image */}
            <div className="lg:col-span-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={tutor?.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
                  alt={tutor?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <FaMapMarkerAlt />
                    <span>{tutor?.location || 'Location not specified'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    {tutor?.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <span className="text-xl text-[#70C5D7]">{tutor?.subjects?.[0]}</span>
                    <div className="flex items-center gap-2">
                      <FaGraduationCap className="text-[#70C5D7]" />
                      <span>{tutor?.educationalQualifications || 'Education not specified'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm text-[#70C5D7] mb-1">Experience</div>
                    <div className="text-2xl font-bold">{tutor?.experience || 0} Years</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm text-[#70C5D7] mb-1">Hourly Rate</div>
                    <div className="text-2xl font-bold">${tutor?.hourlyRate || 0}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 col-span-2 sm:col-span-1">
                    <div className="text-sm text-[#70C5D7] mb-1">Rating</div>
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-white/30"}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-bold">({ratings?.length || 0})</span>
                    </div>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex flex-wrap gap-4 pt-6">
                  {user ? (
                    <>
                      <button
                        onClick={handleBookTutor}
                        disabled={isBookingLoading}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#70C5D7] text-white rounded-xl hover:bg-[#70C5D7]/90 transition-colors disabled:opacity-50"
                      >
                        <FaCalendarAlt />
                        <span>Book a Session</span>
                      </button>
                      <button
                        onClick={() => window.location.href = `mailto:${tutor?.email}`}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                      >
                        <FaEnvelope />
                        <span>Send Email</span>
                      </button>
                      {tutor?.contactNumber && (
                        <button
                          onClick={() => window.location.href = `tel:${tutor.contactNumber}`}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                        >
                          <FaPhone />
                          <span>Call Now</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => navigate('/login')}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#70C5D7] text-white rounded-xl hover:bg-[#70C5D7]/90 transition-colors"
                    >
                      <FaLock />
                      <span>Login to Book</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 sticky top-8"
            >
              <h3 className="text-xl font-bold text-[#005482] mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
                    <FaEnvelope className="text-[#FCBB45]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#005482]/60">Email</div>
                    <div className="text-[#005482] break-all">{tutor?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
                    <FaPhone className="text-[#FCBB45]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#005482]/60">Phone</div>
                    <div className="text-[#005482]">{tutor?.contactNumber || 'Not provided'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
                    <FaMapMarkerAlt className="text-[#FCBB45]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#005482]/60">Location</div>
                    <div className="text-[#005482]">{tutor?.location || 'Location not specified'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#005482] mb-6">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {(tutor?.languages || ['English']).map((language, index) => (
                    <span
                      key={index}
                      className="bg-[#70C5D7]/10 text-[#005482] px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#005482] mb-6">Teaching Mode</h3>
                <div className="p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaChalkboardTeacher className="text-[#FCBB45]" />
                    <span className="text-[#005482] font-medium">{tutor?.teachingMode || 'Not specified'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-[#005482] mb-6 flex items-center gap-3">
                <FaUserGraduate />
                About {tutor?.name}
              </h3>
              <p className="text-[#005482]/70 leading-relaxed">
                {tutor?.bio || 'No biography provided.'}
              </p>
            </motion.div>

            {/* Teaching Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-[#005482] mb-6 flex items-center gap-3">
                <FaChalkboardTeacher />
                Teaching Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#005482] mb-4 flex items-center gap-2">
                    <FaBook className="text-[#70C5D7]" />
                    Subjects
                  </h4>
                  <div className="space-y-2">
                    {tutor?.subjects?.map((subject, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-[#005482]/70"
                      >
                        <div className="w-2 h-2 bg-[#70C5D7] rounded-full"></div>
                        <span>{subject}</span>
                      </div>
                    )) || 'No subjects specified'}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-[#005482] mb-4 flex items-center gap-2">
                    <FaClock className="text-[#70C5D7]" />
                    Availability
                  </h4>
                  <div className="space-y-2">
                    {tutor?.availability?.map((time, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-[#005482]/70"
                      >
                        <div className="w-2 h-2 bg-[#70C5D7] rounded-full"></div>
                        <span>{time}</span>
                      </div>
                    )) || 'Availability not specified'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#005482] flex items-center gap-3">
                  <FaStar className="text-[#FCBB45]" />
                  Student Reviews
                </h3>
                {user && !hasUserRated && hasPaidForTutor && (
                  <button
                    onClick={() => navigate(`/dashboard/rate-tutor/${tutor?._id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#70C5D7]/10 text-[#70C5D7] rounded-xl hover:bg-[#70C5D7]/20 transition-colors text-sm"
                  >
                    <FaStar />
                    <span>Write a Review</span>
                  </button>
                )}
              </div>

              {ratings?.length > 0 ? (
                <div className="space-y-6">
                  {(showAllReviews ? ratings : ratings.slice(0, 3)).map((rating, index) => (
                    <div
                      key={index}
                      className="border-b border-[#70C5D7]/10 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center">
                            <FaUser className="text-[#70C5D7]" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={i < rating.rating ? "text-[#FCBB45]" : "text-[#70C5D7]/20"}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-[#005482]/60">
                              {new Date(rating.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[#005482]/70">{rating.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {ratings.length > 3 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="w-full text-center text-[#70C5D7] hover:text-[#005482] transition-colors"
                    >
                      {showAllReviews ? (
                        <span className="inline-flex items-center gap-2">
                          <FaChevronUp />
                          Show Less
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <FaChevronDown />
                          Show All Reviews ({ratings.length})
                        </span>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaComments className="text-[#70C5D7] text-4xl mx-auto mb-4" />
                  <p className="text-[#005482]/60">No reviews yet</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RatingForm = ({ tutorId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (rating === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Rating Required',
        text: 'Please select a rating before submitting',
        confirmButtonColor: 'var(--color-text-dark)',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Check if user has already rated this tutor
      const existingRatings = await axiosSecure.get(`/ratings/${tutorId}`);
      const hasRated = existingRatings.data.some(r => r.studentEmail === user.email);
      
      if (hasRated) {
        Swal.fire({
          icon: 'error',
          title: 'Already Rated',
          text: 'You have already submitted a review for this tutor.',
          confirmButtonColor: 'var(--color-text-dark)',
        });
        return;
      }

      const ratingData = {
        tutorId,
        studentEmail: user.email,
        rating: rating,
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
        setRating(0);
        reset();
        window.location.reload();
      }
    } catch (error) {
      console.error('Rating submission failed', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to submit rating. Please try again.',
        confirmButtonColor: 'var(--color-text-dark)',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
              disabled={isSubmitting}
            >
              <FaStar 
                className={`text-3xl transition-colors duration-200 ${
                  value <= (hoveredRating || rating) 
                    ? 'text-[#FCBB45]' 
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {rating === 0 && (
          <p className="text-sm text-red-500 mt-1">Please select a rating</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
        <textarea
          {...register('comment', { 
            required: 'Please write a review',
            minLength: { value: 10, message: 'Review must be at least 10 characters' }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent transition-all resize-none"
          rows="4"
          placeholder="Share your experience with this tutor..."
          disabled={isSubmitting}
        ></textarea>
        {errors.comment && (
          <p className="text-sm text-red-500 mt-1">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 bg-[#005482] text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#004368]'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <FaStar className="text-sm" /> Submit Review
          </>
        )}
      </button>
    </form>
  );
};

export default TeacherDetails;
