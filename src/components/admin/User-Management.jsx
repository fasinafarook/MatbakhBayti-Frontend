"use client";

import { useState } from "react";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { users } from "../../constants/admin/UserManagementApi";
// ==== Custom UI Components ====

const Card = ({ children, className }) => (
  <div className={`rounded-lg border ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Input = ({ className, ...props }) => (
  <input
    {...props}
    className={`w-full px-3 py-2 rounded text-sm bg-black text-white border border-yellow-500/20 ${className}`}
  />
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center px-3 py-2 rounded text-sm font-medium transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${className}`}>
    {children}
  </span>
);

// ==== User Management Page ====

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");



  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "VIP":
        return "bg-yellow-500/20 text-yellow-400";
      case "Active":
        return "bg-green-500/20 text-green-400";
      case "Inactive":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">
            Manage customer accounts and view their order history.
          </p>
        </div>
        <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-gray-900 border-yellow-500/20">
            <CardContent>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </div>
                <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className="h-4 w-4" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="h-4 w-4" />
                  {user.address}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <span className="text-gray-400 text-sm">Total Orders</span>
                  <div className="text-white font-semibold">{user.totalOrders}</div>
                </div>
                <div className="bg-black p-3 rounded-lg">
                  <span className="text-gray-400 text-sm">Total Spent</span>
                  <div className="text-yellow-500 font-semibold">{user.totalSpent}</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Last order: {user.lastOrder}</span>
                <div className="flex gap-2">
                  <Button className="border border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10 bg-transparent">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button className="border border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
