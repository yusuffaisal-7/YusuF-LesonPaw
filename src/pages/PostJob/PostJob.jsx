import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaGraduationCap, FaMoneyBillWave, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const PostJob = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => axiosSecure.post('/jobs', data),
    onSuccess: () => {
      Swal.fire('Success', 'Job posted successfully!', 'success');
      reset();
      navigate('/dashboard');
    },
    onError: (error) => {
      if (error.response?.status === 402) {
        Swal.fire({
          title: 'Payment Required',
          text: 'You have posted 3 jobs. Please pay a $10 fee to continue.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Pay $10',
        });
      } else {
        Swal.fire('Error', error.response?.data?.message || 'Failed to post job', 'error');
      }
    },
  });

  const onSubmit = (data) => {
    const jobData = {
      ...data,
      email: user?.email,
      postedAt: new Date(),
    };
    mutation.mutate(jobData);
  };

  return (
    <div className="min-h-screen bg-[#F8FBFF] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-[#DA3A60]/10 rounded-xl">
              <FaChalkboardTeacher className="text-[#DA3A60] text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#005482]">Post a Teaching Job</h2>
          </div>
          <p className="text-[#70C5D7] text-lg">Fill out the details below to find your perfect tutor</p>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Subject and Grade Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">
                  Subject
                </label>
                <div className="relative">
                  <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <select
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.subject && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.subject.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">
                  Grade Level
                </label>
                <div className="relative">
                  <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <select
                    {...register('gradeLevel', { required: 'Grade level is required' })}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  >
                    <option value="">Select grade/level</option>
                    <option value="Grade 1-5">Grade 1-5</option>
                    <option value="Grade 6-8">Grade 6-8</option>
                    <option value="Grade 9-12">Grade 9-12</option>
                    <option value="College">College</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.gradeLevel && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.gradeLevel.message}</span>}
              </div>
            </div>

            {/* Topics and Goals */}
            <div>
              <label className="block text-sm font-medium text-[#005482] mb-2">
                Topics or Goals
              </label>
              <textarea
                {...register('topicsGoals', { required: 'Topics or goals are required' })}
                rows="4"
                className="w-full px-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                placeholder="Describe the specific topics you need help with or your learning goals"
              />
              {errors.topicsGoals && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.topicsGoals.message}</span>}
            </div>

            {/* Learning Mode */}
            <div className="bg-[#70C5D7]/10 p-6 rounded-xl">
              <label className="block text-sm font-medium text-[#005482] mb-4">
                Preferred Mode of Learning
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer border border-[#70C5D7]/20 hover:border-[#70C5D7] transition-colors">
                  <input
                    type="radio"
                    {...register('modeOfLearning', { required: 'Mode of learning is required' })}
                    value="Online"
                    className="mr-2"
                  />
                  <span className="text-[#005482]">Online</span>
                </label>
                <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer border border-[#70C5D7]/20 hover:border-[#70C5D7] transition-colors">
                  <input
                    type="radio"
                    {...register('modeOfLearning')}
                    value="Offline"
                    className="mr-2"
                  />
                  <span className="text-[#005482]">Offline</span>
                </label>
                <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer border border-[#70C5D7]/20 hover:border-[#70C5D7] transition-colors">
                  <input
                    type="radio"
                    {...register('modeOfLearning')}
                    value="Either"
                    className="mr-2"
                  />
                  <span className="text-[#005482]">Either</span>
                </label>
              </div>
              {errors.modeOfLearning && <span className="text-[#DA3A60] text-sm mt-2 block">{errors.modeOfLearning.message}</span>}
            </div>

            {/* Schedule and Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">
                  Sessions per Week
                </label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <select
                    {...register('sessionsPerWeek', { required: 'Sessions per week are required' })}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  >
                    <option value="">Select number</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                  </select>
                </div>
                {errors.sessionsPerWeek && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.sessionsPerWeek.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">
                  Budget (per hour)
                </label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <input
                    type="number"
                    {...register('budget')}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
            </div>

            {/* Availability and Start Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">
                  Preferred Start Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <input
                    type="date"
                    {...register('startDate')}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">
                  Open to Negotiation
                </label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <select
                    {...register('openToNegotiation', { required: 'Negotiation preference is required' })}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {errors.openToNegotiation && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.openToNegotiation.message}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full bg-[#DA3A60] text-white py-4 rounded-xl hover:bg-[#c43255] transition-colors duration-200 font-medium flex items-center justify-center gap-2"
              >
                {mutation.isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </>
                ) : (
                  'Post Job'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PostJob;


