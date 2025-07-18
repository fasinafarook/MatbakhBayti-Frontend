import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Star } from "lucide-react";
import { menuItems } from "../../constants/menuItem";
import { categories } from "../../constants/category";
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

// Main MenuManagement component
export function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");


 
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Menu Management</h1>
          <p className="text-gray-400">Manage your restaurant's menu items and categories.</p>
        </div>
        <Button className="bg-yellow-500 text-black hover:bg-yellow-400 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Item
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-yellow-500/20 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
  <Button
    key={category.name}
    onClick={() => setSelectedCategory(category.name)}
    className={
      selectedCategory === category.name
        ? "bg-yellow-500 text-black hover:bg-yellow-400"
        : "border border-yellow-500/20 text-white hover:bg-yellow-500/10"
    }
  >
    {category.name} ({category.count})
  </Button>
))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-gray-900 border-yellow-500/20">
            <CardContent>
              <div className="flex items-start gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded bg-gray-800"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <Badge
                      className={
                        item.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{item.category}</p>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-yellow-500 font-bold">{item.price}</span>
                    <span className="flex items-center gap-1 text-white text-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      {item.rating}
                    </span>
                    <span className="text-gray-400 text-sm">{item.orders} orders</span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="border border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10 bg-transparent">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button className="border border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10 bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button className="border border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent">
                      <Trash2 className="h-4 w-4" />
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
