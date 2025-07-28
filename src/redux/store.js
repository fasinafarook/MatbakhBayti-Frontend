import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slices/userAuthSlice'
import adminAuthReducer from "./slices/adminAuthSlice";
import cartReducer from "./slices/cartAuthSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    cart: cartReducer,
  },
});