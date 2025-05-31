import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaGraduationCap, FaBook, FaGlobe, FaUserClock, FaChalkboardTeacher } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { useLanguage } from '../../../providers/LanguageProvider';

const TeacherCard = ({ tutor, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1 cursor-pointer w-full mx-auto flex flex-col h-full"
      onClick={onClick}
    >
      {/* Header with Photo and Basic Info */}
      <div className="relative bg-[#70C5D7] bg-opacity-10 px-6 pt-8 pb-6">
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Available
          </span>
        </div>

        {/* Profile Photo */}
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
            <img
              src={tutor.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
              alt={tutor.name}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=Tutor')}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{tutor.name}</h3>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < Math.floor(tutor.rating || 4.5) ? 'text-yellow-400' : 'text-gray-300'}
                  size={14}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">{tutor.rating || '4.5'}/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-6 py-6 space-y-5 flex-1">
        {/* Education and Subjects */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FaGraduationCap className="text-[#005482] mt-1 flex-shrink-0" size={16} />
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Education</h4>
                <p className="text-sm text-gray-800 font-medium">
                  {tutor.educationalQualifications || 'BSc in Mathematics, NSU'}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaUserClock className="text-[#005482] mt-1 flex-shrink-0" size={16} />
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Experience</h4>
                <p className="text-sm text-gray-800 font-medium">{tutor.experience}+ Years</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FaBook className="text-[#005482] mt-1 flex-shrink-0" size={16} />
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Subjects</h4>
                <p className="text-sm text-gray-800 font-medium">
                  {tutor.subjects?.join(', ') || 'Mathematics, Physics'}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaChalkboardTeacher className="text-[#005482] mt-1 flex-shrink-0" size={16} />
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Mode</h4>
                <p className="text-sm text-gray-800 font-medium">{tutor.teachingMode || 'Online & In-person'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="flex items-start space-x-3 pt-2 border-t border-gray-100">
          <FaGlobe className="text-[#005482] mt-1 flex-shrink-0" size={16} />
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Languages</h4>
            <p className="text-sm text-gray-800 font-medium">
              {tutor.languages?.join(', ') || 'English, +2 more'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6 mt-auto">
        <button 
          className="w-full bg-[#DA3A60] text-white py-3 rounded-lg hover:bg-[#c43255] transition-colors duration-300 font-medium flex items-center justify-center gap-2"
        >
          View Full Profile
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Teacher = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const { data: tutors = [], isLoading, error } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tutors');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#DA3A60]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error: {error.message}
      </div>
    );
  }

  const displayedTutors = tutors.slice(0, 6);

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="w-full px-4">
        <div className="text-center mb-16 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#70C5D7] opacity-10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#DA3A60] opacity-5 rounded-full blur-2xl"></div>
          
          {/* Main heading with gradient and animation */}
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text transform hover:scale-105 transition-transform duration-300 inline-block">
              {translate('meetExperts')}
            </h2>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-10 bg-[#DA3A60] rounded-full"></div>
              <div className="h-1 w-20 bg-[#70C5D7] rounded-full"></div>
              <div className="h-1 w-10 bg-[#DA3A60] rounded-full"></div>
            </div>
          </div>

          {/* Subheading with animation */}
          <div className="relative group cursor-default">
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed group-hover:text-[#005482] transition-colors duration-300">
              {translate('teacherDesc')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-[1920px] mx-auto">
          {displayedTutors.map((tutor) => (
            <TeacherCard
              key={tutor._id}
              tutor={tutor}
              onClick={() => navigate(`/tutor/${tutor._id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teacher;

