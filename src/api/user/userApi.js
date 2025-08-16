import API from "../axios/axiosInstance";

// Signup API
export const signupUser = async (data) => {
  return await API.post("/user/signup", data);
};

// OTP Verification API
export const verifyOtp = async (data) => {
  return await API.post("/user/verify-otp", data);
};

export const resendOtp = (data) => API.post("/user/resend-otp", data);

// Login API
export const loginUser = async (data) => {
  return await API.post("/user/login", data);
};

// Refresh Token API (if needed)
export const refreshAccessToken = async () => {
  return await API.get("/user/refresh-token");
};

// Logout API
export const logoutUser = async () => {
  return await API.post("/user/logout");
};


export const getMenuItems = async () => {
  return await API.get("/user/products"); 
};
export const getAllCategories = async () => {
  return await API.get("/user/category");
};


export const fetchUserCart = async () => {
  const res = await API.get("/user/cart");
  return res.data.data;
};

export const addItemToCart = async (productId, quantity) => {
  const res = await API.post("/user/add-cart", { productId, quantity });
  return res.data.data;
};

export const updateCartItemQuantity = async (productId, quantity) => {
  const res = await API.put("/user/update-cart", { productId, quantity });
  return res.data.data;
};

export const removeCartItem = async (productId) => {
  const res = await API.delete("/user/remove-cart", {
    data: { productId }, 
  });
  return res.data.data;
};
export const clearUserCart = async () => {
  const res = await API.delete("/user/clear-cart");
  return res.data.message;
};


export const placeOrderAPI = async ({ paymentMethod, shippingAddress }) => {
  const res = await API.post("/user/order", { paymentMethod, shippingAddress });
  return res.data;
};

export const fetchUserAddresses = async () => {
  const res = await API.get("/user/addresses");
  return res.data;
};
export const updateAddressAPI = async (orderId, addressData) => {
  const response = await API.put(`/user/update-address/${orderId}`, addressData);
  return response.data;
};


export const fetchUserOrders = async () => {
  const response = await API.get('/user/orders/my-orders');
  return response.data;
};

export const fetchOrderDetails = async (orderId) => {
  const response = await API.get(`/user/orders/${orderId}`);
  return response.data;
};

export const cancelOrderAPI = async (orderId) => {
  const response = await API.patch(`/user/orders/${orderId}/cancel`);
  return response.data;
};

export const cancelOrderItemAPI = (orderId, itemId) =>
  API.patch(`/user/orders/${orderId}/items/${itemId}/cancel`);