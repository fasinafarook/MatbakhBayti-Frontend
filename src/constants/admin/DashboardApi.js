
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"

export  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-yellow-500",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-yellow-500",
    },
    {
      title: "Active Users",
      value: "856",
      change: "+15.3%",
      icon: Users,
      color: "text-yellow-500",
    },
    {
      title: "Growth Rate",
      value: "23.1%",
      change: "+2.4%",
      icon: TrendingUp,
      color: "text-yellow-500",
    },
  ]

export  const recentOrders = [
    {
      id: "#1234",
      customer: "John Doe",
      items: "Pizza Margherita, Coke",
      total: "$25.99",
      status: "Delivered",
      time: "2 min ago",
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      items: "Burger Combo",
      total: "$18.50",
      status: "Preparing",
      time: "5 min ago",
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      items: "Pasta Carbonara",
      total: "$22.00",
      status: "Pending",
      time: "8 min ago",
    },
    {
      id: "#1237",
      customer: "Sarah Wilson",
      items: "Caesar Salad, Water",
      total: "$15.75",
      status: "Delivered",
      time: "12 min ago",
    },
  ]
