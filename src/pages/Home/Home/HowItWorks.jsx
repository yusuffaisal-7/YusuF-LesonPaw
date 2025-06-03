import React from 'react';
import { FaSearch, FaCalendarAlt, FaBook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../providers/LanguageProvider';

const HowItWorks = () => {
  const { translate } = useLanguage();

  const steps = [
    {
      icon: <FaSearch className="text-[#DA3A60] text-4xl" />,
      title: translate('searchTeacher'),
      description: translate('searchTeacherDesc'),
      number: 1,
      bgAccent: "bg-red-50"
    },
    {
      icon: <FaCalendarAlt className="text-[#FCBB45] text-4xl" />,
      title: translate('connect'),
      description: translate('connectDesc'),
      number: 2,
      bgAccent: "bg-yellow-50"
    },
    {
      icon: <FaBook className="text-[#70C5D7] text-4xl" />,
      title: translate('learn'),
      description: translate('learnDesc'),
      number: 3,
      bgAccent: "bg-blue-50"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text tracking-normal leading-tight"
          >
            {translate('howItWorks')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed group px-4"
          >
            {translate('platformDesc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className={`p-6 sm:p-8 rounded-2xl ${step.bgAccent} transition-all duration-300 hover:shadow-lg`}>
                <span className="absolute top-4 right-4 text-3xl sm:text-4xl font-bold text-gray-200">
                  {step.number}
                </span>
                
                <div className="mb-4 sm:mb-6 relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center shadow-md">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
            {translate('readyToStart')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link 
              to="/find-teacher"
              className="inline-block w-full sm:w-auto sm:min-w-[180px] px-6 py-3 bg-[#DA3A60] text-white rounded-lg hover:bg-[#c43255] transition-all duration-300 text-center whitespace-nowrap transform hover:scale-105"
            >
              {translate('findTeacher')}
            </Link>
            <Link 
              to="/become-teacher"
              className="inline-block w-full sm:w-auto sm:min-w-[180px] px-6 py-3 bg-[#005482] text-white rounded-lg hover:bg-[#004368] transition-all duration-300 text-center whitespace-nowrap transform hover:scale-105"
            >
              {translate('becomeTeacher')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 