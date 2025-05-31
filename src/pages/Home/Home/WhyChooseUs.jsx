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
    <div className="w-full py-16 bg-[#005482]">
      <div className="w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6 tracking-normal leading-tight">
            <span className="text-white">
              Why Choose{' '}
            </span>
            <span className="text-[#FCBB45]">LessonPaw</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            {translate('committedToEducation')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-4 md:px-8 lg:px-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 transform hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4 md:px-8 lg:px-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="text-3xl font-bold text-[#FCBB45] mb-2">
                {stat.value}
              </div>
              <div className="text-white/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-[#DA3A60] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Join Our Community
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs; 