import { FaEdit, FaTrash, FaQuoteLeft, FaUser, FaImage, FaCheck, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion, AnimatePresence } from 'framer-motion';

const ManageStoryCard = ({ story, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: story.name,
    quote: story.quote,
    details: story.details,
    imageURL: story.imageURL,
  });

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    try {
      await axiosSecure.delete(`/stories/${story._id}`);
      toast.success('Story deleted successfully');
      refetch();
    } catch (err) {
      toast.error('Failed to delete story');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.put(`/stories/${story._id}`, formData);
      toast.success('Story updated successfully');
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error('Failed to update story');
    }
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <motion.div 
      layout
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#70C5D7]/10 hover:shadow-md transition-all duration-300 h-[500px]"
    >
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
          >
            <div className="relative h-48 bg-[#70C5D7]/5">
              <img 
                src={story.imageURL} 
                alt={story.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#005482]/90 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-white text-xl mb-1">{story.name}</h3>
                <p className="text-white/80 text-sm line-clamp-1">{story.details}</p>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start gap-3 mb-6 flex-1">
                <div className="p-2 bg-[#FCBB45]/10 rounded-lg shrink-0">
                  <FaQuoteLeft className="text-[#FCBB45] text-xl" />
                </div>
                <div className="flex-1">
                  <motion.p 
                    className={`text-[#005482] italic text-lg leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}
                  >
                    "{story.quote}"
                  </motion.p>
                  {story.quote.length > 150 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-[#70C5D7] hover:text-[#005482] transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                      {isExpanded ? (
                        <>Show Less <FaChevronUp className="text-xs" /></>
                      ) : (
                        <>Read More <FaChevronDown className="text-xs" /></>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#70C5D7]/10">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-3 px-4 bg-[#70C5D7]/10 text-[#005482] rounded-xl hover:bg-[#70C5D7]/20 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                >
                  <FaEdit /> Edit Story
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 px-4 bg-[#DA3A60]/10 text-[#DA3A60] rounded-xl hover:bg-[#DA3A60]/20 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleEdit}
            className="p-6 space-y-6 h-full overflow-y-auto"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#70C5D7]/20 rounded-xl focus:outline-none focus:border-[#DA3A60] transition-colors"
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Image URL</label>
                <div className="flex gap-2 items-center">
                  <div className="p-2 bg-[#70C5D7]/10 rounded-xl">
                    <FaImage className="text-[#70C5D7]" />
                  </div>
                  <input
                    type="text"
                    value={formData.imageURL}
                    onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
                    className="flex-1 px-4 py-3 border-2 border-[#70C5D7]/20 rounded-xl focus:outline-none focus:border-[#DA3A60] transition-colors"
                    placeholder="Enter image URL"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Quote</label>
                <textarea
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#70C5D7]/20 rounded-xl focus:outline-none focus:border-[#DA3A60] transition-colors resize-none"
                  placeholder="Enter quote"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Details</label>
                <input
                  type="text"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#70C5D7]/20 rounded-xl focus:outline-none focus:border-[#DA3A60] transition-colors"
                  placeholder="Enter details"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#70C5D7]/10">
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-[#DA3A60] text-white rounded-xl hover:bg-[#DA3A60]/90 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
              >
                <FaCheck /> Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 px-4 bg-[#70C5D7]/10 text-[#005482] rounded-xl hover:bg-[#70C5D7]/20 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageStoryCard;
