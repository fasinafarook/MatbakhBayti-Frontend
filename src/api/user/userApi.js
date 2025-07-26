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

