import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageLocations = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // Fetch all tutors
  const { data: tutors = [], refetch } = useQuery({
    queryKey: ['tutors-locations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/locations');
      return res.data;
    },
  });

  // Fetch tutors for dropdown
  const { data: allTutors = [] } = useQuery({
    queryKey: ['all-tutors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutors');
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post('/locations', data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Location Added to Tutor',
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleDelete = async (tutorId, locationName) => {
    try {
      const res = await axiosSecure.delete(`/locations/${tutorId}/${locationName}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Location Removed',
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error deleting location',
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Tutor Locations</h2>

      {/* Form to assign location */}
      <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 shadow-md p-4 mb-6 space-y-4">
        <div>
          <label className="label font-semibold">Location Name</label>
          <input {...register('name', { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label font-semibold">Select Tutor</label>
          <select {...register('tutorId', { required: true })} className="select select-bordered w-full">
            <option value="">-- Select a Tutor --</option>
            {allTutors.map((tutor) => (
              <option key={tutor._id} value={tutor._id}>
                {tutor.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Assign Location</button>
      </form>

      {/* Tutor Locations Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tutor Name</th>
              <th>Assigned Locations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor) => (
              <tr key={tutor._id}>
                <td>{tutor.name}</td>
                <td>
                  <ul className="list-disc list-inside">
                    {tutor.locations?.map((loc, i) => (
                      <li key={i}>
                        {loc}{' '}
                        <button
                          onClick={() => handleDelete(tutor._id, loc)}
                          className="btn btn-xs btn-error ml-2"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{tutor.locations?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {tutors.length === 0 && <p className="text-center mt-4">No tutor has locations assigned yet.</p>}
      </div>
    </div>
  );
};

export default ManageLocations;

