import { createSlice } from "@reduxjs/toolkit";
const storedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  isAuthenticated: storedAuth?.token ? true : false,
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setUserData(state, action) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;