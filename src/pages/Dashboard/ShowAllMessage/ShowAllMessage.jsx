import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { 
  FaEnvelope, FaEnvelopeOpen, FaTrash, FaSearch, 
  FaFilter, FaExclamationCircle, FaArrowLeft, FaTimes
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const ShowAllMessage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);

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
      setIsMobileDetailView(false);
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

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setIsMobileDetailView(true);
    if (message.status === 'unread') {
      handleMarkAsRead(message._id);
    }
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

  const MessageList = () => (
    <div className={`lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden ${isMobileDetailView ? 'hidden lg:block' : 'block'}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Messages</h3>
      </div>
      <div className="divide-y divide-gray-100 max-h-[calc(100vh-300px)] overflow-y-auto">
        {isLoading ? (
          Array(5).fill(0).map((_, index) => <MessageSkeleton key={index} />)
        ) : filteredMessages.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No messages found
          </div>
        ) : (
          filteredMessages.map((message) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleSelectMessage(message)}
              className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedMessage?._id === message._id
                  ? 'bg-blue-50'
                  : ''
              } ${message.status === 'unread' ? 'bg-blue-50/30' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-text-dark)] to-[var(--color-cta)] flex items-center justify-center text-white shadow-md">
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
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  const MessageDetail = () => (
    <div className={`lg:col-span-2 ${isMobileDetailView ? 'block' : 'hidden lg:block'}`}>
      <AnimatePresence mode="wait">
        {selectedMessage ? (
          <motion.div
            key={selectedMessage._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-sm h-full"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {isMobileDetailView && (
                      <button
                        onClick={() => setIsMobileDetailView(false)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FaArrowLeft className="text-gray-600" />
                      </button>
                    )}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-text-dark)] to-[var(--color-cta)] flex items-center justify-center text-white text-xl shadow-md">
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
                        className="p-2 text-gray-600 hover:text-[var(--color-text-dark)] transition-colors rounded-full hover:bg-gray-100"
                        title="Mark as read"
                      >
                        <FaEnvelopeOpen className="text-lg" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage._id)}
                      className="p-2 text-[#DA3A60] hover:text-white hover:bg-[#DA3A60] transition-colors rounded-full hover:bg-opacity-90"
                      title="Delete message"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
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
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center p-6"
          >
            <div className="text-center">
              <FaEnvelope className="text-4xl text-gray-400 mb-2 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Select a Message
              </h3>
              <p className="text-gray-600">
                Choose a message from the list to view its contents
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-dark)] mb-2">Message Center</h2>
          <p className="text-gray-600">
            {messages.length} {messages.length === 1 ? 'message' : 'messages'} total
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
            <div className="flex-none w-full sm:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent bg-white"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MessageList />
          <MessageDetail />
        </div>
      </div>
    </div>
  );
};

export default ShowAllMessage;