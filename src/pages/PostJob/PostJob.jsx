import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      navigate('/services');
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#005482]">Post a Teaching Job</h2>
          <p className="mt-2 text-gray-600">Fill out the details below to find your perfect tutor</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Subject Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">
                  Subject
                </label>
                <select
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                >
                  <option value="">Select a subject</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && <span className="text-[#DA3A60] text-sm mt-1">{errors.subject.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">
                  Grade Level
                </label>
                <select
                  {...register('gradeLevel', { required: 'Grade level is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                >
                  <option value="">Select grade/level</option>
                  <option value="Grade 1-5">Grade 1-5</option>
                  <option value="Grade 6-8">Grade 6-8</option>
                  <option value="Grade 9-12">Grade 9-12</option>
                  <option value="College">College</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gradeLevel && <span className="text-[#DA3A60] text-sm mt-1">{errors.gradeLevel.message}</span>}
              </div>
            </div>

            {/* Topics and Goals */}
            <div>
              <label className="block text-sm font-medium text-[#005482] mb-1">
                Topics or Goals
              </label>
              <textarea
                {...register('topicsGoals', { required: 'Topics or goals are required' })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                placeholder="Describe the specific topics you need help with or your learning goals"
              />
              {errors.topicsGoals && <span className="text-[#DA3A60] text-sm mt-1">{errors.topicsGoals.message}</span>}
            </div>

            {/* Learning Mode and Location */}
            <div className="bg-[#70C5D7] bg-opacity-10 p-6 rounded-lg">
              <label className="block text-sm font-medium text-[#005482] mb-3">
                Preferred Mode of Learning
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('modeOfLearning', { required: 'Mode of learning is required' })}
                    value="Online"
                    className="mr-2"
                  />
                  <span>Online</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('modeOfLearning')}
                    value="Offline"
                    className="mr-2"
                  />
                  <span>Offline</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('modeOfLearning')}
                    value="Either"
                    className="mr-2"
                  />
                  <span>Either</span>
                </label>
              </div>
              {errors.modeOfLearning && <span className="text-[#DA3A60] text-sm mt-1">{errors.modeOfLearning.message}</span>}
            </div>

            {/* Schedule and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">
                  Sessions per Week
                </label>
                <select
                  {...register('sessionsPerWeek', { required: 'Sessions per week are required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                >
                  <option value="">Select number</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
                {errors.sessionsPerWeek && <span className="text-[#DA3A60] text-sm mt-1">{errors.sessionsPerWeek.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">
                  Budget (per hour)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    {...register('budget')}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
            </div>

            {/* Availability and Start Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  {...register('startDate')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">
                  Open to Negotiation
                </label>
                <select
                  {...register('openToNegotiation', { required: 'Negotiation preference is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                >
                  <option value="">Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.openToNegotiation && <span className="text-[#DA3A60] text-sm mt-1">{errors.openToNegotiation.message}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#DA3A60] text-white py-3 px-6 rounded-md hover:bg-[#c43255] transition-colors duration-200 font-medium"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PostJob;


