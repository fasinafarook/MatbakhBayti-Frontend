import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminDashboard } from "../pages/admin/AdminPage";
import AdminLogin from "../pages/admin/loginPage";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
