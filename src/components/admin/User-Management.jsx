"use client"

import { useEffect, useState } from "react"
import { toggleBlockUser, getAllUsers } from "../../api/admin/adminApi"
import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiShield,
  FiShieldOff,
  FiMail,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi"

const USERS_PER_PAGE = 8

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all") // all, active, blocked
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const res = await getAllUsers()
      // console.log("res", res)
      setUsers(res || [])
    } catch (error) {
      console.error("Error fetching users", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleBlock = async (id) => {
    try {
      await toggleBlockUser(id)
      fetchUsers() // Refresh list
    } catch (error) {
      console.error("Error toggling user block status", error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Filter and search logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && !user.isBlocked) ||
      (filterStatus === "blocked" && user.isBlocked)
    return matchesSearch && matchesFilter
  })

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const start = (currentPage - 1) * USERS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(start, start + USERS_PER_PAGE)

  const getStatusColor = (isBlocked) => {
    return isBlocked
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : "bg-green-500/20 text-green-400 border-green-500/30"
  }

  const getStatusIcon = (isBlocked) => {
    return isBlocked ? <FiXCircle size={16} /> : <FiCheckCircle size={16} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 lg:p-8">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <FiUsers className="text-yellow-400 text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  User Management
                </h1>
                <p className="text-gray-400 mt-1">Manage and monitor user accounts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-4 py-2">
                <span className="text-white font-semibold">{filteredUsers.length}</span>
                <span className="text-gray-400 ml-1">Total Users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative group">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-8 py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="all" className="bg-gray-800 text-white">
                  All Users
                </option>
                <option value="active" className="bg-gray-800 text-white">
                  Active Only
                </option>
                <option value="blocked" className="bg-gray-800 text-white">
                  Blocked Only
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid/Cards */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white font-medium">Loading users...</span>
              </div>
            </div>
          ) : paginatedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-400/20 to-gray-500/20 rounded-3xl flex items-center justify-center mb-4">
                <FiUsers className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Users Found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-6 px-8 text-gray-300 font-semibold">#</th>
                      <th className="text-left py-6 px-8 text-gray-300 font-semibold">User</th>
                      <th className="text-left py-6 px-8 text-gray-300 font-semibold">Contact</th>
                      <th className="text-left py-6 px-8 text-gray-300 font-semibold">Status</th>
                      <th className="text-left py-6 px-8 text-gray-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user, idx) => (
                      <tr
                        key={user._id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group"
                      >
                        <td className="py-6 px-8">
                          <span className="text-gray-400 font-medium">{start + idx + 1}</span>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                              <FiUser className="text-yellow-400" />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{user.name}</h3>
                              <p className="text-gray-400 text-sm">ID: {user._id.slice(-8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FiMail size={16} className="text-gray-400" />
                            <span>{user.email}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-sm ${getStatusColor(
                              user.isBlocked,
                            )}`}
                          >
                            {getStatusIcon(user.isBlocked)}
                            <span className="font-medium">{user.isBlocked ? "Blocked" : "Active"}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleBlock(user._id)}
                              className={`p-3 rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
                                user.isBlocked
                                  ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                              }`}
                              title={user.isBlocked ? "Unblock User" : "Block User"}
                            >
                              {user.isBlocked ? <FiShield size={18} /> : <FiShieldOff size={18} />}
                            </button>
                            {/* <button
                              className="p-3 rounded-2xl border backdrop-blur-sm bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30 transition-all duration-200 hover:scale-105"
                              title="View Details"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              className="p-3 rounded-2xl border backdrop-blur-sm bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30 transition-all duration-200 hover:scale-105"
                              title="More Options"
                            >
                              <FiMoreVertical size={18} />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden p-6 space-y-4">
                {paginatedUsers.map((user, idx) => (
                  <div
                    key={user._id}
                    className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                          <FiUser className="text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{user.name}</h3>
                          <p className="text-gray-400 text-sm">#{start + idx + 1}</p>
                        </div>
                      </div>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-sm text-sm ${getStatusColor(
                          user.isBlocked,
                        )}`}
                      >
                        {getStatusIcon(user.isBlocked)}
                        <span>{user.isBlocked ? "Blocked" : "Active"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 mb-4">
                      <FiMail size={16} className="text-gray-400" />
                      <span className="text-sm">{user.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleBlock(user._id)}
                        className={`flex-1 py-3 px-4 rounded-2xl border backdrop-blur-sm transition-all duration-200 font-medium ${
                          user.isBlocked
                            ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      {/* <button className="p-3 rounded-2xl border backdrop-blur-sm bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30 transition-all duration-200">
                        <FiEye size={18} />
                      </button>
                      <button className="p-3 rounded-2xl border backdrop-blur-sm bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30 transition-all duration-200">
                        <FiMoreVertical size={18} />
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="text-gray-400 text-sm">
                  Showing {start + 1} to {Math.min(start + USERS_PER_PAGE, filteredUsers.length)} of{" "}
                  {filteredUsers.length} users
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-3 rounded-2xl border backdrop-blur-sm bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl border backdrop-blur-sm transition-all duration-200 ${
                          currentPage === page
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-400/50"
                            : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-2xl border backdrop-blur-sm bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserManagement
