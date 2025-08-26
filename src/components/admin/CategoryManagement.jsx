"use client"

import { useEffect, useState } from "react"
import { getAllCategories, addCategory, updateCategory, toggleCategoryStatus } from "../../api/admin/adminApi"
import {
  FiPlus,
  FiEdit3,
  FiToggleLeft,
  FiToggleRight,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiTag,
  FiTrendingUp,
  FiEye,
  FiEyeOff,
  FiSave,
  FiLayers,
  FiFilter,
  FiBarChart,
} from "react-icons/fi"
import Swal from "sweetalert2"

const CategoryManagement = () => {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState("")
  const [errors, setErrors] = useState({})
  const [editingCategory, setEditingCategory] = useState(null)
  const [updatedName, setUpdatedName] = useState("")
  const [editError, setEditError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all") // all, listed, unlisted

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const data = await getAllCategories()
      setCategories(data.categories)
    } catch (err) {
      console.error("Error fetching categories:", err.message)
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch categories",
        icon: "error",
        background: "rgba(0, 0, 0, 0.9)",
        color: "#ffffff",
        confirmButtonColor: "#f59e0b",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setErrors({ name: "Category name is required" })
      return
    }
    try {
      await addCategory(newCategory)
      setNewCategory("")
      setErrors({})
      setShowAddForm(false)
      fetchCategories()
      Swal.fire({
        title: "Success!",
        text: "Category added successfully",
        icon: "success",
        background: "rgba(0, 0, 0, 0.9)",
        color: "#ffffff",
        confirmButtonColor: "#f59e0b",
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (err) {
      const responseErrors = err?.response?.data?.errors || {}
      setErrors(responseErrors)
    }
  }

  const handleUpdateCategory = async () => {
    if (!updatedName.trim()) {
      setEditError("Updated category name is required")
      return
    }
    try {
      await updateCategory(editingCategory._id, updatedName)
      setEditingCategory(null)
      setUpdatedName("")
      setEditError("")
      fetchCategories()
      Swal.fire({
        title: "Updated!",
        text: "Category updated successfully",
        icon: "success",
        background: "rgba(0, 0, 0, 0.9)",
        color: "#ffffff",
        confirmButtonColor: "#f59e0b",
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (err) {
      setEditError("Update failed. Try again.")
    }
  }

  const handleToggleStatus = async (id) => {
    try {
      await toggleCategoryStatus(id)
      fetchCategories()
    } catch (err) {
      console.error("Toggle status failed:", err.message)
      Swal.fire({
        title: "Error!",
        text: "Failed to toggle category status",
        icon: "error",
        background: "rgba(0, 0, 0, 0.9)",
        color: "#ffffff",
        confirmButtonColor: "#f59e0b",
      })
    }
  }

  const filteredCategories = categories.filter((category) => {
    if (filterStatus === "all") return true
    if (filterStatus === "listed") return category.isListed
    if (filterStatus === "unlisted") return !category.isListed
    return true
  })

  const stats = {
    total: categories.length,
    listed: categories.filter((c) => c.isListed).length,
    unlisted: categories.filter((c) => !c.isListed).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/20 via-black to-amber-950/30 p-4 sm:p-6 lg:p-8">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-300/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-amber-900/20 via-black/40 to-amber-950/20 rounded-3xl border border-amber-500/20 shadow-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-amber-500/30">
                <FiLayers className="text-amber-400 text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Category Management
                </h1>
                <p className="text-amber-200/70 mt-1">Organize and manage your menu categories</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold px-6 py-3 rounded-2xl hover:from-amber-500 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-lg"
            >
              <FiPlus size={20} />
              Add Category
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Categories",
              value: stats.total,
              icon: FiLayers,
              color: "amber",
              progress: 100,
              description: "All categories",
            },
            {
              label: "Listed",
              value: stats.listed,
              icon: FiEye,
              color: "green",
              progress: stats.total > 0 ? (stats.listed / stats.total) * 100 : 0,
              description: "Active categories",
            },
            {
              label: "Unlisted",
              value: stats.unlisted,
              icon: FiEyeOff,
              color: "red",
              progress: stats.total > 0 ? (stats.unlisted / stats.total) * 100 : 0,
              description: "Inactive categories",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-gradient-to-br from-amber-900/10 via-black/20 to-amber-950/10 rounded-2xl border border-amber-500/20 shadow-xl p-6 hover:bg-amber-900/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-amber-200/70 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-amber-100 mt-1">{stat.value}</p>
                  <p className="text-amber-300/60 text-xs mt-1">{stat.description}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm border ${
                    stat.color === "amber"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      : stat.color === "green"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  <stat.icon size={20} />
                </div>
              </div>
              {/* Progress Bar Visualization */}
              <div className="w-full bg-black/30 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    stat.color === "amber"
                      ? "bg-gradient-to-r from-amber-400 to-amber-600"
                      : stat.color === "green"
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : "bg-gradient-to-r from-red-400 to-red-600"
                  }`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
              <p className="text-amber-300/60 text-xs">{Math.round(stat.progress)}% of total</p>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-amber-900/10 via-black/20 to-amber-950/10 rounded-3xl border border-amber-500/20 shadow-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="text-amber-400" />
            <span className="text-amber-100 font-semibold">Filter Categories</span>
            <div className="ml-auto flex items-center gap-2 text-amber-300/60 text-sm">
              <FiBarChart size={16} />
              <span>{filteredCategories.length} results</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "all", label: "All Categories", count: stats.total },
              { key: "listed", label: "Listed Only", count: stats.listed },
              { key: "unlisted", label: "Unlisted Only", count: stats.unlisted },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterStatus(filter.key)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  filterStatus === filter.key
                    ? "bg-gradient-to-r from-amber-400 to-amber-600 text-black"
                    : "backdrop-blur-md bg-amber-900/10 border border-amber-500/20 text-amber-200 hover:bg-amber-900/20"
                }`}
              >
                {filter.label}
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    filterStatus === filter.key ? "bg-black/20 text-black/70" : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-amber-900/10 via-black/20 to-amber-950/10 rounded-3xl border border-amber-500/20 shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-amber-100 font-medium">Loading categories...</span>
              </div>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-3xl flex items-center justify-center mb-4">
                <FiLayers className="text-amber-400 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-amber-100 mb-2">No Categories Found</h3>
              <p className="text-amber-200/70">Create your first category to get started</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.map((category) => (
                  <div
                    key={category._id}
                    className="backdrop-blur-md bg-gradient-to-br from-amber-900/5 via-black/10 to-amber-950/5 rounded-2xl border border-amber-500/10 overflow-hidden hover:bg-amber-900/10 hover:border-amber-500/20 transition-all duration-300 group"
                  >
                    {/* Category Card Header */}
                    <div className="relative p-6 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-amber-500/30">
                          <FiTag className="text-amber-400" />
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                            category.isListed
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {category.isListed ? "Listed" : "Unlisted"}
                        </div>
                      </div>
                      <h3 className="text-amber-100 font-semibold text-lg mb-2 truncate">{category.name}</h3>
                      <div className="flex items-center gap-1 text-amber-300/60">
                        <FiTrendingUp size={14} />
                        <span className="text-xs">ID: {category._id.slice(-6)}</span>
                      </div>
                    </div>

                    {/* Category Card Actions */}
                    <div className="px-6 pb-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category)
                            setUpdatedName(category.name)
                          }}
                          className="flex-1 py-2 px-3 backdrop-blur-md bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl hover:bg-amber-500/30 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <FiEdit3 size={16} />
                          <span className="text-sm">Edit</span>
                        </button>
                        <button
                          onClick={() => handleToggleStatus(category._id)}
                          className={`p-2 backdrop-blur-md border rounded-xl transition-all duration-200 ${
                            category.isListed
                              ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                              : "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                          }`}
                          title={category.isListed ? "Hide Category" : "Show Category"}
                        >
                          {category.isListed ? <FiToggleRight size={18} /> : <FiToggleLeft size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={() => setShowAddForm(false)}></div>
          <div className="relative w-full max-w-md transform transition-all duration-500 ease-out">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-amber-900/20 via-black/40 to-amber-950/20 rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-amber-500/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-amber-500/30">
                      <FiPlus className="text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                        Add Category
                      </h2>
                      <p className="text-amber-200/70 text-sm">Create a new menu category</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="w-8 h-8 rounded-full bg-amber-900/20 hover:bg-amber-900/30 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:text-amber-200 transition-all duration-200"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-amber-100 mb-2 flex items-center gap-2">
                    <FiTag className="text-amber-400" />
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={newCategory}
                    onChange={(e) => {
                      setNewCategory(e.target.value)
                      setErrors({})
                    }}
                    className={`w-full px-3 py-3 backdrop-blur-md bg-amber-900/10 border rounded-xl focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all duration-300 text-amber-100 placeholder-amber-300/50 text-sm ${
                      errors.name ? "border-red-500/50" : "border-amber-500/30"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddCategory}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-xl hover:from-amber-500 hover:to-amber-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <FiCheck size={16} />
                    Add Category
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-3 backdrop-blur-md bg-amber-900/10 border border-amber-500/30 text-amber-200 rounded-xl hover:bg-amber-900/20 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            onClick={() => {
              setEditingCategory(null)
              setUpdatedName("")
              setEditError("")
            }}
          ></div>
          <div className="relative w-full max-w-md transform transition-all duration-500 ease-out">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-amber-900/20 via-black/40 to-amber-950/20 rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-amber-500/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-amber-500/30">
                      <FiEdit3 className="text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                        Edit Category
                      </h2>
                      <p className="text-amber-200/70 text-sm">Update category information</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditingCategory(null)
                      setUpdatedName("")
                      setEditError("")
                    }}
                    className="w-8 h-8 rounded-full bg-amber-900/20 hover:bg-amber-900/30 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:text-amber-200 transition-all duration-200"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-amber-100 mb-2 flex items-center gap-2">
                    <FiTag className="text-amber-400" />
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="Update category name"
                    value={updatedName}
                    onChange={(e) => {
                      setUpdatedName(e.target.value)
                      setEditError("")
                    }}
                    className={`w-full px-3 py-3 backdrop-blur-md bg-amber-900/10 border rounded-xl focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all duration-300 text-amber-100 placeholder-amber-300/50 text-sm ${
                      editError ? "border-red-500/50" : "border-amber-500/30"
                    }`}
                  />
                  {editError && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {editError}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateCategory}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <FiSave size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategory(null)
                      setUpdatedName("")
                      setEditError("")
                    }}
                    className="px-4 py-3 backdrop-blur-md bg-amber-900/10 border border-amber-500/30 text-amber-200 rounded-xl hover:bg-amber-900/20 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryManagement
