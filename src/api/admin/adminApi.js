import API from "../axios/axiosInstance";
export const login = async (data) => {
  const res = await API.post('/admin/login', data);
  return res.data;
};
export const logout = async () => {
  const res = await API.post('/admin/logout');
  return res.data;
};

// Get all categories
export const getAllCategories = async () => {
  const res = await API.get("/admin/categories");
  return res.data;
};

// Add a new category
export const addCategory = async (name) => {
  const res = await API.post("/admin/category", { name });
  return res.data;
};

// Update a category name
export const updateCategory = async (id, name) => {
  const res = await API.put(`/admin/category/${id}`, { name });
  return res.data;
};

// Toggle category isListed status
export const toggleCategoryStatus = async (id) => {
  const res = await API.patch(`/admin/category/${id}/toggle-list`);
  return res.data;
};

// Get all products
export const getAllProducts = async () => {
  const res = await API.get("/admin/products");
  return res.data;
};

// Toggle product listing status
export const toggleProductListing = async (id) => {
  const res = await API.patch(`/admin/product/${id}/toggle-list`);
  return res.data;
}

// Update product
export const updateProduct = async (id, data) => {
  const res = await API.patch(`/admin/product/${id}`, data);
  return res.data;
};

// Add new product
export const addProduct = async (formData) => {
  try {
    const response = await API.post("/admin/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch all users
export const getAllUsers = async () => {
  const res = await API.get('/admin/users');
  return res.data;
};

export const toggleBlockUser = async (id) =>
  await API.patch(`/admin/user/${id}/toggle-block`);

// Fetch all orders
export const getAllOrders = async () => {
  const response = await API.get('/admin/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await API.patch(`/admin/orders/${orderId}/status`, { status });
  return response.data;
};

export const getDashboardData = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};