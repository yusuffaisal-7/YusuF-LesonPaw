import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { motion } from 'framer-motion';
import { FaUser, FaQuoteLeft, FaInfoCircle, FaImage } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddStory = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Show loading state
      Swal.fire({
        title: 'Adding Story...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Handle image upload
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

      // Structure story data
      const storyData = {
        quote: data.quote,
        name: data.name,
        details: data.details,
        imageURL,
        status: 'pending', // Can be 'pending', 'approved', etc., for moderation
        createdAt: new Date().toISOString(),
      };

      // Submit story data
      const res = await axiosSecure.post('/stories', storyData);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Story added successfully',
          background: '#ffffff',
          confirmButtonColor: 'var(--color-text-dark)',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to add story',
        background: '#ffffff',
        confirmButtonColor: 'var(--color-cta)',
      });
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md mx-4 my-4"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[var(--color-text-dark)]">Add New Success Story</h2>
          <p className="text-gray-600 mt-2">Share a success story to inspire others.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Story Information */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <FaQuoteLeft className="text-[var(--color-text-dark)]" />
                <h3 className="text-xl font-semibold text-gray-800">Story Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote / Testimonial *</label>
                  <textarea
                    {...register('quote', { required: 'Quote is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    rows="4"
                    placeholder="Share the success story or testimonial"
                  />
                  {errors.quote && <span className="text-red-500 text-sm">{errors.quote.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Enter the person's name"
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Details *</label>
                  <input
                    {...register('details', { required: 'Details are required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="e.g., 2nd Standard, Manchester UK"
                  />
                  {errors.details && <span className="text-red-500 text-sm">{errors.details.message}</span>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
                  <div className="flex items-center gap-2">
                    <FaImage className="text-gray-400" />
                    <input
                      {...register('image', { required: 'Image is required' })}
                      type="file"
                      accept="image/*"
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-text-dark)] file:text-white hover:file:bg-opacity-90"
                    />
                  </div>
                  {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[var(--color-text-dark)] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 shadow-md"
            >
              <FaUser className="text-sm" />
              Add Story
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddStory;