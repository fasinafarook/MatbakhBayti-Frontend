import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage (if available)
const storedAdmin = JSON.parse(localStorage.getItem("adminAuth"));

const initialState = {
  isAuthenticated: storedAdmin?.token ? true : false,
  admin: storedAdmin?.admin || null,
  token: storedAdmin?.token || null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogin(state, action) {
      state.isAuthenticated = true;
      state.admin = action.payload.admin;
      state.token = action.payload.token;

      // save to localStorage
      localStorage.setItem(
        "adminAuth",
        JSON.stringify({
          admin: state.admin,
          token: state.token,
        })
      );
    },
    adminLogout(state) {
      state.isAuthenticated = false;
      state.admin = null;
      state.token = null;

      // remove from localStorage
      localStorage.removeItem("adminAuth");
    },
    setAdminData(state, action) {
      state.admin = action.payload;

      // update admin data in localStorage (keep token)
      const current = JSON.parse(localStorage.getItem("adminAuth")) || {};
      localStorage.setItem(
        "adminAuth",
        JSON.stringify({
          ...current,
          admin: action.payload,
        })
      );
    },
  },
});

export const { adminLogin, adminLogout, setAdminData } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
