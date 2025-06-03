import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import {
  FaUser, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendarAlt,
  FaGraduationCap, FaChalkboardTeacher, FaStar, FaPhone,
  FaBook, FaDollarSign, FaUniversity, FaUserGraduate
} from 'react-icons/fa';

// Loading Skeleton Component
const ProfileSkeleton = () => (
  <div className="container mx-auto p-8 animate-pulse">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

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
    enabled: !!tutor?._id,
    queryKey: ['ratings', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ratings/${tutor._id}`);
      return res.data;
    },
  });

  if (isLoading) return <ProfileSkeleton />;

  const averageRating = ratings.length
    ? (ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length).toFixed(1)
    : 'N/A';

  return (
    <div className="min-h-screen bg-[#ffffff] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7] transform skew-y-3 rounded-3xl shadow-lg opacity-10 -z-10"></div>
          <div className="relative z-10 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-[#005482]/10 flex items-center justify-center"
              >
                {tutor.photoURL ? (
                  <img
                    src={tutor.photoURL}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="w-16 h-16 text-[#005482]/30" />
                )}
              </motion.div>

              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-[#005482] mb-2">{tutor.name}</h1>
                <p className="text-[#005482]/60 text-lg mb-4">{tutor.educationalQualifications || 'Professional Tutor'}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 text-[#005482]/70">
                    <FaEnvelope className="w-4 h-4" />
                    <span>{tutor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#005482]/70">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span>{tutor.location || 'Location not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#005482]/70">
                    <FaPhone className="w-4 h-4" />
                    <span>{tutor.contactNumber || 'Contact not provided'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="text-center px-6 py-3 bg-white rounded-xl shadow-sm border border-[#70C5D7]/20">
                  <div className="text-2xl font-bold text-[#005482] mb-1">{averageRating}</div>
                  <div className="text-sm text-[#005482]/60">Rating</div>
                </div>
                <div className="text-center px-6 py-3 bg-white rounded-xl shadow-sm border border-[#70C5D7]/20">
                  <div className="text-2xl font-bold text-[#005482] mb-1">{tutor.experience || 0}</div>
                  <div className="text-sm text-[#005482]/60">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Professional Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-[#70C5D7]/20"
            >
              <h2 className="text-xl font-bold text-[#005482] mb-4 flex items-center gap-2">
                <FaUserGraduate />
                About
              </h2>
              <p className="text-[#005482]/70 leading-relaxed">
                {tutor.bio || 'No biography provided.'}
              </p>
            </motion.div>

            {/* Teaching Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-[#70C5D7]/20"
            >
              <h2 className="text-xl font-bold text-[#005482] mb-4 flex items-center gap-2">
                <FaChalkboardTeacher />
                Teaching Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#005482] mb-2 flex items-center gap-2">
                    <FaBook className="w-4 h-4" />
                    Subjects
                  </h3>
                  <ul className="space-y-2">
                    {tutor.subjects?.map((subject, index) => (
                      <li key={index} className="text-[#005482]/70 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#70C5D7] rounded-full"></span>
                        {subject}
                      </li>
                    )) || 'No subjects specified'}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#005482] mb-2 flex items-center gap-2">
                    <FaClock className="w-4 h-4" />
                    Availability
                  </h3>
                  <ul className="space-y-2">
                    {tutor.availability?.map((time, index) => (
                      <li key={index} className="text-[#005482]/70 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#70C5D7] rounded-full"></span>
                        {time}
                      </li>
                    )) || 'Availability not specified'}
          </ul>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#70C5D7]/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-[#005482]/70">
                    <FaDollarSign className="w-4 h-4" />
                    <span>${tutor.hourlyRate || '0'}/hour</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#005482]/70">
                    <FaUniversity className="w-4 h-4" />
                    <span>{tutor.teachingMode || 'Teaching mode not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#005482]/70">
                    <FaGraduationCap className="w-4 h-4" />
                    <span>{tutor.institution || 'Institution not specified'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Student Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-[#70C5D7]/20"
            >
              <h2 className="text-xl font-bold text-[#005482] mb-4 flex items-center gap-2">
                <FaStar />
                Student Reviews
              </h2>
            {ratings.length > 0 ? (
                <div className="space-y-4">
                  {ratings.map((rating, index) => (
                    <div key={index} className="border-b border-[#70C5D7]/20 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating.rating ? 'text-[#FCBB45]' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-[#005482]/60">
                          by {rating.studentEmail}
                        </span>
                      </div>
                      <p className="text-[#005482]/70">{rating.comment}</p>
                    </div>
                  ))}
                </div>
            ) : (
                <p className="text-[#005482]/60 text-center py-8">No reviews yet</p>
              )}
            </motion.div>
          </div>

          {/* Right Column - Contact and Quick Actions */}
          <div className="space-y-8">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-[#70C5D7]/20"
            >
              <h2 className="text-xl font-bold text-[#005482] mb-4">Contact Tutor</h2>
              <a
                href={`mailto:${tutor.email}`}
                className="w-full bg-[#DA3A60] text-white py-3 px-6 rounded-xl hover:bg-[#DA3A60]/90 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <FaEnvelope />
                Mail
              </a>
              <a
                href={`https://wa.me/${tutor.contactNumber?.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border-2 border-[#FCBB45] bg-[#FCBB45] text-white py-3 px-6 rounded-xl hover:bg-[#FCBB45]/90 hover:border-[#FCBB45]/90 transition-colors flex items-center justify-center gap-2"
              >
                <FaPhone />
                Contact
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
