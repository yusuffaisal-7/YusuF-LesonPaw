import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ManageStoryCard from './ManageStoryCard';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus, FaBookOpen } from 'react-icons/fa';
import { useState } from 'react';

const ManageStories = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: stories = [], isLoading, refetch } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stories');
      return res.data;
    },
  });

  const filteredStories = stories.filter(story =>
    story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.quote.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DA3A60]"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FFFFFF] p-2 sm:p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2 sm:mb-3">
            <div className="p-2 sm:p-2.5 bg-[#FCBB45]/10 rounded-lg inline-flex">
              <FaBookOpen className="text-[#FCBB45] text-xl sm:text-2xl" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#005482]">
              Manage Success Stories
            </h2>
          </div>
          <p className="text-[#70C5D7] text-sm sm:text-base ml-0 sm:ml-12">
            Share and manage inspiring success stories from our community
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 md:p-6 mb-6 sm:mb-8 border border-[#70C5D7]/10"
        >
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stories by name or quote..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border-2 border-[#70C5D7]/20 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#DA3A60] transition-colors text-[#005482] text-sm sm:text-base"
              />
              <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#70C5D7] text-base sm:text-lg" />
            </div>
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
          {filteredStories.length > 0 ? (
            filteredStories.map((story, index) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full"
              >
                <ManageStoryCard story={story} refetch={refetch} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-8 sm:py-12 md:py-16"
            >
              <p className="text-[#005482] text-base sm:text-lg">No stories found matching your search.</p>
            </motion.div>
          )}
        </div>

        {/* Empty State */}
        {stories.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16 md:py-20 bg-[#70C5D7]/5 rounded-lg sm:rounded-xl mt-6 sm:mt-8"
          >
            <div className="max-w-md mx-auto px-4 sm:px-6">
              <div className="p-3 sm:p-4 bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-sm">
                <FaBookOpen className="text-[#FCBB45] text-xl sm:text-2xl" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#005482] mb-2 sm:mb-3">No Success Stories Yet</h3>
              <p className="text-sm sm:text-base text-gray-600">
                No success stories have been added to the system yet.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ManageStories;
