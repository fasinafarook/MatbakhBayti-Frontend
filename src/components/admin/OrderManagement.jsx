import React, { useState } from "react";
import {
  Search,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Truck
} from "lucide-react";
import { orders ,statusOptions} from "../../constants/admin/OrderManagementApi";
// ----- UI COMPONENTS -----

function Card({ children, className }) {
  return <div className={`rounded-lg border p-2 ${className}`}>{children}</div>;
}

function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-3 py-2 rounded text-sm font-medium transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({ className, ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 text-sm bg-black border rounded ${className}`}
      {...props}
    />
  );
}

function Badge({ children, className }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

// ----- MAIN COMPONENT -----

export function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");


  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
      case "Preparing":
        return <Clock className="h-4 w-4" />;
      case "Out for Delivery":
        return <Truck className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "Cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-500/20 text-gray-400";
      case "Preparing":
        return "bg-yellow-500/20 text-yellow-400";
      case "Out for Delivery":
        return "bg-blue-500/20 text-blue-400";
      case "Delivered":
        return "bg-green-500/20 text-green-400";
      case "Cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Management</h1>
        <p className="text-gray-400">Track and manage all customer orders in real-time.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders by customer or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-yellow-500/20 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((status) => (
            <Button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={
                statusFilter === status
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "border border-yellow-500/20 text-white hover:bg-yellow-500/10"
              }
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="bg-gray-900 border-yellow-500/20">
            <CardContent>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div>
                    <div className="text-white font-semibold text-lg">{order.id}</div>
                    <div className="text-gray-400 text-sm">
                      {order.date} at {order.time}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-white font-medium">{order.customer}</div>
                    <div className="text-gray-400 text-sm">{order.email}</div>
                    <div className="text-gray-400 text-sm">{order.address}</div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div>
                    <div className="text-white text-sm font-medium">Items:</div>
                    <div className="text-gray-400 text-sm">{order.items.join(", ")}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-yellow-500 font-bold text-lg">{order.total}</span>
                    <Badge className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                    <Button className="border border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10 bg-transparent">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
