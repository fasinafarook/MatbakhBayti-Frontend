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
  const [filterStatus, setFilterStatus] = useState("all")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [categoryToToggle, setCategoryToToggle] = useState(null)

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
      showErrorAlert("Failed to fetch categories")
    } finally {
      setIsLoading(false)
    }
  }

  const showErrorAlert = (message) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      background: "rgba(0, 0, 0, 0.9)",
      color: "#ffffff",
      confirmButtonColor: "#f59e0b",
    })
  }

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      background: "rgba(0, 0, 0, 0.9)",
      color: "#ffffff",
      confirmButtonColor: "#f59e0b",
      timer: 2000,
      showConfirmButton: false,
    })
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
      showSuccessAlert("Category added successfully")
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
      showSuccessAlert("Category updated successfully")
    } catch (err) {
      setEditError("Update failed. Try again(category already exist).")
    }
  }

  const handleToggleStatus = async (id) => {
    try {
      await toggleCategoryStatus(id)
      fetchCategories()
      setShowConfirmModal(false)
      setCategoryToToggle(null)
    } catch (err) {
      console.error("Toggle status failed:", err.message)
      showErrorAlert("Failed to toggle category status")
    }
  }

  const confirmToggleStatus = (id) => {
    const category = categories.find((c) => c._id === id)
    setCategoryToToggle(id)
    setShowConfirmModal(true)
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
    <div className="min-h-screen bg-black text-amber-100 px-6 py-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-amber-400 text-balance">Category Management</h1>
        <p className="text-amber-200/70 mt-1">Organize and manage your product categories</p>
      </header>

      {/* Stats - classic cards with solid backgrounds and subtle borders */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total", value: stats.total, icon: FiLayers },
          { title: "Listed", value: stats.listed, icon: FiEye },
          { title: "Unlisted", value: stats.unlisted, icon: FiEyeOff },
          { title: "Filtered", value: filteredCategories.length, icon: FiFilter },
        ].map((s, idx) => {
          const Icon = s.icon
          return (
            <div key={idx} className="rounded-lg border border-amber-500/20 bg-neutral-950 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 border border-amber-500/20">
                    <Icon className="h-4 w-4 text-amber-300" />
                  </span>
                  <span className="text-sm text-amber-200/80">{s.title}</span>
                </div>
                <span className="text-xl font-semibold text-amber-50">{s.value}</span>
              </div>
            </div>
          )
        })}
      </section>

      {/* Toolbar */}
      <section className="mb-4 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {[
            { key: "all", label: "All", count: stats.total },
            { key: "listed", label: "Listed", count: stats.listed },
            { key: "unlisted", label: "Unlisted", count: stats.unlisted },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterStatus(f.key)}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors
                ${
                  filterStatus === f.key
                    ? "border-amber-500 text-black bg-amber-500"
                    : "border-amber-500/20 text-amber-200 hover:bg-neutral-900"
                }`}
            >
              <span>{f.label}</span>
              <span
                className={`text-xs rounded-full px-2 py-0.5
                  ${filterStatus === f.key ? "bg-black/20 text-black/80" : "bg-neutral-900 text-amber-300 border border-amber-500/20"}`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-600 transition-colors"
        >
          <FiPlus className="h-4 w-4" />
          Add Category
        </button>
      </section>

      {/* Table / List */}
      <section className="rounded-lg border border-amber-500/20 bg-neutral-950">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              <span className="font-medium text-amber-100">Loading categories...</span>
            </div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-md bg-neutral-900 border border-amber-500/20">
              <FiLayers className="text-amber-300" />
            </div>
            <h3 className="text-lg font-semibold text-amber-50">No Categories Found</h3>
            <p className="text-sm text-amber-200/70 mt-1">Create your first category to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-500/20 bg-neutral-900">
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-amber-200/80">
                    Name
                  </th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-amber-200/80">
                    ID
                  </th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-amber-200/80">
                    Status
                  </th>
                  <th scope="col" className="text-right px-4 py-3 font-semibold text-amber-200/80">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id} className="border-b border-amber-500/10 hover:bg-neutral-900/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 border border-amber-500/20">
                          <FiTag className="text-amber-300" />
                        </span>
                        <span className="font-medium text-amber-100">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-amber-300/70">
                      <div className="inline-flex items-center gap-1">
                        <FiTrendingUp className="h-3.5 w-3.5" />
                        <span>…{category._id.slice(-6)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-xs font-medium
                          ${
                            category.isListed ? "border-green-500/30 text-green-400" : "border-red-500/30 text-red-400"
                          }`}
                      >
                        {category.isListed ? "Listed" : "Unlisted"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category)
                            setUpdatedName(category.name)
                          }}
                          className="inline-flex items-center gap-2 rounded-md border border-amber-500/20 bg-neutral-900 px-3 py-2 text-amber-200 hover:bg-neutral-800 transition-colors"
                          aria-label={`Edit ${category.name}`}
                        >
                          <FiEdit3 className="h-4 w-4" />
                          Edit
                        </button>

                        <button
                          onClick={() => confirmToggleStatus(category._id)}
                          className={`inline-flex items-center justify-center rounded-md border px-3 py-2 transition-colors
                            ${
                              category.isListed
                                ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                                : "border-green-500/30 text-green-400 hover:bg-green-500/10"
                            }`}
                          title={category.isListed ? "Unlist Category" : "List Category"}
                          aria-label={category.isListed ? `Unlist ${category.name}` : `List ${category.name}`}
                        >
                          {category.isListed ? (
                            <FiToggleRight className="h-4 w-4" />
                          ) : (
                            <FiToggleLeft className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Add Category Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowAddForm(false)} />
          <div className="relative w-full max-w-md rounded-lg border border-amber-500/20 bg-neutral-950 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-amber-200">Add Category</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-amber-500/20 bg-neutral-900 text-amber-200 hover:bg-neutral-800"
                aria-label="Close add category"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-amber-100">Category Name</label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => {
                    setNewCategory(e.target.value)
                    setErrors({})
                  }}
                  className={`w-full rounded-md border bg-neutral-900 px-3 py-2 text-sm text-amber-100 placeholder:text-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/30
                    ${errors.name ? "border-red-500/50" : "border-amber-500/20"}`}
                />
                {errors.name && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-red-400">
                    <FiAlertCircle className="h-3.5 w-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddCategory}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-600"
                >
                  <FiCheck className="h-4 w-4" />
                  Add Category
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="inline-flex items-center justify-center rounded-md border border-amber-500/20 bg-neutral-900 px-4 py-2 text-amber-200 hover:bg-neutral-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => {
              setEditingCategory(null)
              setUpdatedName("")
              setEditError("")
            }}
          />
          <div className="relative w-full max-w-md rounded-lg border border-amber-500/20 bg-neutral-950 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-amber-200">Edit Category</h2>
              <button
                onClick={() => {
                  setEditingCategory(null)
                  setUpdatedName("")
                  setEditError("")
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-amber-500/20 bg-neutral-900 text-amber-200 hover:bg-neutral-800"
                aria-label="Close edit category"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-amber-100">Category Name</label>
                <input
                  type="text"
                  placeholder="Update category name"
                  value={updatedName}
                  onChange={(e) => {
                    setUpdatedName(e.target.value)
                    setEditError("")
                  }}
                  className={`w-full rounded-md border bg-neutral-900 px-3 py-2 text-sm text-amber-100 placeholder:text-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/30
                    ${editError ? "border-red-500/50" : "border-amber-500/20"}`}
                />
                {editError && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-red-400">
                    <FiAlertCircle className="h-3.5 w-3.5" />
                    {editError}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleUpdateCategory}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                >
                  <FiSave className="h-4 w-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingCategory(null)
                    setUpdatedName("")
                    setEditError("")
                  }}
                  className="inline-flex items-center justify-center rounded-md border border-amber-500/20 bg-neutral-900 px-4 py-2 text-amber-200 hover:bg-neutral-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowConfirmModal(false)} />
          <div className="relative w-full max-w-md rounded-lg border border-amber-500/20 bg-neutral-950 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-amber-200">Confirm Action</h2>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-amber-500/20 bg-neutral-900 text-amber-200 hover:bg-neutral-800"
                aria-label="Close confirm"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-amber-200">
                Are you sure you want to{" "}
                {categories.find((c) => c._id === categoryToToggle)?.isListed ? "unlist" : "list"} this category?
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(categoryToToggle)}
                  className="inline-flex flex-1 items-center justify-center rounded-md bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="inline-flex items-center justify-center rounded-md border border-amber-500/20 bg-neutral-900 px-4 py-2 text-amber-200 hover:bg-neutral-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryManagement
