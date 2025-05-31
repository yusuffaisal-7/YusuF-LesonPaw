import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserCheck, FaCalendarCheck, FaComments, FaStar, FaGraduationCap, FaChalkboardTeacher, FaLaptop, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FindTeacherGuide = () => {
  const steps = [
    {
      icon: <FaSearch className="text-4xl text-[#DA3A60]" />,
      title: "Smart Search",
      description: "Our intelligent matching system helps you find the perfect teacher based on your learning goals, preferred subjects, and schedule.",
      image: "https://i.ibb.co/Kj3Kv8P/search-teacher.png",
      animation: { x: [-100, 0], opacity: [0, 1] }
    },
    {
      icon: <FaUserCheck className="text-4xl text-[#70C5D7]" />,
      title: "Expert Verification",
      description: "Every teacher undergoes a rigorous verification process. View detailed profiles with verified credentials, experience, and student reviews.",
      image: "https://i.ibb.co/0M3jqFj/review-profile.png",
      animation: { y: [100, 0], opacity: [0, 1] }
    },
    {
      icon: <FaCalendarCheck className="text-4xl text-[#FCBB45]" />,
      title: "Flexible Learning",
      description: "Choose between online or in-person sessions. Schedule lessons that fit your lifestyle with our easy-to-use booking system.",
      image: "https://i.ibb.co/XS8DpXR/schedule.png",
      animation: { x: [100, 0], opacity: [0, 1] }
    },
    {
      icon: <FaComments className="text-4xl text-[#DA3A60]" />,
      title: "Personalized Experience",
      description: "Enjoy customized learning plans, progress tracking, and continuous support throughout your educational journey.",
      image: "https://i.ibb.co/Kj8Tbzs/start-learning.png",
      animation: { y: [-100, 0], opacity: [0, 1] }
    }
  ];

  const features = [
    {
      icon: <FaChalkboardTeacher className="text-[#DA3A60]" />,
      title: "Expert Teachers",
      description: "Learn from certified professionals with proven track records"
    },
    {
      icon: <FaLaptop className="text-[#70C5D7]" />,
      title: "Modern Learning Tools",
      description: "Access cutting-edge educational resources and technology"
    },
    {
      icon: <FaUsers className="text-[#FCBB45]" />,
      title: "Community Support",
      description: "Join a vibrant learning community of students and educators"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7] opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#DA3A60] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#70C5D7] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-[#FCBB45] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-24 px-6"
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text">
                Find Your Perfect Teacher
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover expert educators who will guide you towards academic excellence and personal growth
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
            >
              <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-[#DA3A60] mb-2">500+</div>
                <div className="text-gray-600">Verified Teachers</div>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-[#70C5D7] mb-2">50+</div>
                <div className="text-gray-600">Subjects Offered</div>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-[#FCBB45] mb-2">98%</div>
                <div className="text-gray-600">Student Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Steps Section with Enhanced Visual Design */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-[#005482] to-[#70C5D7] text-transparent bg-clip-text"
        >
          Your Learning Journey Starts Here
        </motion.h2>
        
        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, ...step.animation }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
            >
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block p-4 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-xl mb-8">
                  {step.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">{step.title}</h3>
                <p className="text-xl text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#DA3A60] to-[#70C5D7] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="relative rounded-lg shadow-2xl w-full transform group-hover:scale-[1.02] transition duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Grid with Modern Design */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-20">Why Students Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7]"></div>
        <div className="relative max-w-4xl mx-auto text-center py-24 px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Join thousands of students who have found their perfect learning match and achieved their academic goals
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link 
              to="/signup"
              className="px-8 py-4 bg-[#DA3A60] text-white rounded-full text-lg font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Learning Today
            </Link>
            <Link 
              to="/about"
              className="px-8 py-4 bg-white text-[#005482] rounded-full text-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FindTeacherGuide; 