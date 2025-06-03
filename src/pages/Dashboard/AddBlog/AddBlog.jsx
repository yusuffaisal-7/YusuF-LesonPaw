import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaUser, FaQuoteLeft, FaImage } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const estimateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return `${Math.ceil(words / wordsPerMinute)} min read`;
  };

  const onSubmit = async (data) => {
    try {
      Swal.fire({
        title: 'Adding Blog...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      let imageURL = '';
      if (data.image[0]) {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        const imgRes = await fetch(image_hosting_api, {
          method: 'POST',
          body: formData,
        });
        const imgData = await imgRes.json();
        if (imgData.success) {
          imageURL = imgData.data.display_url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      const slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const readTime = estimateReadTime(data.content);

      const blogData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        imageURL,
        category: data.category,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        slug,
        readTime,
        languageLevel: data.languageLevel,
        featured: data.featured || false,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post('/blogs', blogData);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Blog added successfully',
          background: '#ffffff',
          confirmButtonColor: 'var(--color-text-dark)',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to add blog',
        background: '#ffffff',
        confirmButtonColor: 'var(--color-cta)',
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg sm:rounded-xl shadow-md"
      >
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text-dark)]">Add New Blog</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Share an insightful blog post to engage the community.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <FaQuoteLeft className="text-lg sm:text-xl text-[var(--color-text-dark)]" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Blog Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Blog Title *</label>
                  <input
                    {...register('title', { 
                      required: 'Blog title is required',
                      maxLength: { value: 100, message: 'Title cannot exceed 100 characters' }
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter the blog title"
                  />
                  {errors.title && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.title.message}</span>}
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Excerpt *</label>
                  <textarea
                    {...register('excerpt', { 
                      required: 'Excerpt is required',
                      maxLength: { value: 200, message: 'Excerpt cannot exceed 200 characters' }
                    })}
                    rows="2"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent text-sm sm:text-base"
                    placeholder="Short summary for blog preview (max 200 characters)"
                  />
                  {errors.excerpt && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.excerpt.message}</span>}
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Content *</label>
                  <textarea
                    {...register('content', { 
                      required: 'Content is required',
                      minLength: { value: 100, message: 'Content must be at least 100 characters' }
                    })}
                    rows="6"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent text-sm sm:text-base"
                    placeholder="Write the blog content"
                  />
                  {errors.content && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.content.message}</span>}
                </div>

                {/* Author */}
                <div className="md:col-span-1">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Author *</label>
                  <input
                    {...register('author', { 
                      required: 'Author name is required',
                      maxLength: { value: 50, message: 'Author name cannot exceed 50 characters' }
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter the author's name"
                  />
                  {errors.author && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.author.message}</span>}
                </div>

                {/* Category */}
                <div className="md:col-span-1">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Category *</label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select category</option>
                    <option value="Study Tips">Study Tips</option>
                    <option value="STEM">STEM</option>
                    <option value="Language Learning">Language Learning</option>
                    <option value="Platform Updates">Platform Updates</option>
                  </select>
                  {errors.category && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.category.message}</span>}
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Tags (comma separated)</label>
                  <input
                    {...register('tags', {
                      validate: value => !value || value.split(',').every(tag => tag.trim().length <= 30) || 'Each tag must be 30 characters or less'
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., math, exam tips, productivity"
                  />
                  {errors.tags && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.tags.message}</span>}
                </div>

                {/* Language Level and Featured in one row */}
                <div className="md:col-span-1">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Language Level *</label>
                  <select
                    {...register('languageLevel', { required: 'Language level is required' })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  {errors.languageLevel && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.languageLevel.message}</span>}
                </div>

                <div className="md:col-span-1">
                  <label className="flex items-center gap-2 h-full pt-7">
                    <input
                      type="checkbox"
                      {...register('featured')}
                      className="accent-[var(--color-text-dark)] h-4 w-4 sm:h-5 sm:w-5"
                    />
                    <span className="text-sm sm:text-base font-medium text-gray-700">Mark as Featured</span>
                  </label>
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Image *</label>
                  <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg">
                    <FaImage className="text-gray-400 text-base sm:text-lg flex-shrink-0" />
                    <input
                      {...register('image', { required: 'Image is required' })}
                      type="file"
                      accept="image/*"
                      className="w-full text-xs sm:text-sm text-gray-500 file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-[var(--color-text-dark)] file:text-white hover:file:bg-opacity-90"
                    />
                  </div>
                  {errors.image && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.image.message}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-[var(--color-text-dark)] text-white text-sm sm:text-base rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <FaUser className="text-xs sm:text-sm" />
              Add Blog
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBlog;