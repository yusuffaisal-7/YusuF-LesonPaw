// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure'; // Custom hook for axios
// import Swal from 'sweetalert2';

// const ManageSubjects = () => {
//   const axiosSecure = useAxiosSecure();
//   const [newSubject, setNewSubject] = useState('');
//   const [selectedTutor, setSelectedTutor] = useState('');
//   const [editingSubject, setEditingSubject] = useState(null);
//   const [editSubjectName, setEditSubjectName] = useState('');

//   // Fetch all subjects
//   const { data: subjects = [], isLoading, refetch } = useQuery({
//     queryKey: ['subjects'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/subjects');
//       return res.data;
//     },
//   });

//   // Fetch all tutors
//   const { data: tutors = [] } = useQuery({
//     queryKey: ['tutors'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/tutors');
//       return res.data;
//     },
//   });

//   // Mutation for adding a subject
// const addSubject = useMutation({
//   mutationFn: async ({ name, tutorId }) => {
//     return await axiosSecure.post('/subjects', { name, tutorId });
//   },
//   onSuccess: () => {
//     refetch();
//     setNewSubject('');
//     setSelectedTutor('');
//     Swal.fire({
//       icon: 'success',
//       title: 'Subject Added and Assigned to Tutor',
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   },
//   onError: (error) => {
//     Swal.fire({
//       icon: 'error',
//       title: 'Failed to Add Subject',
//       text: error.response?.data?.message || 'Something went wrong',
//     });
//   },
// });


//   // Mutation for updating a subject
//   const updateSubject = useMutation({
//     mutationFn: async ({ id, name }) => {
//       return await axiosSecure.put(`/subjects/${id}`, { name });
//     },
//     onSuccess: () => {
//       refetch();
//       setEditingSubject(null);
//       setEditSubjectName('');
//       Swal.fire({
//         icon: 'success',
//         title: 'Subject Updated',
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Update Subject',
//         text: error.response?.data?.message || 'Something went wrong',
//       });
//     },
//   });

//   // Mutation for deleting a subject
//   const deleteSubject = useMutation({
//     mutationFn: async (id) => {
//       return await axiosSecure.delete(`/subjects/${id}`);
//     },
//     onSuccess: () => {
//       refetch();
//       Swal.fire({
//         icon: 'success',
//         title: 'Subject Deleted',
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Delete Subject',
//         text: error.response?.data?.message || 'Something went wrong',
//       });
//     },
//   });

//   // Handle adding subject and assigning it to the selected tutor
//   const handleAddSubject = (e) => {
//     e.preventDefault();
//     if (!newSubject.trim() || !selectedTutor) return;

//     addSubject.mutate(newSubject, {
//       onSuccess: async (newSubjectData) => {
//         try {
//           // Update tutor with the added subject
//           const subjectName = newSubjectData?.insertedId ? newSubject : '';
//           if (subjectName) {
//             await axiosSecure.put(`/tutors/${selectedTutor}/subject`, { subject: subjectName });
//           }

//           // Reset inputs and refetch
//           setNewSubject('');
//           setSelectedTutor('');
//           refetch();
//           Swal.fire({
//             icon: 'success',
//             title: 'Subject Added and Assigned to Tutor',
//             timer: 1500,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Failed to Assign Subject to Tutor',
//             text: error.response?.data?.message || 'Something went wrong',
//           });
//         }
//       },
//     });
//   };

//   // Handle updating a subject
//   const handleUpdateSubject = (e) => {
//     e.preventDefault();
//     if (!editSubjectName.trim()) return;
//     updateSubject.mutate({ id: editingSubject._id, name: editSubjectName });
//   };

//   if (isLoading) return <div>Loading subjects...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Manage Subjects</h2>

//       {/* Add Subject Form */}
//       <div className="card bg-base-100 shadow-xl p-6 mb-6">
//         <h3 className="text-xl font-semibold mb-4">Add New Subject</h3>
//         <form onSubmit={handleAddSubject} className="flex gap-3">
//           <div className="form-control flex-1">
//             <input
//               type="text"
//               value={newSubject}
//               onChange={(e) => setNewSubject(e.target.value)}
//               placeholder="Enter subject name"
//               className="input input-bordered w-full"
//             />
//           </div>

//           {/* Tutor Selection */}
//           <div className="form-control flex-1">
//             <select
//               className="select select-bordered w-full"
//               value={selectedTutor}
//               onChange={(e) => setSelectedTutor(e.target.value)}
//               required
//             >
//               <option value="" disabled>Select a tutor</option>
//               {tutors.map((tutor) => (
//                 <option key={tutor._id} value={tutor._id}>
//                   {tutor.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Add Subject
//           </button>
//         </form>
//       </div>

//       {/* Edit Subject Form (Conditional) */}
//       {editingSubject && (
//         <div className="card bg-base-100 shadow-xl p-6 mb-6">
//           <h3 className="text-xl font-semibold mb-4">Edit Subject</h3>
//           <form onSubmit={handleUpdateSubject} className="flex gap-3">
//             <div className="form-control flex-1">
//               <input
//                 type="text"
//                 value={editSubjectName}
//                 onChange={(e) => setEditSubjectName(e.target.value)}
//                 placeholder="Edit subject name"
//                 className="input input-bordered w-full"
//               />
//             </div>
//             <button type="submit" className="btn btn-warning mr-2">
//               Update
//             </button>
//             <button
//               onClick={() => {
//                 setEditingSubject(null);
//                 setEditSubjectName('');
//               }}
//               className="btn btn-secondary"
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Subject List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {subjects.map((subject) => (
//           <div key={subject._id} className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">{subject.name}</h3>
//               <div className="card-actions justify-end">
//                 <button
//                   onClick={() => {
//                     setEditingSubject(subject);
//                     setEditSubjectName(subject.name);
//                   }}
//                   className="btn btn-warning btn-sm"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteSubject.mutate(subject._id)}
//                   className="btn btn-error btn-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {subjects.length === 0 && <p>No subjects found.</p>}
//     </div>
//   );
// };

// export default ManageSubjects;



import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // Custom hook for axios
import Swal from 'sweetalert2';

const ManageSubjects = () => {
  const axiosSecure = useAxiosSecure();
  const [newSubject, setNewSubject] = useState('');
  const [selectedTutor, setSelectedTutor] = useState('');
  const [editingSubject, setEditingSubject] = useState(null);
  const [editSubjectName, setEditSubjectName] = useState('');

  // Fetch all subjects
  const { data: subjects = [], isLoading, refetch } = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const res = await axiosSecure.get('/subjects');
      return res.data;
    },
  });

  // Fetch all tutors
  const { data: tutors = [] } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutors');
      return res.data;
    },
  });

  // Mutation for adding a subject
  const addSubject = useMutation({
    mutationFn: async ({ name, tutorId }) => {
      return await axiosSecure.post('/subjects', { name, tutorId });
    },
    onSuccess: () => {
      refetch();
      setNewSubject('');
      setSelectedTutor('');
      Swal.fire({
        icon: 'success',
        title: 'Subject Added and Assigned to Tutor',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Subject',
        text: error.response?.data?.message || 'Something went wrong',
      });
    },
  });

  // Mutation for updating a subject
  const updateSubject = useMutation({
    mutationFn: async ({ id, name }) => {
      return await axiosSecure.put(`/subjects/${id}`, { name });
    },
    onSuccess: () => {
      refetch();
      setEditingSubject(null);
      setEditSubjectName('');
      Swal.fire({
        icon: 'success',
        title: 'Subject Updated',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update Subject',
        text: error.response?.data?.message || 'Something went wrong',
      });
    },
  });

  // Mutation for deleting a subject
  const deleteSubject = useMutation({
    mutationFn: async ({ tutorId, subjectName }) => {
      return await axiosSecure.delete(`/subjects/${tutorId}/${subjectName}`);
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: 'success',
        title: 'Subject Deleted',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      console.error('Delete error:', error);  // Log the full error object to inspect it
      Swal.fire({
        icon: 'error',
        title: 'Failed to Delete Subject',
        text: error?.response?.data?.message || error?.message || 'Something went wrong',
      });
    },
  });

  // Handle adding subject and assigning it to the selected tutor
  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !selectedTutor) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in all fields!',
      });
      return;
    }

    try {
      const newSubjectData = await addSubject.mutateAsync({
        name: newSubject,
        tutorId: selectedTutor,
      });

      // Assign subject to tutor after adding subject
      if (newSubjectData?.insertedId) {
        await axiosSecure.put(`/tutors/${selectedTutor}/subject`, {
          subject: newSubject,
        });

        setNewSubject('');
        setSelectedTutor('');
        refetch();
        Swal.fire({
          icon: 'success',
          title: 'Subject Added and Assigned to Tutor',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Assign Subject to Tutor',
        text: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  // Handle updating a subject
  const handleUpdateSubject = (e) => {
    e.preventDefault();
    if (!editSubjectName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Please provide a subject name!',
      });
      return;
    }

    updateSubject.mutate({ id: editingSubject._id, name: editSubjectName });
  };

  if (isLoading) return <div>Loading subjects...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Subjects</h2>

      {/* Add Subject Form */}
      <div className="card bg-base-100 shadow-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Subject</h3>
        <form onSubmit={handleAddSubject} className="flex gap-3">
          <div className="form-control flex-1">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Enter subject name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Tutor Selection */}
          <div className="form-control flex-1">
            <select
              className="select select-bordered w-full"
              value={selectedTutor}
              onChange={(e) => setSelectedTutor(e.target.value)}
              required
            >
              <option value="" disabled>Select a tutor</option>
              {tutors.map((tutor) => (
                <option key={tutor._id} value={tutor._id}>
                  {tutor.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Subject
          </button>
        </form>
      </div>

      {/* Edit Subject Form (Conditional) */}
      {editingSubject && (
        <div className="card bg-base-100 shadow-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Edit Subject</h3>
          <form onSubmit={handleUpdateSubject} className="flex gap-3">
            <div className="form-control flex-1">
              <input
                type="text"
                value={editSubjectName}
                onChange={(e) => setEditSubjectName(e.target.value)}
                placeholder="Edit subject name"
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-warning mr-2">
              Update
            </button>
            <button
              onClick={() => {
                setEditingSubject(null);
                setEditSubjectName('');
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Subject List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <div key={subject._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{subject.name}</h3>
              <div className="card-actions justify-end">
                <button
                  onClick={() => {
                    setEditingSubject(subject);
                    setEditSubjectName(subject.name);
                  }}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    const tutorId = subject.tutorId; // Assuming tutorId is stored in subject data
                    const subjectName = subject.name;
                    deleteSubject.mutate({ tutorId, subjectName });
                  }}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {subjects.length === 0 && <p>No subjects found.</p>}
    </div>
  );
};

export default ManageSubjects;
