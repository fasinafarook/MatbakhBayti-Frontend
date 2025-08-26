import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLoginPage";
import { AdminDashboard } from "../pages/admin/AdminPage";
import AdminNotFound from "../components/admin/AdminNotFound";
import { DashboardOverview } from "../components/admin/Dashboard-Overview";
import { MenuManagement } from "../components/admin/MenuManagement";
import { OrderManagement } from "../components/admin/OrderManagement";
import UserManagement from "../components/admin/User-Management";
import { Settings } from "../components/admin/settings";
import CategoryManagement from "../components/admin/CategoryManagement";
const AdminRoutes = () => {
  return (
    
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminDashboard />}>
          <Route index element={<DashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="category" element={<CategoryManagement />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
                  {/* <Route path="*" element={<AdminNotFound/>} /> */}

        </Route>
     
    </Routes>
  );
};

export default AdminRoutes;
