"use client"
import { useEffect, useState } from "react"
import { Clock, TrendingUp, Users, Package, ShoppingCart, DollarSign, Eye, BarChart3 } from "lucide-react"
import { getDashboardData } from "../../api/admin/adminApi"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line
} from 'recharts'

export function DashboardOverview() {
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData()
        setDashboardData(data)
      } catch (err) {
        console.error("Error fetching dashboard:", err)
      }
    }
    fetchData()
  }, [])

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900/20 via-black to-amber-950/30 flex items-center justify-center">
        <div className="text-amber-400 text-xl font-semibold animate-pulse">Loading dashboard...</div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Users",
      value: dashboardData.stats.users,
      icon: Users,
      color: "from-blue-500/20 to-blue-600/20",
      textColor: "text-blue-400",
      change: "+5%",
    },
    {
      title: "Total Products",
      value: dashboardData.stats.products,
      icon: Package,
      color: "from-purple-500/20 to-purple-600/20",
      textColor: "text-purple-400",
      change: "+3%",
    },
    {
      title: "Total Orders",
      value: dashboardData.stats.orders,
      icon: ShoppingCart,
      color: "from-amber-500/20 to-amber-600/20",
      textColor: "text-amber-400",
      change: "+8%",
    },
    {
      title: "Revenue",
      value: `₹${dashboardData.stats.revenue}`,
      icon: DollarSign,
      color: "from-green-500/20 to-green-600/20",
      textColor: "text-green-400",
      change: "+12%",
    },
  ]

  const statusColors = {
    pending: "#eab308", // amber-500
    confirmed: "#3b82f6", // blue-500
    shipped: "#8b5cf6", // purple-500
    delivered: "#22c55e", // green-500
    cancelled: "#ef4444", // red-500
  }

  const orderStatusData = (dashboardData.orderStatusData || []).map((s) => ({
    ...s,
    color: statusColors[s.status.toLowerCase()] || "#6b7280", // gray-500
  }))

  const monthlyData = dashboardData.monthlyData || []
  
  // Prepare data for charts
  const barChartData = monthlyData.map(item => ({
    name: item.month,
    orders: item.orders,
    revenue: item.revenue,
  }))
  
  const COLORS = ['#eab308', '#3b82f6', '#8b5cf6', '#22c55e', '#ef4444'];

  // Custom tooltip style for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-sm border border-amber-500/30 rounded-lg p-3">
          <p className="text-amber-400 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="text-white" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'revenue' ? `₹${entry.value}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/20 via-black to-amber-950/30 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
          Dashboard Overview
        </h1>
        <p className="text-amber-200/70 text-lg">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-400/40 transition-all duration-300 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} border border-amber-500/30`}>
                  <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-sm text-amber-200/70 mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Performance Bar Chart */}
        <div className="bg-gradient-to-br from-amber-900/10 via-black/50 to-amber-950/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-semibold text-white">Monthly Performance</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" opacity={0.3} />
                <XAxis dataKey="name" stroke="#fbbf24" />
                <YAxis stroke="#fbbf24" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="orders" fill="#eab308" name="Orders" />
                <Bar dataKey="revenue" fill="#22c55e" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Distribution Pie Chart */}
        <div className="bg-gradient-to-br from-amber-900/10 via-black/50 to-amber-950/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-semibold text-white">Order Status Distribution</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="status"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Trend Line Chart */}
      <div className="bg-gradient-to-br from-amber-900/10 via-black/50 to-amber-950/20 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-semibold text-white">Revenue Trend</h3>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" opacity={0.3} />
              <XAxis dataKey="name" stroke="#fbbf24" />
              <YAxis stroke="#fbbf24" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} name="Revenue (₹)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-900/10 via-black/50 to-amber-950/20 backdrop-blur-sm border border-amber-500/20 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardData.recentOrders.map((order, index) => (
              <div
                key={order.id}
                className="bg-gradient-to-br from-amber-900/20 via-black/40 to-amber-950/30 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500/30 to-amber-600/40 rounded-xl flex items-center justify-center border border-amber-500/30">
                      <ShoppingCart className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg group-hover:text-amber-200 transition-colors">
                        {order.customer}
                      </p>
                      <p className="text-amber-200/60 text-sm">Order #{order.id.slice(-8)}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gradient-to-r from-amber-500/20 to-amber-600/30 text-amber-300 px-3 py-2 rounded-full border border-amber-500/30 font-medium">
                    {order.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-amber-200/70 text-sm mb-2">Items:</p>
                  <p className="text-white font-medium">{order.items}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
                  <span className="text-amber-200/70 text-sm">Total Amount</span>
                  <span className="text-amber-400 font-bold text-xl">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}