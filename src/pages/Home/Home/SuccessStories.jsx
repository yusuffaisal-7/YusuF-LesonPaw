import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowRight, FaTimes } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { useState } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';

const SuccessStories = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedStory, setSelectedStory] = useState(null);
  const { translate } = useLanguage();

  const { data: stories = [], isLoading, error } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      try {
        const response = await axiosPublic.get('/stories');
        return response.data;
      } catch (err) {
        console.error('Error fetching stories:', err);
        throw err;
      }
    },
  });

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const closeModal = () => {
    setSelectedStory(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#DA3A60]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">Failed to load success stories. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-24">
      <div className="w-full px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#70C5D7] opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#DA3A60] opacity-5 rounded-full blur-3xl"></div>
          
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text tracking-normal leading-tight">
              {translate('successStories')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {translate('successStoriesDesc')}
            </p>
            
            {/* Decorative Lines */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-1 w-16 bg-[#005482] rounded-full"></div>
              <div className="h-1 w-24 bg-[#70C5D7] rounded-full"></div>
              <div className="h-1 w-16 bg-[#DA3A60] rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Stories Grid */}
        {stories.length === 0 ? (
          <p className="text-center text-gray-600">{translate('noStories')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleStoryClick(story)}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.imageURL}
                    alt={`${story.name}'s story`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Content Container */}
                <div className="p-6 relative">
                  <div className="absolute -top-8 right-6 w-16 h-16 bg-[#DA3A60] rounded-full flex items-center justify-center shadow-lg">
                    <FaQuoteLeft className="text-white text-xl" />
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-[#FCBB45]" />
                    ))}
                  </div>

                  <p className="text-gray-700 text-lg italic mb-6 line-clamp-3">
                    "{story.quote}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{story.name}</h4>
                      <p className="text-sm text-gray-500">{story.details}</p>
                    </div>
                    
                    <button 
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#DA3A60] bg-opacity-10 text-[#DA3A60] hover:bg-opacity-20 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStoryClick(story);
                      }}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => {/* Handle view all click */}}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#DA3A60] text-white rounded-full font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {translate('viewAllStories')}
            <FaArrowRight />
          </button>
        </motion.div>

        {/* Preview Modal */}
        <AnimatePresence>
          {selectedStory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <div className="h-72 relative">
                    <img
                      src={selectedStory.imageURL}
                      alt={selectedStory.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="p-12">
                    <div className="flex items-center gap-2 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#FCBB45] text-2xl" />
                      ))}
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedStory.name}
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">{selectedStory.details}</p>

                    <div className="bg-gray-50 rounded-xl p-8 mb-8">
                      <FaQuoteLeft className="text-[#DA3A60] text-3xl mb-6" />
                      <p className="text-gray-700 text-xl italic leading-relaxed">
                        "{selectedStory.quote}"
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={closeModal}
                        className="px-8 py-4 bg-[#DA3A60] text-white rounded-full font-semibold hover:bg-[#c43255] transition-all duration-300"
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SuccessStories;