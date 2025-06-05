import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBook, FaUser, FaSearch, FaClock, FaTag, FaChevronRight, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';

const BlogHeader = ({ searchTerm, setSearchTerm }) => (
  <div className="text-center py-8 sm:py-12 px-4 bg-gradient-to-b from-[#70C5D7]/10 to-transparent">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
      <span className="text-[#005482]">LessonPaw</span>
      <span className="text-[#DA3A60]"> Blog</span>
    </h1>
    <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
      Explore educational insights, teaching tips, and learning resources. Stay updated with the latest trends in education and discover effective teaching methodologies from our expert community.
    </p>
    <div className="relative max-w-2xl mx-auto mt-6 sm:mt-8 px-4 sm:px-0">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search articles by title, category, or content"
        className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent text-sm sm:text-base"
      />
      <button className="absolute right-6 sm:right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#005482] to-[#70C5D7] text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full hover:opacity-90 transition-all">
        <FaSearch className="text-base sm:text-lg" />
      </button>
    </div>
  </div>
);

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex items-center justify-start gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-4 px-4 scrollbar-hide">
    <button
      onClick={() => onCategoryChange('all')}
      className={`whitespace-nowrap px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-all ${
        activeCategory === 'all'
          ? 'bg-gradient-to-r from-[#005482] to-[#70C5D7] text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-[#70C5D7]/10'
      }`}
    >
      All Categories
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
        {category}
      </button>
    ))}
  </div>
);

const FeaturedPost = ({ post }) => (
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
            {post.category || 'TV Tips'}
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
        <button className="flex items-center gap-1 sm:gap-2 text-[#70C5D7] hover:text-[#FCBB45] transition-colors text-sm sm:text-base">
          Read More <FaChevronRight className="text-xs sm:text-sm" />
        </button>
      </div>
    </div>
  </motion.div>
);

const BlogCard = ({ post, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
  >
    <div className="relative aspect-[16/10] sm:aspect-video overflow-hidden">
      <img
        src={post.imageURL || 'https://placehold.co/600x400?text=Blog+Post'}
        alt={post.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
        <span className="bg-gradient-to-r from-[#DA3A60] to-[#70C5D7] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
          {post.category || 'AC Servicing'}
        </span>
      </div>
    </div>
    
    <div className="p-4 sm:p-6">
      <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#005482] transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">{post.excerpt || post.content}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2 text-[#70C5D7] text-xs sm:text-sm">
          <FaCalendarAlt className="text-xs sm:text-sm" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <button className="flex items-center gap-1 text-[#005482] hover:text-[#70C5D7] transition-colors text-xs sm:text-sm font-medium">
          Read More <FaArrowRight className="text-xs" />
        </button>
      </div>
    </div>
  </motion.article>
);

const RecentPosts = ({ posts }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-[#70C5D7]/10">
    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#005482]">Recent Posts</h3>
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

const Blog = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch blogs with loading state
  const { data: blogPosts = [], isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blogs');
      return res.data;
    },
  });

  // Get unique categories and sort them alphabetically
  const categories = [...new Set(blogPosts.map((post) => post.category))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get featured posts (3 most recent)
  const featuredPosts = blogPosts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (error) {
    toast.error('Failed to load blogs. Please try again later.');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Blogs</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
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

        {/* Featured Posts Section */}
        {!isLoading && featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredPosts.map((post, index) => (
              <FeaturedPost key={post._id} post={post} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                : filteredPosts.map((post, index) => (
                    <BlogCard key={post._id} post={post} index={index} />
                  ))}
            </div>

            {!isLoading && filteredPosts.length === 0 && (
              <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border border-[#70C5D7]/10">
                <FaBook className="mx-auto text-4xl text-[#70C5D7] mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold text-[#005482] mb-2 sm:mb-3">No Posts Found</h3>
                <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <RecentPosts posts={blogPosts} />
            
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-[#70C5D7]/10">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#005482]">Popular Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                      activeCategory === category
                        ? 'bg-[#005482] text-white'
                        : 'text-gray-700 hover:bg-[#70C5D7]/10'
                    }`}
                  >
                    {category}
                  </button>
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