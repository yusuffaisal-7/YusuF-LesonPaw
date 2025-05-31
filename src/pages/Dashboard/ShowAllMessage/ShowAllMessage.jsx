// import React from 'react';

// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// // Skeleton loader
// const SkeletonCard = () => (
//   <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
//     <div className="p-6 space-y-2">
//       <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//       <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//     </div>
//   </div>
// );

// const ShowAllMessage = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: messages = [], isLoading, error } = useQuery({
//     queryKey: ['messages'],
//     queryFn: async () => (await axiosSecure.get('/messages')).data,
//   });

//   if (isLoading) {
//     return (
//       <div className="p-6 max-w-7xl mx-auto">
//         <h3 className="text-4xl font-bold mb-10 text-center text-gray-800">
//           Show All Messages
//         </h3>
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {Array(3).fill(0).map((_, index) => <SkeletonCard key={index} />)}
//         </div>
//       </div>
//     );
//   }

//   if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h3 className="text-4xl font-bold mb-10 text-center text-gray-800">
//         Show All Messages
//       </h3>
//       {messages.length === 0 ? (
//         <p className="text-center text-gray-500">No messages found.</p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {messages.map((message) => (
//             <div
//               key={message._id}
//               className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300"
//             >
//               <div className="p-6 space-y-4">
//                 <p><strong>Sender:</strong> {message.senderEmail || 'Not specified'}</p>
//                 <p><strong>Message:</strong> {message.message || 'No message content'}</p>
//                 <p>
//                   <strong>Sent At:</strong>{' '}
//                   {message.sentAt
//                     ? new Date(message.sentAt).toLocaleString('en-US', {
//                         timeZone: 'Asia/Dhaka',
//                       })
//                     : 'Not specified'}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{' '}
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       message.status === 'unread'
//                         ? 'bg-red-200 text-red-800'
//                         : 'bg-green-200 text-green-800'
//                     }`}
//                   >
//                     {message.status?.charAt(0).toUpperCase() +
//                       message.status?.slice(1) || 'Unread'}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowAllMessage;

// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// // Skeleton loader
// const SkeletonCard = () => (
//   <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
//     <div className="flex justify-between items-center mb-2">
//       <div className="h-5 bg-gray-200 rounded w-1/3"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//     </div>
//     <div className="h-4 bg-gray-200 rounded w-full"></div>
//   </div>
// );

// const ShowAllMessage = () => {
//   const axiosSecure = useAxiosSecure();
//   const [expandedMessageId, setExpandedMessageId] = useState(null);

//   const { data: messages = [], isLoading, error } = useQuery({
//     queryKey: ['messages'],
//     queryFn: async () => (await axiosSecure.get('/messages')).data,
//   });

//   const toggleMessage = (id) => {
//     setExpandedMessageId(prevId => (prevId === id ? null : id));
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 max-w-5xl mx-auto">
//         <h3 className="text-3xl font-semibold mb-8 text-center text-gray-800">Messages</h3>
//         <div className="space-y-4">{Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}</div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h3 className="text-3xl font-semibold mb-8 text-center text-gray-800">Message Notifications</h3>

//       {messages.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">No messages found.</p>
//       ) : (
//         <div className="space-y-4">
//           {messages.map((message) => {
//             const isExpanded = expandedMessageId === message._id;

//             return (
//               <div
//                 key={message._id}
//                 className="bg-pink-100 rounded-xl shadow-md transition-all duration-300 overflow-hidden"
//               >
//                 <div className="p-4 flex justify-between items-start">
//                   <div className="flex gap-3 items-start">
//                     {/* Icon */}
//                     <div className="w-6 h-6 bg-orange-200 rounded-full text-white flex items-center justify-center text-xs mt-1">
//                       ✴️
//                     </div>
//                     <div>
//                       <p className="text-gray-800 font-semibold">
//                         New comment from{' '}
//                         <span className="font-bold">{message.senderEmail || 'Anonymous'}</span>
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {message.sentAt
//                           ? new Date(message.sentAt).toLocaleString('en-US', {
//                               timeZone: 'Asia/Dhaka',
//                               month: 'short',
//                               day: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit',
//                             })
//                           : 'N/A'}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Profile Image Placeholder */}
//                   <img
//                     src="https://via.placeholder.com/40"
//                     alt="User"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                 </div>

//                 {/* Message Content Toggle */}
//                 {isExpanded && (
//                   <div className="p-4 pt-0 text-gray-800">
//                     <p className="mb-2">
//                       <strong>Message:</strong> {message.message || 'No content'}
//                     </p>
//                     <p>
//                       <strong>Status:</strong>{' '}
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           message.status === 'unread'
//                             ? 'bg-red-100 text-red-700'
//                             : 'bg-green-100 text-green-700'
//                         }`}
//                       >
//                         {message.status?.charAt(0).toUpperCase() + message.status?.slice(1) || 'Unread'}
//                       </span>
//                     </p>
//                   </div>
//                 )}

//                 <button
//                   onClick={() => toggleMessage(message._id)}
//                   className="w-full text-left px-4 py-2 text-sm font-medium text-green-700 hover:underline flex items-center gap-1"
//                 >
//                   {isExpanded ? (
//                     <>
//                       Hide message <FaChevronUp className="text-xs" />
//                     </>
//                   ) : (
//                     <>
//                       View message <FaChevronDown className="text-xs" />
//                     </>
//                   )}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowAllMessage;


// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { 
//   FaEnvelope, FaEnvelopeOpen, FaTrash, FaSearch, 
//   FaFilter, FaClock, FaUser, FaChevronDown, FaChevronUp,
//   FaCheck, FaExclamationCircle
// } from 'react-icons/fa';
// import Swal from 'sweetalert2';

// const ShowAllMessage = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedMessage, setSelectedMessage] = useState(null);

//   // Fetch messages
//   const { data: messages = [], isLoading, error } = useQuery({
//     queryKey: ['messages'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/messages');
//       return res.data;
//     },
//   });

//   // Mark as read mutation
//   const markAsReadMutation = useMutation({
//     mutationFn: async (messageId) => {
//       return await axiosSecure.patch(`/messages/${messageId}/read`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['messages']);
//     },
//   });

//   // Delete message mutation
//   const deleteMessageMutation = useMutation({
//     mutationFn: async (messageId) => {
//       return await axiosSecure.delete(`/messages/${messageId}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['messages']);
//       setSelectedMessage(null);
//       Swal.fire({
//         icon: 'success',
//         title: 'Message Deleted',
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     },
//   });

//   const handleMarkAsRead = (messageId) => {
//     markAsReadMutation.mutate(messageId);
//   };

//   const handleDeleteMessage = (messageId) => {
//     Swal.fire({
//       title: 'Delete Message?',
//       text: 'This action cannot be undone.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: 'var(--color-cta)',
//       cancelButtonColor: '#718096',
//       confirmButtonText: 'Yes, delete it',
//       background: '#ffffff',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMessageMutation.mutate(messageId);
//       }
//     });
//   };

//   const filteredMessages = messages.filter(message => {
//     const matchesSearch = 
//       message.senderEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       message.message?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   // Loading skeleton
//   const MessageSkeleton = () => (
//     <div className="animate-pulse bg-white rounded-lg shadow-sm p-4 mb-2">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
//           <div>
//             <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
//             <div className="h-3 bg-gray-200 rounded w-32"></div>
//           </div>
//         </div>
//         <div className="h-4 bg-gray-200 rounded w-24"></div>
//       </div>
//     </div>
//   );

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <FaExclamationCircle className="text-4xl text-red-500 mb-2 mx-auto" />
//           <h3 className="text-lg font-semibold text-gray-800 mb-1">Error Loading Messages</h3>
//           <p className="text-gray-600">{error.message}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-[var(--color-text-dark)] mb-2">Message Center</h2>
//           <p className="text-gray-600">
//             {messages.length} {messages.length === 1 ? 'message' : 'messages'} total
//           </p>
//         </div>

//         {/* Controls */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="flex-1 w-full md:w-auto">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search messages..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
//                 />
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               </div>
//             </div>
//             <div className="flex gap-4 w-full md:w-auto">
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
//               >
//                 <option value="all">All Messages</option>
//                 <option value="unread">Unread</option>
//                 <option value="read">Read</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Messages List */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Messages List */}
//           <div className="lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="p-4 border-b border-gray-100">
//               <h3 className="font-semibold text-gray-800">Messages</h3>
//             </div>
//             <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
//               {isLoading ? (
//                 Array(5).fill(0).map((_, index) => <MessageSkeleton key={index} />)
//               ) : filteredMessages.length === 0 ? (
//                 <div className="p-4 text-center text-gray-500">
//                   No messages found
//                 </div>
//               ) : (
//                 filteredMessages.map((message) => (
//                   <div
//                     key={message._id}
//                     onClick={() => setSelectedMessage(message)}
//                     className={`p-4 cursor-pointer transition-colors duration-200 ${
//                       selectedMessage?._id === message._id
//                         ? 'bg-blue-50'
//                         : 'hover:bg-gray-50'
//                     } ${message.status === 'unread' ? 'bg-blue-50/30' : ''}`}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="w-10 h-10 rounded-full bg-[var(--color-text-dark)] flex items-center justify-center text-white">
//                         {message.senderEmail?.charAt(0).toUpperCase() || 'U'}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center justify-between mb-1">
//                           <h4 className="font-medium text-gray-900 truncate">
//                             {message.senderEmail || 'Unknown Sender'}
//                           </h4>
//                           <span className="text-xs text-gray-500">
//                             {new Date(message.sentAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-600 line-clamp-2">
//                           {message.message}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Message Detail */}
//           <div className="lg:col-span-2">
//             {selectedMessage ? (
//               <div className="bg-white rounded-lg shadow-sm h-full">
//                 <div className="p-6 border-b border-gray-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-full bg-[var(--color-text-dark)] flex items-center justify-center text-white text-xl">
//                         {selectedMessage.senderEmail?.charAt(0).toUpperCase() || 'U'}
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-900">
//                           {selectedMessage.senderEmail}
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           {new Date(selectedMessage.sentAt).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {selectedMessage.status === 'unread' && (
//                         <button
//                           onClick={() => handleMarkAsRead(selectedMessage._id)}
//                           className="p-2 text-gray-600 hover:text-[var(--color-text-dark)] transition-colors"
//                           title="Mark as read"
//                         >
//                           <FaEnvelopeOpen className="text-lg" />
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDeleteMessage(selectedMessage._id)}
//                         className="p-2 text-gray-600 hover:text-[var(--color-cta)] transition-colors"
//                         title="Delete message"
//                       >
//                         <FaTrash className="text-lg" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <div className="prose max-w-none">
//                     <p className="text-gray-800 whitespace-pre-wrap">
//                       {selectedMessage.message}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center p-6">
//                 <div className="text-center">
//                   <FaEnvelope className="text-4xl text-gray-400 mb-2 mx-auto" />
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     Select a Message
//                   </h3>
//                   <p className="text-gray-600">
//                     Choose a message from the list to view its contents
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShowAllMessage;


import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { 
  FaEnvelope, FaEnvelopeOpen, FaTrash, FaSearch, 
  FaFilter, FaExclamationCircle
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const ShowAllMessage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch messages
  const { data: messages = [], isLoading, error } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await axiosSecure.get('/messages');
      return res.data;
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId) => {
      return await axiosSecure.patch(`/messages/${messageId}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']);
      Swal.fire({
        icon: 'success',
        title: 'Message Marked as Read',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to mark message as read',
        showConfirmButton: true,
      });
    },
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId) => {
      return await axiosSecure.delete(`/messages/${messageId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']);
      setSelectedMessage(null);
      Swal.fire({
        icon: 'success',
        title: 'Message Deleted',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to delete message',
        showConfirmButton: true,
      });
    },
  });

  const handleMarkAsRead = (messageId) => {
    markAsReadMutation.mutate(messageId);
  };

  const handleDeleteMessage = (messageId) => {
    Swal.fire({
      title: 'Delete Message?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-cta)',
      cancelButtonColor: '#718096',
      confirmButtonText: 'Yes, delete it',
      background: '#ffffff',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMessageMutation.mutate(messageId);
      }
    });
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      (message.senderEmail?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (message.message?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Loading skeleton
  const MessageSkeleton = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-sm p-4 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <FaExclamationCircle className="text-4xl text-red-500 mb-2 mx-auto" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Error Loading Messages</h3>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-dark)] mb-2">Message Center</h2>
          <p className="text-gray-600">
            {messages.length} {messages.length === 1 ? 'message' : 'messages'} total
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
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
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Messages</h3>
            </div>
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {isLoading ? (
                Array(5).fill(0).map((_, index) => <MessageSkeleton key={index} />)
              ) : filteredMessages.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No messages found
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message._id}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (message.status === 'unread') {
                        handleMarkAsRead(message._id);
                      }
                    }}
                    className={`p-4 cursor-pointer transition-colors duration-200 ${
                      selectedMessage?._id === message._id
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    } ${message.status === 'unread' ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-text-dark)] flex items-center justify-center text-white">
                        {message.senderEmail?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 truncate">
                            {message.senderEmail || 'Unknown Sender'}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(message.sentAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-sm h-full">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-text-dark)] flex items-center justify-center text-white text-xl">
                        {selectedMessage.senderEmail?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedMessage.senderEmail}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(selectedMessage.sentAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedMessage.status === 'unread' && (
                        <button
                          onClick={() => handleMarkAsRead(selectedMessage._id)}
                          className="p-2 text-gray-600 hover:text-[var(--color-text-dark)] transition-colors"
                          title="Mark as read"
                        >
                          <FaEnvelopeOpen className="text-lg" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(selectedMessage._id)}
                        className="p-2 text-gray-600 hover:text-[var(--color-cta)] transition-colors"
                        title="Delete message"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <FaEnvelope className="text-4xl text-gray-400 mb-2 mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Select a Message
                  </h3>
                  <p className="text-gray-600">
                    Choose a message from the list to view its contents
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAllMessage;