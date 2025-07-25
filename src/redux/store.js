import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slices/userAuthSlice'
import adminAuthReducer from "./slices/adminAuthSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,

  },
});