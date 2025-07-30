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

