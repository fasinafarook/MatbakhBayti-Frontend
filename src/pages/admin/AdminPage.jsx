"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/admin/side-bar";
import Navbar from "../../components/admin/Navbar";
import { Outlet } from "react-router-dom";

export function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-black">
      <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto bg-black p-4 pt-[64px] md:ml-64 text-white">
        <Outlet />
      </main>
    </div>
  );
}
