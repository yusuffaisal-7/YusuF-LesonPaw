import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBook, FaUser, FaSearch, FaClock, FaTag, FaChevronRight, FaCalendarAlt, FaArrowRight, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import { useLanguage } from '../../providers/LanguageProvider';

const BlogHeader = ({ searchTerm, setSearchTerm }) => {
  const { translate } = useLanguage();
  
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#005482] to-[#70C5D7]/30">
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23FFFFFF' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      <div className="relative py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Content */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">{translate('discoverKnowledge')} </span>
                <span className="text-[#FCBB45]">{translate('insights')}</span>
              </h1>
              <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                {translate('blogDescription')}
              </p>
            </motion.div>
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={translate('searchBlogsPlaceholder')}
                className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all pr-14"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all duration-300">
                <FaSearch className="text-xl" />
              </button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="text-white/60 text-sm">{translate('popular')}:</span>
              {[
                translate('teachingTips'),
                translate('studyGuides'),
                translate('learningResources'),
                translate('studentSuccess')
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1 rounded-full text-sm border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute left-0 bottom-0 w-32 h-32 bg-gradient-to-tr from-[#FCBB45]/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#DA3A60]/20 to-transparent rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  const { translate } = useLanguage();
  
  return (
    <div className="flex items-center justify-start gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-4 px-4 scrollbar-hide">
      <button
        onClick={() => onCategoryChange('all')}
        className={`whitespace-nowrap px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-all ${
          activeCategory === 'all'
            ? 'bg-gradient-to-r from-[#005482] to-[#70C5D7] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-[#70C5D7]/10'
        }`}
      >
        {translate('allCategories')}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`whitespace-nowrap px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-all ${
            activeCategory === category
              ? 'bg-gradient-to-r from-[#005482] to-[#70C5D7] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-[#70C5D7]/10'
          }`}
        >
          {translate(category.toLowerCase()) || category}
        </button>
      ))}
    </div>
  );
};

const FeaturedPost = ({ post }) => {
  const { translate } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg mb-8 sm:mb-12 aspect-[16/10] sm:aspect-[16/9]"
    >
      <img
        src={post.imageURL || 'https://placehold.co/1200x675?text=Featured+Post'}
        alt={post.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#005482]/90 via-black/50 to-transparent flex items-end">
        <div className="p-4 sm:p-8 w-full">
          <div className="flex items-center gap-2 sm:gap-4 text-white/80 mb-3 sm:mb-4 text-sm">
            <span className="bg-gradient-to-r from-[#DA3A60] to-[#70C5D7] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
              {translate(post.category?.toLowerCase()) || post.category}
            </span>
            <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <FaCalendarAlt className="text-xs sm:text-sm" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4 group-hover:text-[#FCBB45] transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-white/90 mb-4 sm:mb-6 line-clamp-2 text-sm sm:text-base">{post.excerpt}</p>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 text-[#70C5D7] hover:text-[#FCBB45] transition-colors text-sm sm:text-base"
            aria-label={`${translate('readMore')} - ${post.title}`}
          >
            {translate('readMore')} <FaChevronRight className="text-xs sm:text-sm" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const sundarbansBlogContent = {
  title: "Exploring the Sundarbans: A Natural Wonder",
  category: "Travel & Adventure",
  imageURL: "https://images.unsplash.com/photo-1630741158890-01d3599db0cb?q=80&w=1000&auto=format&fit=crop",
  content: `The Sundarbans, a UNESCO World Heritage site, stands as the world's largest mangrove forest, spanning across the coastal regions of Bangladesh and India. This magnificent ecosystem is a testament to nature's resilience and diversity.

Located at the delta of the Ganges, Brahmaputra, and Meghna rivers, the Sundarbans covers an area of approximately 10,000 square kilometers. The name "Sundarbans" comes from the Sundari trees that are found in abundance in this region.

Wildlife and Biodiversity:
The Sundarbans is home to the majestic Bengal Tiger, making it one of the largest tiger habitats in the world. These tigers have uniquely adapted to the mangrove environment, being excellent swimmers in the brackish waters. Besides tigers, the forest hosts an incredible variety of wildlife including spotted deer, wild boars, rhesus macaques, and estuarine crocodiles.

The Unique Ecosystem:
The mangrove ecosystem of the Sundarbans plays a crucial role in protecting the coastline from erosion and cyclones. The intricate root systems of the mangroves not only provide stability to the land but also serve as nurseries for numerous marine species. The forest's ability to thrive in saltwater conditions makes it a unique and vital ecosystem.

Local Culture and Communities:
The local communities living around the Sundarbans have developed a deep connection with the forest. Traditional honey collectors, known as "Mawalis," brave the dangers of the forest to collect wild honey. Fishermen navigate the complex network of waterways, carrying forward centuries-old traditions while adapting to modern conservation needs.

Conservation Challenges:
Today, the Sundarbans faces numerous challenges including climate change, rising sea levels, and human encroachment. Conservation efforts are crucial to preserve this natural wonder for future generations. Various initiatives are underway to protect both the ecosystem and the communities that depend on it.

Visiting the Sundarbans:
For those seeking adventure and natural beauty, the Sundarbans offers unique experiences through boat safaris, wildlife watching, and cultural interactions. The best time to visit is between November and February when the weather is pleasant and wildlife sightings are more frequent.`,
  createdAt: "2024-03-20T10:00:00.000Z",
  readTime: "5 min read",
  tags: ["Sundarbans", "Nature", "Wildlife", "Travel", "Bangladesh", "Conservation"],
  author: "Nature Explorer",
  excerpt: "Discover the world's largest mangrove forest, home to the Royal Bengal Tiger and a unique ecosystem that showcases nature's incredible diversity and resilience."
};

const BlogModal = ({ post, isOpen, onClose }) => {
  const { translate } = useLanguage();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
          style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
        >
          <div className="min-h-screen px-4 flex items-start justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full my-8 relative"
              style={{ marginTop: '2rem' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <FaTimes className="text-xl text-gray-600 hover:text-[#DA3A60]" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 sm:mb-8">
                  <img
                    src={post.imageURL || 'https://placehold.co/1200x675?text=Blog+Post'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                  <span className="bg-gradient-to-r from-[#DA3A60] to-[#70C5D7] text-white px-3 py-1.5 rounded-full text-sm">
                    {translate(post.category?.toLowerCase()) || post.category}
                  </span>
                  <span className="flex items-center gap-2 text-[#70C5D7] text-sm">
                    <FaCalendarAlt className="text-sm" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-2 text-gray-600 text-sm">
                      <FaClock />
                      {post.readTime}
                    </span>
                  )}
                  {post.author && (
                    <span className="flex items-center gap-2 text-gray-600 text-sm">
                      <FaUser />
                      {post.author}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005482] mb-6">
                  {post.title}
                </h2>

                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed space-y-6">
                    {post.content?.split('\n\n').map((paragraph, index) => (
                      paragraph && (
                        <p key={index} className="text-base sm:text-lg">
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-[#005482] mb-4">{translate('relatedTopics')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-[#70C5D7]/10 text-[#005482] rounded-full text-sm hover:bg-[#70C5D7]/20 transition-colors cursor-pointer"
                          >
                            #{translate(tag.toLowerCase()) || tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BlogCard = ({ post, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { translate } = useLanguage();
  const isSundarbans = post.title === "Exploring the Sundarbans: A Natural Wonder";
  const blogContent = isSundarbans ? sundarbansBlogContent : post;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
      >
        <div className="relative aspect-[16/10] sm:aspect-video overflow-hidden">
          <img
            src={blogContent.imageURL || 'https://placehold.co/600x400?text=Blog+Post'}
            alt={blogContent.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className="bg-gradient-to-r from-[#DA3A60] to-[#70C5D7] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
              {translate(blogContent.category?.toLowerCase()) || blogContent.category}
            </span>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#005482] transition-colors line-clamp-2">
            {blogContent.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
            {blogContent.excerpt || blogContent.content}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2 text-[#70C5D7] text-xs sm:text-sm">
              <FaCalendarAlt className="text-xs sm:text-sm" />
              <span>{new Date(blogContent.createdAt).toLocaleDateString()}</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 text-[#005482] hover:text-[#70C5D7] transition-colors text-xs sm:text-sm font-medium"
            >
              {translate('readMore')} <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </motion.article>

      <BlogModal
        post={blogContent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

const RecentPosts = ({ posts }) => {
  const { translate } = useLanguage();
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-[#70C5D7]/10">
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#005482]">{translate('recentPosts')}</h3>
      <div className="space-y-4 sm:space-y-6">
        {posts.slice(0, 3).map((post, index) => (
          <div key={index} className="flex items-start gap-3 sm:gap-4 group cursor-pointer hover:bg-[#70C5D7]/5 rounded-xl p-2 transition-colors">
            <img
              src={post.imageURL || 'https://placehold.co/100x100?text=Recent'}
              alt={post.title}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
            />
            <div>
              <span className="text-xs sm:text-sm text-[#70C5D7] mb-1 block">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <h4 className="font-medium text-sm sm:text-base text-gray-900 group-hover:text-[#005482] transition-colors line-clamp-2">
                {post.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Blog = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { translate } = useLanguage();

  // Fetch blogs with loading state
  const { data: blogPosts = [], isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blogs');
      return res.data;
    },
  });

  // Get unique categories
  const categories = [...new Set(blogPosts.map((post) => post.category))].filter(Boolean);

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      post.title?.toLowerCase().includes(searchLower) ||
      post.category?.toLowerCase().includes(searchLower) ||
      post.excerpt?.toLowerCase().includes(searchLower) ||
      post.content?.toLowerCase().includes(searchLower) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchLower));
    
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get featured post (most recent)
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;

  if (error) {
    toast.error(error.response?.data?.message || 'Failed to load blogs');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Blogs</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#70C5D7]/5 to-gray-50">
      <BlogHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {!isLoading && featuredPost && (
              <FeaturedPost post={featuredPost} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {isLoading
                ? Array(4).fill(0).map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 animate-pulse">
                      <div className="aspect-[16/10] sm:aspect-video bg-[#70C5D7]/10 rounded-xl sm:rounded-2xl mb-4"></div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="h-3 sm:h-4 bg-[#70C5D7]/10 rounded w-3/4"></div>
                        <div className="h-3 sm:h-4 bg-[#70C5D7]/10 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                : filteredPosts.slice(1).map((post, index) => (
                    <BlogCard key={post._id} post={post} index={index} />
                  ))}
            </div>

            {!isLoading && filteredPosts.length === 0 && (
              <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border border-[#70C5D7]/10">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#005482] mb-2 sm:mb-3">
                  {translate('noPostsFound')}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {translate('adjustSearchOrCategory')}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <RecentPosts posts={blogPosts} />
            
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-[#70C5D7]/10">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#005482]">
                {translate('tags')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'education',
                  'technology',
                  'learning',
                  'teaching',
                  'students',
                  'tips'
                ].map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#70C5D7]/10 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-[#005482] hover:text-white transition-colors cursor-pointer"
                  >
                    {translate(tag)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;