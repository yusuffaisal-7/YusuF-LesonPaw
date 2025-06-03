import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, FaUserShield, FaUserTag, FaTrash, FaFilter, 
  FaSort, FaSortUp, FaSortDown, FaEye, FaTimes 
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 10;

  // Fetch users
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ["users", searchQuery, currentPage, sortField, sortOrder, filterRole],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { 
          search: searchQuery, 
          page: currentPage, 
          limit: usersPerPage,
          sort: sortField,
          order: sortOrder,
          role: filterRole
        },
      });
      return res.data;
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Make Admin?",
      text: `Are you sure you want to make ${user.name} an admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#005482",
      cancelButtonColor: "#DA3A60",
      confirmButtonText: "Yes, make admin",
      background: "#ffffff",
      customClass: {
        title: "text-[var(--color-text-dark)] text-xl",
        content: "text-[var(--color-text-dark)]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is now an admin`,
                showConfirmButton: false,
                timer: 1500,
                background: "#ffffff",
                customClass: {
                  title: "text-[var(--color-text-dark)] text-xl",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to make admin",
              text: error.message,
              background: "#ffffff",
              customClass: {
                title: "text-[var(--color-text-dark)] text-xl",
                content: "text-[var(--color-text-dark)]",
              }
            });
          });
      }
    });
  };

  const handleMakeTeacher = (user) => {
    Swal.fire({
      title: "Make Teacher?",
      text: `Are you sure you want to make ${user.name} a teacher?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#005482",
      cancelButtonColor: "#DA3A60",
      confirmButtonText: "Yes, make teacher",
      background: "#ffffff",
      customClass: {
        title: "text-[var(--color-text-dark)] text-xl",
        content: "text-[var(--color-text-dark)]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/Teacher/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is now a teacher`,
                showConfirmButton: false,
                timer: 1500,
                background: "#ffffff",
                customClass: {
                  title: "text-[var(--color-text-dark)] text-xl",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to make teacher",
              text: error.message,
              background: "#ffffff",
              customClass: {
                title: "text-[var(--color-text-dark)] text-xl",
                content: "text-[var(--color-text-dark)]",
              }
            });
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#005482",
      cancelButtonColor: "#DA3A60",
      confirmButtonText: "Yes, delete",
      background: "#ffffff",
      customClass: {
        title: "text-[var(--color-text-dark)] text-xl",
        content: "text-[var(--color-text-dark)]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                icon: "success",
                title: "User Deleted",
                text: `${user.name} has been deleted successfully.`,
                background: "#ffffff",
                customClass: {
                  title: "text-[var(--color-text-dark)] text-xl",
                  content: "text-[var(--color-text-dark)]",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to delete",
              text: error.message,
              background: "#ffffff",
              customClass: {
                title: "text-[var(--color-text-dark)] text-xl",
                content: "text-[var(--color-text-dark)]",
              }
            });
          });
      }
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1" />;
    return sortOrder === "asc" ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
  };

  const SkeletonRow = () => (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 bg-[#70C5D7] bg-opacity-10 rounded-xl"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#70C5D7] bg-opacity-10 rounded-xl w-1/4"></div>
          <div className="h-4 bg-[#70C5D7] bg-opacity-10 rounded-xl w-1/2"></div>
          <div className="h-4 bg-[#70C5D7] bg-opacity-10 rounded-xl w-1/3"></div>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="h-10 bg-[#70C5D7] bg-opacity-10 rounded-xl w-full sm:w-24"></div>
          <div className="h-10 bg-[#70C5D7] bg-opacity-10 rounded-xl w-full sm:w-24"></div>
          <div className="h-10 bg-[#70C5D7] bg-opacity-10 rounded-xl w-full sm:w-24"></div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <p className="text-[var(--color-cta)] text-lg mb-2">Error Loading Users</p>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#005482]">Manage Users</h2>
          <div className="flex items-center gap-3">
            <span className="text-base sm:text-lg text-[#005482]">Total Users: {users.length}</span>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 rounded-xl border-2 border-[#70C5D7] text-[#005482] text-sm sm:text-base focus:outline-none focus:border-[#DA3A60]"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-[#70C5D7] text-[#005482] text-sm sm:text-base focus:outline-none focus:border-[#DA3A60]"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#70C5D7] text-lg" />
          </div>
        </div>

        {/* Users List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
          ) : paginatedUsers.length === 0 ? (
            <div className="bg-[#70C5D7] bg-opacity-10 rounded-xl p-6 text-center">
              <p className="text-[#005482] text-lg">No users found</p>
            </div>
          ) : (
            <AnimatePresence>
              {paginatedUsers.map((user, index) => (
                <motion.div
                  key={user._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-10 h-10 bg-[#70C5D7] bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-[#005482] font-semibold">{index + 1 + (currentPage - 1) * usersPerPage}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#005482] truncate">{user.name}</h3>
                      <p className="text-sm text-[#70C5D7] truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          user.role === 'admin' ? 'bg-[#DA3A60] text-white' :
                          user.role === 'teacher' ? 'bg-[#FCBB45] text-white' :
                          'bg-[#70C5D7] bg-opacity-20 text-[#005482]'
                        }`}>
                          {user.role || "User"}
                        </span>
                        <span className="px-2 py-1 rounded-lg text-xs font-medium bg-[#70C5D7] bg-opacity-20 text-[#005482]">
                          {user.status || "Active"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="flex items-center px-3 py-2 bg-[#005482] text-white rounded-xl hover:bg-opacity-90 transition-colors text-sm w-full sm:w-auto justify-center sm:justify-start"
                        >
                          <FaUserShield className="mr-2" /> Make Admin
                        </button>
                      )}
                      {user.role !== "teacher" && (
                        <button
                          onClick={() => handleMakeTeacher(user)}
                          className="flex items-center px-3 py-2 bg-[#70C5D7] text-white rounded-xl hover:bg-opacity-90 transition-colors text-sm w-full sm:w-auto justify-center sm:justify-start"
                        >
                          <FaUserTag className="mr-2" /> Make Teacher
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="flex items-center px-3 py-2 bg-[#DA3A60] text-white rounded-xl hover:bg-opacity-90 transition-colors text-sm w-full sm:w-auto justify-center sm:justify-start"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 overflow-x-auto">
            <nav className="inline-flex rounded-xl shadow-sm -space-x-px">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-2 rounded-l-xl border border-[#70C5D7] bg-white text-sm font-medium text-[#005482] hover:bg-[#70C5D7] hover:bg-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border border-[#70C5D7] text-sm font-medium ${
                    currentPage === page
                      ? "bg-[#005482] text-white"
                      : "bg-white text-[#005482] hover:bg-[#70C5D7] hover:bg-opacity-10"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-3 py-2 rounded-r-xl border border-[#70C5D7] bg-white text-sm font-medium text-[#005482] hover:bg-[#70C5D7] hover:bg-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;