// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const API = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, 
// });

// export default API;
import axios from "axios";

// Check if it's development or production
const isDev = import.meta.env.VITE_ENV === "development";

// Dynamically choose the base URL
const BASE_URL = isDev
  ? import.meta.env.VITE_DEV_BASE_URL
  : import.meta.env.VITE_PROD_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default API;
