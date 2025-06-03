import React from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import { FaGraduationCap, FaHandshake, FaLightbulb } from 'react-icons/fa';

const WhatIsLesonPaw = () => {
  const { translate } = useLanguage();

  const features = [
    {
      icon: <FaGraduationCap className="w-12 h-12 text-[#FCBB45]" />,
      title: translate('qualityEducation'),
      description: translate('qualityEducationDesc')
    },
    {
      icon: <FaHandshake className="w-12 h-12 text-[#005482]" />,
      title: translate('connecting'),
      description: translate('connectingDesc')
    },
    {
      icon: <FaLightbulb className="w-12 h-12 text-[#DA3A60]" />,
      title: translate('innovation'),
      description: translate('innovationDesc')
    }
  ];

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              {translate('whatIsLesonPaw')} <span className="text-[#FCBB45]">LesonPaw</span>?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              {translate('connectingStudents')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="mb-4 sm:mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              {translate('lesonPawMission')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLesonPaw; 