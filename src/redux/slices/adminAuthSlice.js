import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  admin: null,
  token: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogin(state, action) {
      state.isAuthenticated = true;
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    adminLogout(state) {
      state.isAuthenticated = false;
      state.admin = null;
      state.token = null;
    },
    setAdminData(state, action) {
      state.admin = action.payload;
    },
  },
});

export const { adminLogin, adminLogout, setAdminData } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
