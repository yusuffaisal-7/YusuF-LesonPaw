import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaGlobe, FaUserGraduate, FaClock, FaDollarSign, FaBook, FaChalkboardTeacher, 
  FaStar, FaMapMarkerAlt, FaLanguage, FaArrowLeft, FaQuoteLeft, FaEnvelope, 
  FaPhone, FaCalendarAlt, FaCheckCircle, FaComments, FaShare } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TeacherDetails = () => {
  const { tutorId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
      return res.data;
    },
  });

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
        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-[#70C5D7] transition-colors duration-300"
            >
              <FaArrowLeft /> Back to Search
            </button>
            <div className="text-sm breadcrumbs">
              <span className="opacity-75">Tutors</span>
              <span className="mx-2">›</span>
              <span>{tutor.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={tutor.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#005482] via-[#005482]/50 to-transparent"></div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold mb-2 text-white bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">
                  {tutor.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-xl text-[#70C5D7]">{tutor.subjects?.[0]}</span>
                  <span className="w-2 h-2 rounded-full bg-[#70C5D7]/30"></span>
                  <span className="text-white/80">{tutor.location || 'Location not specified'}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 my-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="text-sm text-[#70C5D7] mb-1">Experience</div>
                  <div className="text-2xl font-bold text-white">{tutor.experience} Years</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="text-sm text-[#70C5D7] mb-1">Hourly Rate</div>
                  <div className="text-2xl font-bold text-white">${tutor.hourlyRate}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="text-sm text-[#70C5D7] mb-1">Rating</div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-white/30"} />
                      ))}
                    </div>
                    <span className="text-xl font-bold text-white">({ratings?.length || 0})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={handleBookTutor}
                  className="px-8 py-3 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FaCheckCircle className="text-sm" /> Book Now
                </button>
                <button 
                  className="px-8 py-3 border border-white/30 hover:border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaComments className="text-sm" /> Message
                </button>
                <button 
                  className="w-10 h-10 flex items-center justify-center border border-white/30 hover:border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  <FaShare className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-[#005482]">{tutor.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
                    <FaPhone className="text-[#FCBB45]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="text-[#005482]">{tutor.contactNumber || 'Not provided'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
                    <FaMapMarkerAlt className="text-[#FCBB45]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="text-[#005482]">{tutor.location || 'Location not specified'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#005482] mb-6">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {(tutor.languages || ['English']).map((language, index) => (
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
                  <div className="flex items-center gap-3 mb-2">
                    <FaChalkboardTeacher className="text-[#FCBB45]" />
                    <span className="text-[#005482] font-medium">{tutor.teachingMode}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-[#005482] mb-6 flex items-center gap-3">
                <FaUserGraduate className="text-[#FCBB45]" /> Professional Summary
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed">{tutor.bio}</p>
              </div>
            </motion.section>

            {/* Expertise Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-[#005482] mb-6 flex items-center gap-3">
                <FaBook className="text-[#FCBB45]" /> Areas of Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#70C5D7]/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#FCBB45]/10 rounded-lg">
                      <FaUserGraduate className="text-2xl text-[#FCBB45]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#005482]">Education</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700 font-medium">{tutor.educationalQualifications}</p>
                    <p className="text-sm text-gray-500">{tutor.institution}</p>
                  </div>
                </div>

                <div className="bg-[#70C5D7]/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#FCBB45]/10 rounded-lg">
                      <FaBook className="text-2xl text-[#FCBB45]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#005482]">Teaching Subjects</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects?.map((subject, index) => (
                      <span
                        key={index}
                        className="bg-[#005482] text-white px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Reviews Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#005482] flex items-center gap-3">
                  <FaStar className="text-[#FCBB45]" /> Student Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-[#005482]">{averageRating.toFixed(1)}</div>
                  <div className="flex flex-col">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-gray-200"} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">{ratings?.length || 0} reviews</div>
                  </div>
                </div>
              </div>

              {ratingsError && (
                <div className="text-[#DA3A60] bg-[#DA3A60]/10 p-4 rounded-xl">
                  Failed to load reviews.
                </div>
              )}

              {ratings && ratings.length > 0 ? (
                <div className="space-y-6">
                  {ratings.map((review, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-[#70C5D7]/5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < review.rating ? "text-[#FCBB45]" : "text-gray-300"}
                            />
                          ))}
                          <span className="ml-2 text-[#005482] font-medium">
                            {review.rating}/5
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-xl">
                          <FaQuoteLeft className="text-[#70C5D7] text-xl" />
                        </div>
                        <div>
                          <p className="text-gray-700 italic mb-3">{review.comment}</p>
                          <p className="text-sm text-[#005482] font-medium">
                            {review.studentEmail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#70C5D7]/5 rounded-xl">
                  <FaStar className="text-[#FCBB45] text-5xl mx-auto mb-4" />
                  <p className="text-xl text-[#005482] font-medium mb-2">No Reviews Yet</p>
                  <p className="text-gray-500">Be the first to review this tutor</p>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
