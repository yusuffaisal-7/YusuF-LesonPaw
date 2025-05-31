const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form'; // Import react-hook-form
import { FaImage } from 'react-icons/fa'; // Import FaImage for icon

const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Initialize react-hook-form

  const [formData, setFormData] = useState({
    fullName: '',
    photoURL: user?.photoURL || '',
    email: user?.email || '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    institution: '',
    studentId: '',
    gradeYearOfStudy: '',
    permanentAddress: '',
    currentAddress: '',
    cityStateCountry: '',
    zipPostalCode: '',
    guardianName: '',
    guardianContactNumber: '',
    guardianEmail: '',
  });

  const [imageUploading, setImageUploading] = useState(false); // State for upload status

  // Fetch student profile
  const {
    data: student,
    isLoading: studentLoading,
    error: studentError,
  } = useQuery({
    queryKey: ['studentProfile', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      try {
        const res = await axiosSecure.get(`/students/${user.email}`);
        return res.data;
      } catch (error) {
        if (error.response?.status === 404) {
          console.log('No student profile found; initializing with user data.');
          return null;
        }
        throw error;
      }
    },
    enabled: !!user?.email,
  });

  // Initialize formData when student data is fetched
  useEffect(() => {
    if (student) {
      const updatedFormData = {
        fullName: student.fullName || '',
        photoURL: student.photoURL || user?.photoURL || '',
        email: user?.email || '',
        dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : '',
        gender: student.gender || '',
        contactNumber: student.contactNumber || '',
        institution: student.institution || '',
        studentId: student.studentId || '',
        gradeYearOfStudy: student.gradeYearOfStudy || '',
        permanentAddress: student.permanentAddress || '',
        currentAddress: student.currentAddress || '',
        cityStateCountry: student.cityStateCountry || '',
        zipPostalCode: student.zipPostalCode || '',
        guardianName: student.guardianName || '',
        guardianContactNumber: student.guardianContactNumber || '',
        guardianEmail: student.guardianEmail || '',
      };
      setFormData(updatedFormData);
      reset(updatedFormData); // Reset form with fetched data
    }
  }, [student, user, reset]);

  // Mutation for saving student profile
  const mutation = useMutation({
    mutationFn: async (data) => {
      let imageURL = formData.photoURL; // Use existing photoURL if no new image
      if (data.image && data.image[0]) {
        setImageUploading(true);
        try {
          const formDataImage = new FormData();
          formDataImage.append('image', data.image[0]);
          const imgRes = await fetch(image_hosting_api, {
            method: 'POST',
            body: formDataImage,
          });
          const imgData = await imgRes.json();
          if (imgData.success) {
            imageURL = imgData.data.display_url;
          } else {
            throw new Error('Image upload failed');
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Upload Error',
            text: 'Failed to upload image. Please try again.',
          });
          throw error;
        } finally {
          setImageUploading(false);
        }
      }

      const updatedFormData = { ...data, photoURL: imageURL, email: user?.email };
      const res = await axiosSecure.put(`/students/${user.email}`, updatedFormData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['studentProfile', user?.email], data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile saved successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      console.error('Error saving student profile:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to save profile.',
      });
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['contactNumber', 'guardianContactNumber'].includes(name)) {
      if (!/^[0-9+\-\s]{0,15}$/.test(value)) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const requiredFields = [
      'fullName',
      'dateOfBirth',
      'gender',
      'contactNumber',
      'institution',
      'studentId',
      'gradeYearOfStudy',
      'permanentAddress',
      'currentAddress',
      'cityStateCountry',
      'zipPostalCode',
      'guardianName',
      'guardianContactNumber',
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: `Please fill in: ${missingFields.join(', ')}`,
      });
      return;
    }

    const phoneRegex = /^[0-9+\-\s]{10,15}$/;
    if (!phoneRegex.test(data.contactNumber) || !phoneRegex.test(data.guardianContactNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Contact numbers must be 10-15 digits (including +, -, or spaces).',
      });
      return;
    }

    const dob = new Date(data.dateOfBirth);
    if (isNaN(dob) || dob >= new Date()) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'Date of Birth must be a valid date in the past.',
      });
      return;
    }

    mutation.mutate(data);
  };

  // Handle loading and error states
  if (studentLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg font-semibold">Please log in to view your profile.</p>
        <button
          onClick={() => window.location.href = '/login'}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (studentError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg font-semibold">
          Error: {studentError?.response?.data?.message || 'Failed to load profile data.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Profile Header */}
      <div className="bg-[#70C5D7] rounded-b-2xl">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                {student?.photoURL ? (
                  <div className="relative">
                    <img
                      src={student.photoURL}
                      alt={student.fullName}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#FCBB45] rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <span className="text-[#70C5D7] text-2xl font-bold">
                      {student?.fullName?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">{student?.fullName || 'Student Name'}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{student?.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-white text-[#70C5D7] px-3 py-1 rounded-full text-sm">
                      {student?.gradeYearOfStudy} Year
                    </span>
                    <span className="bg-white text-[#70C5D7] px-3 py-1 rounded-full text-sm">
                      {student?.institution}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => document.getElementById('profile-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#DA3A60] text-white px-4 py-2 rounded-md hover:bg-[#c43255] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#FCBB45]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-[#005482]">Personal Information</h2>
            </div>
            <div className="space-y-4">
        <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <p className="text-[#005482]">{student?.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <p className="text-[#005482]">{student?.gender || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Contact Number</label>
                <p className="text-[#005482]">{student?.contactNumber || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#FCBB45]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-[#005482]">Academic Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Institution</label>
                <p className="text-[#005482]">{student?.institution || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Student ID</label>
                <p className="text-[#005482]">{student?.studentId || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Grade/Year</label>
                <p className="text-[#005482]">{student?.gradeYearOfStudy || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#FCBB45]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-[#005482]">Guardian Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Guardian Name</label>
                <p className="text-[#005482]">{student?.guardianName || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Guardian Contact</label>
                <p className="text-[#005482]">{student?.guardianContactNumber || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Guardian Email</label>
                <p className="text-[#005482]">{student?.guardianEmail || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 md:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#FCBB45]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-[#005482]">Address Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500">Current Address</label>
                <p className="text-[#005482]">{student?.currentAddress || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Permanent Address</label>
                <p className="text-[#005482]">{student?.permanentAddress || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">City/State/Country</label>
                <p className="text-[#005482]">{student?.cityStateCountry || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">ZIP/Postal Code</label>
                <p className="text-[#005482]">{student?.zipPostalCode || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div id="profile-form" className="mt-12">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-[#005482] mb-6">
              {student ? 'Update Profile' : 'Create Profile'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">Full Name</label>
          <input
                  {...register('fullName', { required: 'Full Name is required' })}
            type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="text-[#DA3A60] text-sm mt-1">{errors.fullName.message}</span>}
        </div>
        <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">Profile Photo</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
          <input
                      {...register('image')}
                      type="file"
                      accept="image/*"
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                               file:rounded-full file:border-0 file:text-sm file:font-semibold 
                               file:bg-[#70C5D7] file:text-white hover:file:bg-[#5eb4c6]
                               cursor-pointer border border-gray-300 rounded-md"
                    />
                    {imageUploading && (
                      <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-[#70C5D7]" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {errors.image && <span className="text-[#DA3A60] text-sm mt-1">{errors.image.message}</span>}
        </div>
        <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">Email</label>
          <input
            type="email"
                  value={user?.email || ''}
            disabled
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
          />
        </div>
        <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">Date of Birth</label>
          <input
                  {...register('dateOfBirth', { required: 'Date of Birth is required' })}
            type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                />
                {errors.dateOfBirth && <span className="text-[#DA3A60] text-sm mt-1">{errors.dateOfBirth.message}</span>}
        </div>
        <div>
                <label className="block text-sm font-medium text-[#005482] mb-1">Gender</label>
                <select
                  {...register('gender', { required: 'Gender is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7]"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="text-[#DA3A60] text-sm mt-1">{errors.gender.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Contact Number</label>
          <input
                  {...register('contactNumber', { required: 'Contact Number is required' })}
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Institution</label>
          <input
                  {...register('institution', { required: 'Institution is required' })}
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.institution && <span className="text-red-500 text-sm">{errors.institution.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Student ID</label>
          <input
                  {...register('studentId', { required: 'Student ID is required' })}
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.studentId && <span className="text-red-500 text-sm">{errors.studentId.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Grade/Year of Study</label>
          <input
                  {...register('gradeYearOfStudy', { required: 'Grade/Year of Study is required' })}
            type="text"
            name="gradeYearOfStudy"
            value={formData.gradeYearOfStudy}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.gradeYearOfStudy && <span className="text-red-500 text-sm">{errors.gradeYearOfStudy.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Permanent Address</label>
          <input
                  {...register('permanentAddress', { required: 'Permanent Address is required' })}
            type="text"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.permanentAddress && <span className="text-red-500 text-sm">{errors.permanentAddress.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Current Address</label>
          <input
                  {...register('currentAddress', { required: 'Current Address is required' })}
            type="text"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.currentAddress && <span className="text-red-500 text-sm">{errors.currentAddress.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">City/State/Country</label>
          <input
                  {...register('cityStateCountry', { required: 'City/State/Country is required' })}
            type="text"
            name="cityStateCountry"
            value={formData.cityStateCountry}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.cityStateCountry && <span className="text-red-500 text-sm">{errors.cityStateCountry.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">ZIP/Postal Code</label>
          <input
                  {...register('zipPostalCode', { required: 'ZIP/Postal Code is required' })}
            type="text"
            name="zipPostalCode"
            value={formData.zipPostalCode}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.zipPostalCode && <span className="text-red-500 text-sm">{errors.zipPostalCode.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Guardian Name</label>
          <input
                  {...register('guardianName', { required: 'Guardian Name is required' })}
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.guardianName && <span className="text-red-500 text-sm">{errors.guardianName.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Guardian Contact Number</label>
          <input
                  {...register('guardianContactNumber', { required: 'Guardian Contact Number is required' })}
            type="text"
            name="guardianContactNumber"
            value={formData.guardianContactNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.guardianContactNumber && <span className="text-red-500 text-sm">{errors.guardianContactNumber.message}</span>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Guardian Email</label>
          <input
                  {...register('guardianEmail')}
            type="email"
            name="guardianEmail"
            value={formData.guardianEmail}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
                {errors.guardianEmail && <span className="text-red-500 text-sm">{errors.guardianEmail.message}</span>}
        </div>

              <div className="col-span-2 flex justify-end gap-4">
                <button
                  type="reset"
                  onClick={() => reset(student || {})}
                  className="px-6 py-2 border-2 border-[#005482] text-[#005482] rounded-md hover:bg-[#005482] hover:text-white transition-colors"
                >
                  Reset
                </button>
          <button
            type="submit"
                  className="bg-[#DA3A60] text-white px-8 py-2 rounded-md hover:bg-[#c43255] transition-colors disabled:bg-opacity-50 flex items-center gap-2"
                  disabled={mutation.isLoading || imageUploading}
                >
                  {mutation.isLoading || imageUploading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Save Profile</span>
                    </>
                  )}
          </button>
        </div>
      </form>
                </div>
              </div>
      </div>
    </div>
  );
};

export default StudentProfile;