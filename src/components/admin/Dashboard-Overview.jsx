"use client"

import { Clock } from "lucide-react"
import { stats, recentOrders } from "../../constants/admin/DashboardApi"

const Card = ({ children, className }) => (
  <div className={`rounded-lg border ${className}`}>{children}</div>
)

const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b border-yellow-500/10 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
)

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
)

// ==== Dashboard Overview ====
export function DashboardOverview() {
  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your restaurant today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-gray-900 border-yellow-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-yellow-500">{stat.change} from last month</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Orders */}
      <Card className="bg-gray-900 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-black rounded-lg border border-yellow-500/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{order.id}</span>
                    <span className="text-gray-400 text-sm">{order.customer}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm">{order.items}</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {order.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-yellow-500 font-medium">{order.total}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Delivered"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "Preparing"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
