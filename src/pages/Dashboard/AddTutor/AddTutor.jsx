

// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const AddTutor = () => {
//   const axiosSecure = useAxiosSecure();
//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       // Handle profile photo upload
//       let photoURL = '';
//       if (data.photo[0]) {
//         const formData = new FormData();
//         formData.append('image', data.photo[0]);
//         const imgRes = await fetch(image_hosting_api, {
//           method: 'POST',
//           body: formData,
//         });
//         const imgData = await imgRes.json();
//         if (imgData.success) {
//           photoURL = imgData.data.display_url;
//         } else {
//           throw new Error('Image upload failed');
//         }
//       }

//       // Structure tutor data
//       const tutorData = {
//         name: data.name,
//         dateOfBirth: data.dateOfBirth,
//         gender: data.gender,
//         contactNumber: data.contactNumber,
//         email: data.email,
//         subjects: data.subjects.split(',').map(subject => subject.trim()),
//         educationalQualifications: data.educationalQualifications,
//         experience: parseInt(data.experience),
//         certifications: data.certifications.split(',').map(cert => cert.trim()),
//         institution: data.institution,
//         teachingMode: data.teachingMode,
//         availability: data.availability.split(',').map(slot => slot.trim()),
//         hourlyRate: parseFloat(data.hourlyRate) || null,
//         address: {
//           city: data.city,
//           state: data.state,
//           country: data.country,
//           permanentAddress: data.permanentAddress || '',
//           postalCode: data.postalCode,
//         },
//         bio: data.bio,
//         photoURL,
//         status: 'active',
//       };

//       // Submit tutor data
//       const res = await axiosSecure.post('/tutors', tutorData);
//       if (res.data.insertedId) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Tutor Added Successfully',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         reset();
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Add Tutor',
//         text: error.response?.data?.message || 'An error occurred',
//       });
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Add a New Tutor</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold">Basic Information</h3>
//           <div className="form-control">
//             <label className="label">Full Name</label>
//             <input {...register('name', { required: true })} className="input input-bordered" placeholder="Tutor's Name" />
//           </div>
//           <div className="form-control">
//             <label className="label">Date of Birth</label>
//             <input {...register('dateOfBirth', { required: true })} type="date" className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">Gender</label>
//             <select {...register('gender', { required: true })} className="select select-bordered">
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-control">
//             <label className="label">Contact Number</label>
//             <input {...register('contactNumber', { required: true })} type="tel" className="input input-bordered" placeholder="Contact Number" />
//           </div>
//           <div className="form-control">
//             <label className="label">Email Address</label>
//             <input {...register('email', { required: true })} type="email" className="input input-bordered" placeholder="Tutor's Email" />
//           </div>
//           <div className="form-control">
//             <label className="label">Profile Photo</label>
//             <input {...register('photo')} type="file" accept="image/*" className="file-input file-input-bordered" />
//           </div>
//         </div>

//         {/* Professional Information */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold">Professional Information</h3>
//           <div className="form-control">
//             <label className="label">Subjects / Courses Taught (comma-separated)</label>
//             <input {...register('subjects', { required: true })} className="input input-bordered" placeholder="e.g., Math, Science" />
//           </div>
//           <div className="form-control">
//             <label className="label">Educational Qualifications</label>
//             <textarea {...register('educationalQualifications', { required: true })} className="textarea textarea-bordered" placeholder="e.g., B.Sc. in Mathematics, M.Ed." />
//           </div>
//           <div className="form-control">
//             <label className="label">Years of Experience</label>
//             <input {...register('experience', { required: true })} type="number" className="input input-bordered" placeholder="Years of Experience" />
//           </div>
//           <div className="form-control">
//             <label className="label">Certifications / Licenses (comma-separated)</label>
//             <input {...register('certifications')} className="input input-bordered" placeholder="e.g., Teaching License, TESOL" />
//           </div>
//           <div className="form-control">
//             <label className="label">Institution / School Affiliation</label>
//             <input {...register('institution')} className="input input-bordered" placeholder="e.g., XYZ University" />
//           </div>
//           <div className="form-control">
//             <label className="label">Teaching Mode</label>
//             <select {...register('teachingMode', { required: true })} className="select select-bordered">
//               <option value="">Select Mode</option>
//               <option value="Online">Online</option>
//               <option value="Offline">Offline</option>
//               <option value="Both">Both</option>
//             </select>
//           </div>
//           <div className="form-control">
//             <label className="label">Availability Schedule (comma-separated)</label>
//             <input {...register('availability', { required: true })} className="input input-bordered" placeholder="e.g., Mon 9-11 AM, Wed 2-4 PM" />
//           </div>
//           <div className="form-control">
//             <label className="label">Hourly Rate (optional)</label>
//             <input {...register('hourlyRate')} type="number" step="0.01" className="input input-bordered" placeholder="e.g., 50.00" />
//           </div>
//         </div>

//         {/* Address Information */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold">Address Information</h3>
//           <div className="form-control">
//             <label className="label">City</label>
//             <input {...register('city', { required: true })} className="input input-bordered" placeholder="City" />
//           </div>
//           <div className="form-control">
//             <label className="label">State</label>
//             <input {...register('state', { required: true })} className="input input-bordered" placeholder="State" />
//           </div>
//           <div className="form-control">
//             <label className="label">Country</label>
//             <input {...register('country', { required: true })} className="input input-bordered" placeholder="Country" />
//           </div>
//           <div className="form-control">
//             <label className="label">Permanent Address (optional)</label>
//             <textarea {...register('permanentAddress')} className="textarea textarea-bordered" placeholder="Permanent Address" />
//           </div>
//           <div className="form-control">
//             <label className="label">Zip / Postal Code</label>
//             <input {...register('postalCode', { required: true })} className="input input-bordered" placeholder="Postal Code" />
//           </div>
//         </div>

//         {/* Other Information */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold">Other Information</h3>
//           <div className="form-control">
//             <label className="label">Short Bio / About Me</label>
//             <textarea {...register('bio', { required: true })} className="textarea textarea-bordered" placeholder="Tell us about yourself" />
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary">Add Tutor</button>
//       </form>
//     </div>
//   );
// };

// export default AddTutor;



import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaBook, FaClock, FaDollarSign, FaMapMarkerAlt, FaImage } from 'react-icons/fa';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTutor = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Show loading state
      Swal.fire({
        title: 'Adding Tutor...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Handle profile photo upload
      let photoURL = '';
      if (data.photo[0]) {
        const formData = new FormData();
        formData.append('image', data.photo[0]);
        const imgRes = await fetch(image_hosting_api, {
          method: 'POST',
          body: formData,
        });
        const imgData = await imgRes.json();
        if (imgData.success) {
          photoURL = imgData.data.display_url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      // Structure tutor data
      const tutorData = {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        contactNumber: data.contactNumber,
        email: data.email,
        subjects: data.subjects.split(',').map(subject => subject.trim()),
        educationalQualifications: data.educationalQualifications,
        experience: parseInt(data.experience),
        certifications: data.certifications.split(',').map(cert => cert.trim()),
        institution: data.institution,
        teachingMode: data.teachingMode,
        availability: data.availability.split(',').map(slot => slot.trim()),
        hourlyRate: parseFloat(data.hourlyRate) || null,
        address: {
          city: data.city,
          state: data.state,
          country: data.country,
          permanentAddress: data.permanentAddress || '',
          postalCode: data.postalCode,
        },
        bio: data.bio,
        photoURL,
        status: 'active',
      };

      // Submit tutor data
      const res = await axiosSecure.post('/tutors', tutorData);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Tutor added successfully',
          background: '#ffffff',
          confirmButtonColor: 'var(--color-text-dark)',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to add tutor',
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
          <h2 className="text-2xl font-bold text-[var(--color-text-dark)]">Add New Tutor</h2>
          <p className="text-gray-600 mt-2">Fill in the details to add a new tutor to the platform.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <FaUser className="text-[var(--color-text-dark)]" />
                <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Enter full name"
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    {...register('dateOfBirth', { required: 'Date of birth is required' })}
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                  />
                  {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    {...register('gender', { required: 'Gender is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                  <input
                    {...register('contactNumber', { required: 'Contact number is required' })}
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Enter contact number"
                  />
                  {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Enter email address"
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                  <div className="flex items-center gap-2">
                    <FaImage className="text-gray-400" />
                    <input
                      {...register('photo')}
                      type="file"
                      accept="image/*"
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-text-dark)] file:text-white hover:file:bg-opacity-90"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <FaGraduationCap className="text-[var(--color-text-dark)]" />
                <h3 className="text-xl font-semibold text-gray-800">Professional Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subjects / Courses Taught *</label>
                  <input
                    {...register('subjects', { required: 'Subjects are required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="e.g., Mathematics, Physics (comma-separated)"
                  />
                  {errors.subjects && <span className="text-red-500 text-sm">{errors.subjects.message}</span>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Educational Qualifications *</label>
                  <textarea
                    {...register('educationalQualifications', { required: 'Educational qualifications are required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    rows="3"
                    placeholder="e.g., B.Sc. in Mathematics, M.Ed."
                  />
                  {errors.educationalQualifications && <span className="text-red-500 text-sm">{errors.educationalQualifications.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
                  <input
                    {...register('experience', { required: 'Experience is required' })}
                    type="number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Enter years of experience"
                  />
                  {errors.experience && <span className="text-red-500 text-sm">{errors.experience.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                  <input
                    {...register('certifications')}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="e.g., Teaching License, TESOL (comma-separated)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution / School</label>
                  <input
                    {...register('institution')}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Current institution"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teaching Mode *</label>
                  <select
                    {...register('teachingMode', { required: 'Teaching mode is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                  >
                    <option value="">Select Mode</option>
                    <option value="Online">Online</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Both">Both</option>
                  </select>
                  {errors.teachingMode && <span className="text-red-500 text-sm">{errors.teachingMode.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability Schedule *</label>
                  <input
                    {...register('availability', { required: 'Availability is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="e.g., Mon 9-11 AM, Wed 2-4 PM"
                  />
                  {errors.availability && <span className="text-red-500 text-sm">{errors.availability.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                  <input
                    {...register('hourlyRate')}
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="e.g., 50.00"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-[var(--color-text-dark)]" />
                <h3 className="text-xl font-semibold text-gray-800">Address Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    {...register('city', { required: 'City is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Enter city"
                  />
                  {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    {...register('state', { required: 'State is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Enter state"
                  />
                  {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    {...register('country', { required: 'Country is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Enter country"
                  />
                  {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input
                    {...register('postalCode', { required: 'Postal code is required' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    placeholder="Enter postal code"
                  />
                  {errors.postalCode && <span className="text-red-500 text-sm">{errors.postalCode.message}</span>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                  <textarea
                    {...register('permanentAddress')}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                    rows="2"
                    placeholder="Enter permanent address"
                  />
                </div>
              </div>
            </div>

            {/* Other Information */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <FaBook className="text-[var(--color-text-dark)]" />
                <h3 className="text-xl font-semibold text-gray-800">Other Information</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio / About Me *</label>
                <textarea
                  {...register('bio', { required: 'Bio is required' })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                  rows="4"
                  placeholder="Tell us about yourself and your teaching experience"
                />
                {errors.bio && <span className="text-red-500 text-sm">{errors.bio.message}</span>}
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
              Add Tutor
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTutor;