import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBook, FaUser, FaSearch, FaClock, FaTag, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BlogHeader = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative py-20 bg-gradient-to-r from-[#005482] to-[#70C5D7] overflow-hidden"
  >
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-white/20 rounded-tl-3xl"></div>
    <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-white/20 rounded-br-3xl"></div>
    
    <div className="relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-6xl font-bold text-white mb-6 relative">
          {title}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#FCBB45]"></div>
        </h1>
        
        <div className="flex items-center gap-4 mb-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-0.5 bg-[#DA3A60]"
          ></motion.div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-0.5 bg-[#DA3A60]"
          ></motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl text-white/90 max-w-3xl mx-auto px-4 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>

    {/* Background Decorative Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-full"></div>
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-white/5 rounded-full"></div>
    </div>
  </motion.div>
);

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex flex-wrap gap-3 justify-center mb-8">
    <button
      onClick={() => onCategoryChange('all')}
      className={`px-4 py-2 rounded-full transition-all ${
        activeCategory === 'all'
          ? 'bg-[#005482] text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      All Posts
    </button>
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`px-4 py-2 rounded-full transition-all ${
          activeCategory === category
            ? 'bg-[#005482] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
    className="relative group overflow-hidden rounded-2xl shadow-lg mb-12"
  >
    <div className="aspect-[16/9] overflow-hidden">
      <img
        src={post.imageURL || 'https://placehold.co/800x450?text=Featured+Post'}
        alt={post.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
      <div className="absolute bottom-0 p-8">
        <div className="flex items-center gap-4 text-white/80 mb-4">
          <span className="flex items-center gap-2">
            <FaUser className="text-sm" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-sm" />
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-[#FCBB45] transition-colors">
          {post.title}
        </h2>
        <p className="text-white/90 mb-6 line-clamp-2">{post.excerpt}</p>
        <button className="flex items-center gap-2 text-[#FCBB45] hover:text-white transition-colors">
          Read More <FaChevronRight className="text-sm" />
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
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div className="aspect-[16/9] overflow-hidden">
      <img
        src={post.imageURL || 'https://placehold.co/400x225?text=Blog+Post'}
        alt={post.title}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <span className="flex items-center gap-1">
          <FaClock className="text-[#DA3A60]" />
          {post.readTime}
        </span>
        <span className="flex items-center gap-1">
          <FaTag className="text-[#DA3A60]" />
          {post.category}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#005482] transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <FaUser className="text-gray-500" />
          </div>
          <span className="text-sm text-gray-700">{post.author}</span>
        </div>
        <button className="text-[#005482] hover:text-[#DA3A60] transition-colors flex items-center gap-1">
          Read More <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  </motion.article>
);

const Blog = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch blogs
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
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get featured post (most recent)
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );

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

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader
        title="LessonPaw Blog"
        subtitle="Discover insights, tips, and stories about education, tutoring, and personal growth"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles by title, category, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005482] focus:border-transparent"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Featured Post */}
        {!isLoading && featuredPost && <FeaturedPost post={featuredPost} />}

        {/* Category Filter */}
        {!isLoading && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)
            : filteredPosts.slice(1).map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
        </div>

        {/* No Results Message */}
        {!isLoading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Posts Found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;