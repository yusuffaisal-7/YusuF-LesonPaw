import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 

const JoinTeacher = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to log in to apply!",
      });
      return;
    }

    try {
      const response = await axiosSecure.patch(
        `/users/request-teacher/${user.email}`,
        {
          title: formData.title,
          reason: formData.reason,
          cvLink: formData.cvLink,
        }
      );

      if (response.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Teacher application submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(true);
      } else {
        throw new Error(response.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting teacher application:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to submit your application. Please try again later.",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: "",
      reason: "",
      cvLink: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Join as a Teacher</h2>
          <p className="mt-2 text-gray-600">Fill out the form below to apply for a teaching position</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Application Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter a professional title for your application"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Why do you want to be a Teacher?
            </label>
            <textarea
              id="reason"
              name="reason"
              rows="4"
              placeholder="Explain your motivation and qualifications for becoming a teacher"
              value={formData.reason}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="cvLink" className="block text-sm font-medium text-gray-700 mb-1">
              CV Link
            </label>
            <input
              id="cvLink"
              name="cvLink"
              type="url"
              placeholder="Enter the URL to your CV (Google Drive, Dropbox, etc.)"
              value={formData.cvLink}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#DA3A60] text-white py-3 px-6 rounded-md hover:bg-[#c43255] transition-colors duration-200"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
            <p className="text-gray-600 mb-6">Your teacher application has been submitted successfully. We will review your application and get back to you soon.</p>
            <button
              onClick={closeModal}
              className="w-full bg-[#DA3A60] text-white py-2 px-4 rounded-md hover:bg-[#c43255] transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinTeacher;

