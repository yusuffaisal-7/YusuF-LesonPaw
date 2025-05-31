import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaHeadset, FaComments, FaEnvelope } from 'react-icons/fa';

const Message = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return Swal.fire('Error', 'Please enter a message', 'error');
    }
    try {
      await axiosSecure.post('/send-message', { message, email: user?.email });
      setMessage('');
      Swal.fire('Sent', 'Message sent', 'success');
    } catch (error) {
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Failed to send message',
        'error'
      );
    }
  };

  const supportFeatures = [
    {
      icon: <FaHeadset className="text-4xl text-[#DA3A60]" />,
      title: "24/7 Support",
      description: "Our team is here to help you anytime"
    },
    {
      icon: <FaComments className="text-4xl text-[#70C5D7]" />,
      title: "Quick Response",
      description: "Quick action to your problem"
    },
    {
      icon: <FaEnvelope className="text-4xl text-[#FCBB45]" />,
      title: "Direct Contact",
      description: "Connect with our support team directly"
    }
  ];

  return (
    <div className="w-full bg-white py-20">
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Need Support? <span className="text-[#DA3A60]">We're Here to Help</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our dedicated support team for any questions or assistance you need
            </p>
          </motion.div>

          {/* Support Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form Section */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left side - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Have questions about our services or need assistance? Our support team is here to help you find the right tutor and make your learning journey successful.
                </p>
                <div className="space-y-6 mt-8">
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="w-12 h-12 bg-[#DA3A60] bg-opacity-10 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-[#DA3A60] text-xl" />
                    </div>
                    <span>support@lessonpaw.com</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="w-12 h-12 bg-[#DA3A60] bg-opacity-10 rounded-full flex items-center justify-center">
                      <FaHeadset className="text-[#DA3A60] text-xl" />
                    </div>
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Message Form or Login Prompt */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                {user ? (
                <form onSubmit={handleSendMessage} className="space-y-6">
                  <div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA3A60] focus:border-transparent resize-none"
                      placeholder="Write your message here..."
                      rows="6"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#DA3A60] text-white py-4 rounded-xl font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
                ) : (
                  <div className="text-center space-y-6">
                    <h4 className="text-xl font-semibold text-gray-900">Sign in to Send a Message</h4>
                    <p className="text-gray-600">Please log in to your account to send us a message.</p>
                    <Link
                      to="/login"
                      className="inline-block w-full bg-[#DA3A60] text-white py-4 rounded-xl font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;