"use client";

import { useEffect, useState } from "react";
import {
  getAllProducts,
  getAllCategories,
  addProduct,
  updateProduct,
  toggleProductListing,
} from "../../api/admin/adminApi";
import {
  FiPlus,
  FiSearch,
  FiEdit3,
  FiEye,
  FiStar,
  FiFilter,
  FiGrid,
  FiList,
  FiUpload,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiDollarSign,
  FiTag,
  FiImage,
  FiFileText,
  FiToggleLeft,
  FiToggleRight,
  FiTrendingUp,
  FiPackage,
  FiZap,
  FiHeart,
} from "react-icons/fi";
import { Clock3 } from "lucide-react";

import Swal from "sweetalert2";

// Ultra Compact Product Form Modal
function ProductFormModal({
  mode = "add",
  onSubmit,
  categories,
  product,
  onClose,
}) {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    category: product?.category?._id || "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(product?.image || null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category?._id || "",
        preparationTime: product.preparationTime || "",
        type: product.type || "",
        image: null,
      });
      setImagePreview(product.image);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });

    try {
      await onSubmit(fd);
      Swal.fire({
        title: "Success!",
        text: `Product ${mode === "edit" ? "updated" : "added"} successfully`,
        icon: "success",
        background: "rgba(0, 0, 0, 0.9)",
        color: "#ffffff",
        confirmButtonColor: "#f59e0b",
        timer: 2000,
        showConfirmButton: false,
      });
      onClose();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        Swal.fire({
          title: "Error!",
          text: `Failed to ${mode === "edit" ? "update" : "add"} product`,
          icon: "error",
          background: "rgba(0, 0, 0, 0.9)",
          color: "#ffffff",
          confirmButtonColor: "#f59e0b",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3">
      {/* Advanced Backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10"></div>
        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-yellow-400/80 rounded-full animate-ping"></div>
        <div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-orange-400/80 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-yellow-300/60 rounded-full animate-ping delay-300"></div>
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
        ></div>
      </div>

      {/* Ultra Compact Modal */}
      <div className="relative w-full max-w-sm sm:max-w-md max-h-[85vh] overflow-y-auto transform transition-all duration-700 ease-out scale-95 hover:scale-100">
        {/* Floating orbs */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 w-20 h-20 bg-gradient-to-l from-orange-500/20 to-yellow-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

        {/* Glass Modal */}
        <div className="relative backdrop-blur-3xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-2xl border border-white/30 shadow-2xl overflow-hidden">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/30 via-transparent to-orange-500/30 p-[1px] animate-pulse">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-black/50 via-black/40 to-black/50"></div>
          </div>

          <div className="relative z-10">
            {/* Minimal Header */}
            <div className="px-4 py-3 border-b border-white/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <FiPackage className="text-yellow-400 text-sm" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {mode === "edit" ? "Edit Product" : "Add Product"}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>

            {/* Ultra Compact Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              {/* Compact Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                  <FiImage className="text-yellow-400 text-xs" />
                  Image
                </label>
                <div className="relative group">
                  <div className="w-full h-20 backdrop-blur-md bg-white/10 border border-dashed border-white/30 rounded-lg flex items-center justify-center hover:border-yellow-400/50 transition-all duration-300">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <FiUpload className="text-white text-sm" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FiUpload className="text-gray-400 text-lg mb-0.5 mx-auto" />
                        <p className="text-gray-400 text-xs">Upload</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {errors.image && (
                  <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
                    <FiAlertCircle size={10} />
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Compact Two Column Layout */}
              <div className="grid grid-cols-2 gap-3">
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                    <FiTag className="text-yellow-400 text-xs" />
                    Name
                  </label>
                  <input
                    name="name"
                    placeholder="Product name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-2 py-2 backdrop-blur-md bg-white/10 border rounded-lg focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-xs ${
                      errors.name ? "border-red-500/50" : "border-white/30"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
                      <FiAlertCircle size={10} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                    <FiDollarSign className="text-yellow-400 text-xs" />
                    Price
                  </label>
                  <input
                    name="price"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    className={`w-full px-2 py-2 backdrop-blur-md bg-white/10 border rounded-lg focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-xs ${
                      errors.price ? "border-red-500/50" : "border-white/30"
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
                      <FiAlertCircle size={10} />
                      {errors.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                  <FiFilter className="text-yellow-400 text-xs" />
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full px-2 py-2 backdrop-blur-md bg-white/10 border rounded-lg focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white appearance-none cursor-pointer text-xs ${
                    errors.category ? "border-red-500/50" : "border-white/30"
                  }`}
                >
                  <option value="" className="bg-gray-800 text-white">
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                      className="bg-gray-800 text-white"
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
                    <FiAlertCircle size={10} />
                    {errors.category}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded"
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Vegan">Vegan</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                  <FiFileText className="text-yellow-400 text-xs" />
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Product description"
                  value={form.description}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full px-2 py-2 backdrop-blur-md bg-white/10 border rounded-lg focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 resize-none text-xs ${
                    errors.description ? "border-red-500/50" : "border-white/30"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
                    <FiAlertCircle size={10} />
                    {errors.description}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-white mb-1 flex items-center gap-1">
                  <FiTrendingUp className="text-yellow-400 text-xs" />
                  Preparation Time
                </label>
                <input
                  name="preparationTime"
                  placeholder="E.g., 20 mins"
                  value={form.preparationTime}
                  onChange={handleChange}
                  className="w-full px-2 py-2 backdrop-blur-md bg-white/10 border rounded-lg focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-xs border-white/30"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-1.5 relative overflow-hidden group text-xs"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>{mode === "edit" ? "Updating..." : "Adding..."}</span>
                  </div>
                ) : (
                  <>
                    <FiCheck size={14} />
                    <span>
                      {mode === "edit" ? "Update Product" : "Add Product"}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Minimal Footer */}
            <div className="px-4 py-2 border-t border-white/20 bg-gradient-to-r from-black/30 to-black/20">
              <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                <FiZap className="text-yellow-400 text-xs" />
                <span>Quick & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component with Navbar Spacing
export function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const prod = await getAllProducts();
      const { categories: catArray } = await getAllCategories();
      const listedCategories = catArray.filter((cat) => cat.isListed);
      setProducts(prod);
      setCategories(listedCategories);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async (formData) => {
    await addProduct(formData);
    setShowAddModal(false);
    fetchData();
  };

  const handleEditProduct = async (formData) => {
    if (!selectedProduct) return;
    await updateProduct(selectedProduct._id, formData);
    setShowEditModal(false);
    setSelectedProduct(null);
    fetchData();
  };

  const handleToggleListing = async (id) => {
    const product = products.find((p) => p._id === id);
    const action = product.isListed ? "unlist" : "list";

    const result = await Swal.fire({
      title: `Are you sure?`,
      html: `You are about to <strong>${action}</strong> this product.`,
      icon: "warning",
      background: "rgba(0, 0, 0, 0.9)",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: "Cancel",
      customClass: {
        popup: "small-swal-popup",
      },
    });

    if (result.isConfirmed) {
      try {
        await toggleProductListing(id);
        fetchData();
        Swal.fire({
          title: `${action === "list" ? "Listed!" : "Unlisted!"}`,
          text: `Product has been ${action}ed.`,
          icon: "success",
          background: "rgba(0, 0, 0, 0.9)",
          color: "#ffffff",
          confirmButtonColor: "#f59e0b",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to toggle product listing",
          icon: "error",
          background: "rgba(0, 0, 0, 0.9)",
          color: "#ffffff",
          confirmButtonColor: "#f59e0b",
        });
      }
    }
  };

  const filteredItems = products.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === "All" || item.category?.name === selectedCategory;
    return nameMatch && categoryMatch;
  });

  const stats = {
    total: products.length,
    listed: products.filter((p) => p.isListed).length,
    unlisted: products.filter((p) => !p.isListed).length,
    categories: categories.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navbar Spacing - Account for fixed navbar */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/4 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Unique Header Section */}
<div className="backdrop-blur-2xl bg-black/60 rounded-3xl 
                border border-yellow-500/50 
                shadow-[0_0_20px_rgba(255,215,0,0.25)] 
                p-6 sm:p-8 mb-8 relative overflow-hidden">
            {/* Header background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-orange-500/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
                  <FiPackage className="text-yellow-400 text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                    Menu Management
                  </h1>
                  <p className="text-gray-300 mt-1 flex items-center gap-2">
                    <FiZap className="text-yellow-400 text-sm" />
                    Manage your restaurant's delicious offerings
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:rotate-1 flex items-center gap-3 shadow-lg hover:shadow-2xl"
              >
                <FiPlus size={20} />
                Add New Item
              </button>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Products",
                value: stats.total,
                icon: FiPackage,
                color: "blue",
                gradient: "from-blue-500/20 to-blue-600/20",
              },
              {
                label: "Listed Items",
                value: stats.listed,
                icon: FiCheck,
                color: "green",
                gradient: "from-green-500/20 to-green-600/20",
              },
              {
                label: "Unlisted Items",
                value: stats.unlisted,
                icon: FiX,
                color: "red",
                gradient: "from-red-500/20 to-red-600/20",
              },
              {
                label: "Categories",
                value: stats.categories,
                icon: FiFilter,
                color: "yellow",
                gradient: "from-yellow-500/20 to-orange-500/20",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl bg-gradient-to-br ${stat.gradient} rounded-2xl border border-white/20 shadow-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:-rotate-1 group`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-white mt-1 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm border shadow-lg group-hover:rotate-12 transition-transform duration-300 ${
                      stat.color === "blue"
                        ? "bg-blue-500/30 text-blue-400 border-blue-500/40"
                        : stat.color === "green"
                        ? "bg-green-500/30 text-green-400 border-green-500/40"
                        : stat.color === "red"
                        ? "bg-red-500/30 text-red-400 border-red-500/40"
                        : "bg-yellow-500/30 text-yellow-400 border-yellow-500/40"
                    }`}
                  >
                    <stat.icon size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Controls Section */}
<div className="backdrop-blur-2xl bg-black/60 rounded-3xl 
                border border-yellow-500/40 shadow-[0_0_25px_rgba(255,215,0,0.3)] 
                p-6 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/3 via-transparent to-orange-500/3"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Enhanced Search Bar */}
                <div className="flex-1 relative group">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-400 transition-colors group-hover:scale-110" />
                  <input
                    type="text"
                    placeholder="Search delicious menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl focus:border-yellow-400/60 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 hover:bg-white/15"
                  />
                </div>

                {/* Enhanced View Mode Toggle */}
                <div className="flex items-center gap-2 backdrop-blur-md bg-white/15 border border-white/30 rounded-2xl p-2 shadow-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg scale-110"
                        : "text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105"
                    }`}
                  >
                    <FiGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg scale-110"
                        : "text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105"
                    }`}
                  >
                    <FiList size={18} />
                  </button>
                </div>
              </div>

              {/* Enhanced Category Filters */}
              <div className="flex gap-2 flex-wrap mt-4 ">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    selectedCategory === "All"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
                      : "backdrop-blur-md bg-white/10 border border-white/30 text-white hover:bg-white/20"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
                        : "backdrop-blur-md bg-white/10 border border-white/30 text-white hover:bg-white/20"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Section */}
<div className="backdrop-blur-2xl bg-black/60 rounded-3xl 
                border border-yellow-500/40 shadow-[0_0_25px_rgba(255,215,0,0.3)] 
                overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white font-medium">
                    Loading delicious products...
                  </span>
                </div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-400/20 to-gray-500/20 rounded-3xl flex items-center justify-center mb-4">
                  <FiPackage className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="p-4 sm:p-6">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredItems.map((item) => (
                      <div
                        key={item._id}
                        className="backdrop-blur-xl bg-black/60 rounded-2xl 
             border border-yellow-500/40 overflow-hidden 
             shadow-lg hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] 
             transition-all duration-500 group hover:scale-105 hover:rotate-1"
                      >
                        {/* Image Section */}
                        <div className="relative h-44 sm:h-52 overflow-hidden">
                          <img
                            src={
                              item.image ||
                              "/placeholder.svg?height=200&width=300&query=delicious food item"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                          {/* Status Badge */}
                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border 
        ${
          item.isListed
            ? "bg-green-600/20 text-green-300 border-green-400/40"
            : "bg-red-600/20 text-red-300 border-red-400/40"
        }`}
                            >
                              {item.isListed ? "Listed" : "Unlisted"}
                            </span>
                          </div>

                          {/* Star Badge */}
                          <div className="absolute top-3 left-3">
                            <div
                              className="w-8 h-8 bg-yellow-500/20 rounded-xl flex items-center justify-center 
                      border border-yellow-400/50 shadow-md"
                            >
                              <FiStar className="text-yellow-400 text-sm" />
                            </div>
                          </div>

                          {/* Heart Badge */}
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div
                              className="w-8 h-8 bg-red-500/20 rounded-xl flex items-center justify-center 
                      border border-red-400/50 shadow-md"
                            >
                              <FiHeart className="text-red-400 text-sm" />
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 sm:p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h3
                              className="text-white font-semibold text-base sm:text-lg truncate pr-2 
                     group-hover:text-yellow-300 transition-colors duration-300"
                            >
                              {item.name}
                            </h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium border 
        ${
          item.type === "Veg"
            ? "bg-green-900/60 text-green-300 border-green-500/40"
            : item.type === "Non-Veg"
            ? "bg-red-900/60 text-red-300 border-red-500/40"
            : "bg-yellow-900/60 text-yellow-300 border-yellow-500/40"
        }`}
                            >
                              {item.type}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-3 truncate group-hover:text-gray-200 transition-colors duration-300">
                            {item.category?.name}
                          </p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-yellow-400 font-bold text-lg sm:text-xl group-hover:text-yellow-300 transition-colors duration-300">
                              ₹{item.price}
                            </span>
                            <div className="flex items-center gap-1 text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                              <Clock3 className="w-3 h-3 text-yellow-300" />
                              <span className="font-medium">
                                {item.preparationTime || "N/A"}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                Swal.fire({
                                  title: item.name,
                                  text: item.description,
                                  imageUrl: item.image,
                                  imageWidth: 300,
                                  imageHeight: 200,
                                  background: "rgba(10, 10, 10, 0.95)",
                                  color: "#fff",
                                  confirmButtonColor: "#facc15",
                                })
                              }
                              className="flex-1 py-2 px-2 bg-black/40 text-yellow-300 border border-yellow-500/40 
                   rounded-xl hover:bg-black/60 transition-all duration-300 
                   flex items-center justify-center gap-1 hover:scale-105 
                   hover:shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                            >
                              <FiEye size={14} />
                              <span className="text-xs sm:text-sm">View</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProduct(item);
                                setShowEditModal(true);
                              }}
                              className="flex-1 py-2 px-2 bg-black/40 text-yellow-400 border border-yellow-500/40 
                   rounded-xl hover:bg-black/60 transition-all duration-300 
                   flex items-center justify-center gap-1 hover:scale-105 
                   hover:shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                            >
                              <FiEdit3 size={14} />
                              <span className="text-xs sm:text-sm">Edit</span>
                            </button>
                            <button
                              onClick={() => handleToggleListing(item._id)}
                              className={`p-2 border rounded-xl transition-all duration-300 hover:scale-110 
          ${
            item.isListed
              ? "bg-black/40 text-red-400 border-red-500/40 hover:shadow-[0_0_10px_rgba(239,68,68,0.6)]"
              : "bg-black/40 text-green-400 border-green-500/40 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)]"
          }`}
                            >
                              {item.isListed ? (
                                <FiToggleRight size={16} />
                              ) : (
                                <FiToggleLeft size={16} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {filteredItems.map((item) => (
                      <div
                        key={item._id}
                        className="backdrop-blur-md bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl border border-white/20 p-4 sm:p-6 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl group"
                      >
                        <div className="flex items-center gap-4 sm:gap-6">
                          <img
                            src={
                              item.image ||
                              "/placeholder.svg?height=80&width=80&query=food item"
                            }
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-white font-semibold text-base sm:text-lg truncate pr-2 group-hover:text-yellow-300 transition-colors duration-300">
                                {item.name}
                              </h3>
                              <div
                                className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border flex-shrink-0 shadow-lg ${
                                  item.isListed
                                    ? "bg-green-500/30 text-green-300 border-green-500/40"
                                    : "bg-red-500/30 text-red-300 border-red-500/40"
                                }`}
                              >
                                {item.isListed ? "Listed" : "Unlisted"}
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-2 truncate group-hover:text-gray-300 transition-colors duration-300">
                              {item.category?.name}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-yellow-400 font-bold text-lg sm:text-xl group-hover:text-yellow-300 transition-colors duration-300">
                                ₹{item.price}
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    Swal.fire({
                                      title: item.name,
                                      text: item.description,
                                      imageUrl: item.image,
                                      imageWidth: 300,
                                      imageHeight: 200,
                                      background: "rgba(0, 0, 0, 0.9)",
                                      color: "#ffffff",
                                      confirmButtonColor: "#f59e0b",
                                    })
                                  }
                                  className="p-2 backdrop-blur-md bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all duration-200 hover:scale-105"
                                >
                                  <FiEye size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedProduct(item);
                                    setShowEditModal(true);
                                  }}
                                  className="p-2 backdrop-blur-md bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200 hover:scale-105"
                                >
                                  <FiEdit3 size={16} />
                                </button>
                                <button
                                  onClick={() => handleToggleListing(item._id)}
                                  className={`p-2 backdrop-blur-md border rounded-xl transition-all duration-200 hover:scale-105 ${
                                    item.isListed
                                      ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                      : "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                                  }`}
                                >
                                  {item.isListed ? (
                                    <FiToggleRight size={16} />
                                  ) : (
                                    <FiToggleLeft size={16} />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modals */}
          {showAddModal && (
            <ProductFormModal
              mode="add"
              onSubmit={handleAddProduct}
              categories={categories}
              onClose={() => setShowAddModal(false)}
            />
          )}

          {showEditModal && selectedProduct && (
            <ProductFormModal
              mode="edit"
              onSubmit={handleEditProduct}
              product={selectedProduct}
              categories={categories}
              onClose={() => {
                setShowEditModal(false);
                setSelectedProduct(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
