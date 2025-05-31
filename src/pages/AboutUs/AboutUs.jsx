import React, { useState } from 'react';
import { FaGraduationCap, FaUsers, FaChalkboardTeacher, FaGlobe, FaLinkedin, 
  FaTwitter, FaEnvelope, FaCheckCircle, FaStar, FaClock, FaShieldAlt, 
  FaHandshake, FaLightbulb, FaChartLine, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useLanguage } from '../../providers/LanguageProvider';

const SectionHeader = ({ title, subtitle, isDark = false }) => {
  const { translate } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <h2 className={`text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#005482] text-transparent bg-clip-text'
          }`}>
            {translate(title)}
          </h2>
          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 border-t-4 border-l-4 border-[#FCBB45] rounded-tl-lg"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-4 border-r-4 border-[#DA3A60] rounded-br-lg"></div>
        </div>
        {/* Animated Lines */}
        <div className="flex items-center gap-4 mt-6">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '3rem' }}
            viewport={{ once: true }}
            className={`h-1 ${isDark ? 'bg-[#FCBB45]' : 'bg-[#DA3A60]'}`}
          ></motion.div>
          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-[#005482]'}`}></div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '5rem' }}
            viewport={{ once: true }}
            className={`h-1 ${isDark ? 'bg-white' : 'bg-[#70C5D7]'}`}
          ></motion.div>
          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-[#005482]'}`}></div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '3rem' }}
            viewport={{ once: true }}
            className={`h-1 ${isDark ? 'bg-[#FCBB45]' : 'bg-[#DA3A60]'}`}
          ></motion.div>
        </div>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-xl mt-6 max-w-3xl mx-auto ${
              isDark ? 'text-white/80' : 'text-gray-600'
            }`}
          >
            {translate(subtitle)}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('students');
  const { translate } = useLanguage();

  const stats = [
    { number: 5000, label: translate('studentsHelped'), icon: <FaGraduationCap />, description: translate('successfulLearners') },
    { number: 200, label: translate('expertTutors'), icon: <FaChalkboardTeacher />, description: translate('qualifiedEducators') },
    { number: 15, label: translate('subjectsCovered'), icon: <FaGlobe />, description: translate('diverseTopics') },
    { number: 98, label: translate('successRate'), icon: <FaUsers />, suffix: '%', description: translate('satisfactionRate') }
  ];

  const milestones = [
    { year: '2023', title: 'Platform Launch', description: 'LessonPaw was founded with a vision to transform education in Haiti' },
    { year: '2023', title: 'First 1000 Students', description: 'Reached our first milestone of helping 1000 students' },
    { year: '2024', title: 'Mobile App Launch', description: 'Expanded our reach with a dedicated mobile application' },
    { year: '2024', title: 'National Recognition', description: 'Recognized as leading educational platform in Haiti' }
  ];

  const teamMembers = [
    {
      name: 'Jean Baptiste',
      role: 'Founder & CEO',
      image: 'https://example.com/placeholder.jpg',
      bio: 'Passionate about making education accessible to all Haitian students.',
      achievements: ['10+ years in EdTech', 'Harvard Business School Graduate', 'Education Innovation Award 2023'],
      social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
      name: 'Marie Claire',
      role: 'Head of Education',
      image: 'https://example.com/placeholder.jpg',
      bio: 'Expert in curriculum development with 10+ years of teaching experience.',
      achievements: ['Former University Professor', 'Published Education Author', 'National Teaching Excellence Award'],
      social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
      name: 'Pierre Paul',
      role: 'Technical Lead',
      image: 'https://example.com/placeholder.jpg',
      bio: 'Ensuring seamless learning experiences through technology.',
      achievements: ['15+ Years in Tech', 'MIT Computer Science', 'Multiple Tech Patents'],
      social: { linkedin: '#', twitter: '#', email: '#' }
    }
  ];

  const values = [
    { icon: <FaHandshake />, title: translate('integrity'), description: translate('integrityDesc') },
    { icon: <FaLightbulb />, title: translate('innovation'), description: translate('innovationDesc') },
    { icon: <FaChartLine />, title: translate('growth'), description: translate('growthDesc') },
    { icon: <FaAward />, title: translate('excellence'), description: translate('excellenceDesc') }
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7]">
          <div className="absolute inset-0 bg-[url('/path-to-pattern.png')] opacity-10"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold text-white mb-6 leading-tight"
          >
            {translate('transformingEducation')}<br />{translate('inHaiti')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-white/90 max-w-3xl mx-auto mb-12"
          >
            {translate('buildingBridges')}
          </motion.p>
          
          {/* Animated Stats with Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-[#FCBB45] text-4xl mb-4">{stat.icon}</div>
                <div className="text-white text-4xl font-bold mb-2">
                  <CountUp end={stat.number} duration={2.5} suffix={stat.suffix || ''} />
                </div>
                <div className="text-white/90 font-medium mb-2">{stat.label}</div>
                <div className="text-white/70 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Vision & Mission with Interactive Tabs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="ourPurpose"
            subtitle="empoweringEducation"
          />

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-[#005482] p-1">
              <button
                onClick={() => setActiveTab('students')}
                className={`px-6 py-3 rounded-md transition-colors ${
                  activeTab === 'students'
                    ? 'bg-[#005482] text-white'
                    : 'text-[#005482] hover:bg-[#005482]/10'
                }`}
              >
                {translate('forStudents')}
              </button>
              <button
                onClick={() => setActiveTab('tutors')}
                className={`px-6 py-3 rounded-md transition-colors ${
                  activeTab === 'tutors'
                    ? 'bg-[#005482] text-white'
                    : 'text-[#005482] hover:bg-[#005482]/10'
                }`}
              >
                {translate('forTutors')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {activeTab === 'students' ? (
              <>
                <div className="bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-2xl p-8">
                  <h3 className="text-4xl font-bold text-white mb-8">{translate('forStudents')}</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1">
                        <FaCheckCircle className="text-white w-6 h-6" />
                      </div>
                      <span className="text-white text-xl">{translate('accessToTutors')}</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1">
                        <FaCheckCircle className="text-white w-6 h-6" />
                      </div>
                      <span className="text-white text-xl">{translate('flexibleScheduling')}</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1">
                        <FaCheckCircle className="text-white w-6 h-6" />
                      </div>
                      <span className="text-white text-xl">{translate('personalizedLearning')}</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1">
                        <FaCheckCircle className="text-white w-6 h-6" />
                      </div>
                      <span className="text-white text-xl">{translate('progressTracking')}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <img 
                    src="https://example.com/student-image.jpg" 
                    alt="Student Learning"
                    className="rounded-2xl shadow-xl max-w-md w-full"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <img 
                    src="https://example.com/tutor-image.jpg" 
                    alt="Tutor Teaching"
                    className="rounded-2xl shadow-xl max-w-md w-full"
                  />
                </div>
                <div className="bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-2xl p-8">
                  <h3 className="text-4xl font-bold text-white mb-8">{translate('forTutors')}</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1">
                        <FaCheckCircle className="text-white w-6 h-6" />
                      </div>
                      <span className="text-white text-xl">{translate('buildProfile')}</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1">
                        <FaCheckCircle className="text-white w-6 h-6" />
                      </div>
                      <span className="text-white text-xl">{translate('setSchedule')}</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1">
                        <FaCheckCircle className="text-white w-6 h-6" />
                      </div>
                      <span className="text-white text-xl">{translate('teachingResources')}</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1">
                        <FaCheckCircle className="text-white w-6 h-6" />
                      </div>
                      <span className="text-white text-xl">{translate('securePayment')}</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Journey" 
            subtitle="Milestones that shaped our path to educational excellence"
          />

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#70C5D7]"></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="w-1/2 pr-8 text-right">
                    <div className={`${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}>
                      <h3 className="text-2xl font-bold text-[#005482] mb-2">{milestone.year}</h3>
                      <h4 className="text-xl text-[#DA3A60] mb-2">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <div className="absolute w-4 h-4 bg-[#FCBB45] rounded-full"></div>
                  </div>
                  <div className="w-1/2 pl-8"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#005482]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="ourValues"
            subtitle="principlesGuide"
            isDark={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 text-center hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-[#FCBB45] text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#005482] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Meet Our Team" 
            subtitle="Our dedicated team of professionals working to make quality education accessible to all"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-[#FCBB45]">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#005482] mb-2">Achievements:</h4>
                    <ul className="space-y-2">
                      {member.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <FaStar className="text-[#FCBB45]" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
                    <a href={member.social.linkedin} className="text-[#005482] hover:text-[#DA3A60] transition-colors">
                      <FaLinkedin size={24} />
                    </a>
                    <a href={member.social.twitter} className="text-[#005482] hover:text-[#DA3A60] transition-colors">
                      <FaTwitter size={24} />
                    </a>
                    <a href={member.social.email} className="text-[#005482] hover:text-[#DA3A60] transition-colors">
                      <FaEnvelope size={24} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="trustAndSecurity"
            subtitle="yourSafety"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-[#FCBB45] text-2xl">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#005482] mb-2">{translate('verifiedTutors')}</h3>
                    <p className="text-gray-600">{translate('tutorsVerified')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-[#FCBB45] text-2xl">
                    <FaClock />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#005482] mb-2">{translate('support247')}</h3>
                    <p className="text-gray-600">{translate('supportAvailable')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-[#FCBB45] text-2xl">
                    <FaHandshake />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#005482] mb-2">{translate('satisfactionGuarantee')}</h3>
                    <p className="text-gray-600">{translate('qualityEducation')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7] rounded-xl transform rotate-3"></div>
              <img
                src="https://example.com/security-image.jpg"
                alt="Trust & Security"
                className="relative rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call-to-Action */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7]">
          <div className="absolute inset-0 bg-[url('/path-to-pattern.png')] opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">{translate('readyToTransform')}</h2>
            <p className="text-xl text-white/90 mb-8">
              {translate('joinThousands')}
            </p>
            <div className="flex justify-center">
              <a
                href="/register"
                className="inline-block bg-[#DA3A60] text-white px-12 py-4 rounded-xl font-medium hover:bg-[#DA3A60]/90 transition-colors text-lg"
              >
                {translate('getStarted')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;