import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCheck, FaUsers, FaCheckCircle, FaMobileAlt } from 'react-icons/fa';
import { useLanguage } from '../../../providers/LanguageProvider';

const WhyChooseUs = () => {
  const { translate } = useLanguage();

  const features = [
    {
      icon: <FaUserCheck className="text-4xl text-[#DA3A60]" />,
      title: translate('verifiedTeachers'),
      description: translate('verifiedTeachersDesc')
    },
    {
      icon: <FaUsers className="text-4xl text-[#70C5D7]" />,
      title: translate('studentCount'),
      description: translate('studentCountDesc')
    },
    {
      icon: <FaCheckCircle className="text-4xl text-[#FCBB45]" />,
      title: translate('qualityGuarantee'),
      description: translate('qualityGuaranteeDesc')
    },
    {
      icon: <FaMobileAlt className="text-4xl text-[#DA3A60]" />,
      title: translate('safePayments'),
      description: translate('safePaymentsDesc')
    }
  ];

  const stats = [
    {
      value: "1,200+",
      label: translate('verifiedTeachers')
    },
    {
      value: "25,000+",
      label: translate('lessonsCompleted')
    },
    {
      value: "95%",
      label: translate('satisfactionRate')
    },
    {
      value: "32",
      label: translate('citiesInHaiti')
    }
  ];

  return (
    <div className="w-full py-10 sm:py-12 md:py-16 bg-[#005482]">
      <div className="w-full px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-normal leading-tight">
            <span className="text-white">
              Why Choose{' '}
            </span>
            <span className="text-[#FCBB45]">LessonPaw</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light px-4">
            {translate('committedToEducation')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <div className="mb-3 sm:mb-4">
                {React.cloneElement(feature.icon, {
                  className: `text-3xl sm:text-4xl ${feature.icon.props.className.split(' ').pop()}`
                })}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-white/70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#FCBB45] mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-white/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12 md:mt-16"
        >
          <button className="bg-[#DA3A60] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Join Our Community
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs; 