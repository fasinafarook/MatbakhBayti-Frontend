"use client"

import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingCart,
  Users,
  Settings as SettingsIcon,
  ChefHat,
  X,
} from "lucide-react"

import clsx from "clsx"

function Button({ children, className, ...props }) {
  return (
    <button
      className={clsx(
        "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function Sidebar({ activeTab, setActiveTab, isOpen = true, onClose = () => {} }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "menu", label: "Menu Management", icon: UtensilsCrossed },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-full bg-black border-r border-yellow-500/20 flex-col fixed z-40">
        <div className="p-6 border-b border-yellow-500/20">
          <div className="flex items-center gap-3">
            <ChefHat className="h-8 w-8 text-yellow-500" />
            <h1 className="text-xl font-bold text-white">FoodAdmin</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                className={clsx(
                  "w-full justify-start gap-3",
                  activeTab === item.id
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "text-white hover:bg-yellow-500/10 hover:text-yellow-500"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 h-full bg-black border-r border-yellow-500/20 flex flex-col">
            <div className="p-4 border-b border-yellow-500/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-yellow-500" />
                <h1 className="text-lg font-bold text-white">FoodAdmin</h1>
              </div>
              <button onClick={onClose}>
                <X className="text-white" />
              </button>
            </div>
            

            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    className={clsx(
                      "w-full justify-start gap-3",
                      activeTab === item.id
                        ? "bg-yellow-500 text-black hover:bg-yellow-400"
                        : "text-white hover:bg-yellow-500/10 hover:text-yellow-500"
                    )}
                    onClick={() => {
                      setActiveTab(item.id)
                      onClose()
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>

          {/* Overlay */}
          <div className="flex-1 bg-black/60" onClick={onClose}></div>
        </div>
      )}
    </>
  )
}
