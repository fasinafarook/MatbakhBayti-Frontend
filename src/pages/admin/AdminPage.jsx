"use client"

import { useState } from "react"
import { Sidebar } from "../../components/admin/side-bar"
import { DashboardOverview } from "../../components/admin/Dashboard-Overview"
import { MenuManagement } from "../../components/admin/MenuManagement"
import { OrderManagement } from "../../components/admin/OrderManagement"
import { UserManagement } from "../../components/admin/User-Management"
import { Settings } from "../../components/admin/settings"
import Navbar from "../../components/admin/Navbar"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "menu":
        return <MenuManagement />
      case "orders":
        return <OrderManagement />
      case "users":
        return <UserManagement />
      case "settings":
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Navbar: toggleSidebar passed down */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />

      {/* Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black p-4 pt-[64px] md:ml-64">
        {renderContent()}
      </main>
    </div>
  )
}
