import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaBook,
  FaUser,
  FaClock,
  FaTag,
  FaFilter,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTrash,
} from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllBlog = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch blogs
  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey: ['blogs', searchQuery, filterStatus, sortField, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get('/blogs', {
        params: { search: searchQuery, status: filterStatus, sort: sortField, order: sortOrder },
      });
      return res.data;
    },
  });

  // Delete blog mutation
  const deleteBlogMutation = useMutation({
    mutationFn: async (blogId) => (await axiosSecure.delete(`/blogs/${blogId}`)).data,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(['blogs']);
      setIsDeleteConfirmOpen(false);
      setBlogToDelete(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    },
  });

  // Sorting handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Delete handlers
  const handleDelete = (blog) => {
    setBlogToDelete(blog);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) deleteBlogMutation.mutate(blogToDelete._id);
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-xl mb-2">Error Loading Blogs</div>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-dark)] mb-2">
            Manage Blogs
          </h2>
          <p className="text-gray-600">Total Blogs: {blogs.length}</p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <button
                onClick={() => handleSort('title')}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-text-dark)] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                Sort
              </button>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)
          ) : blogs.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">No blogs found matching your criteria.</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-text-dark)] flex items-center justify-center text-white text-xl font-semibold">
                      {blog.title?.charAt(0).toUpperCase() || 'B'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-1">{blog.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaUser className="text-gray-400" />
                        <span>{blog.author || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : blog.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {blog.status?.charAt(0).toUpperCase() + blog.status?.slice(1) || 'Status N/A'}
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaBook className="text-[var(--color-text-dark)]" />
                      <span className="text-gray-600">{blog.category || 'Category N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-[var(--color-text-dark)]" />
                      <span className="text-gray-600">{blog.readTime || 'Time N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaTag className="text-[var(--color-text-dark)]" />
                      <span className="text-gray-600">{blog.languageLevel || 'Level N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaBook className="text-[var(--color-text-dark)]" />
                      <span className="text-gray-600">{blog.featured ? 'Featured' : 'Not Featured'}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags && blog.tags.length > 0 ? (
                        blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[var(--color-text-dark)] text-white rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No tags listed</span>
                      )}
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Excerpt:</h4>
                    <p className="text-sm text-gray-600">{blog.excerpt || 'No excerpt available'}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <button
                      onClick={() => handleDelete(blog)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-cta)] text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
                    >
                      <FaTrash className="text-xs" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-[var(--color-cta)] text-white rounded-lg hover:bg-opacity-90"
                  disabled={deleteBlogMutation.isLoading}
                >
                  {deleteBlogMutation.isLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlog;