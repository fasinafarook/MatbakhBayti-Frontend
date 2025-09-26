import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Loader2,
  MoreHorizontal,
  Package,
  User,
  MapPin,
  Calendar,
  DollarSign,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { getAllOrders, updateOrderStatus } from "../../api/admin/adminApi";

const CustomButton = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-amber-500 text-black hover:bg-amber-600",
    outline:
      "border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white",
    ghost: "hover:bg-slate-700 hover:text-white text-slate-300",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const CustomInput = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const CustomBadge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-amber-500 text-black hover:bg-amber-600",
    outline: "border border-amber-500/30 bg-amber-500/20 text-amber-400",
    secondary: "bg-slate-600 text-white",
    destructive: "bg-red-600 text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const CustomCard = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-lg border border-slate-700 bg-slate-800 text-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

const CustomCardHeader = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

const CustomCardTitle = ({ children, className = "" }) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight text-white ${className}`}
    >
      {children}
    </h3>
  );
};

const CustomCardContent = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

const CustomSelect = ({ value, onValueChange, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="capitalize">{value}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-slate-600 bg-slate-700 shadow-lg">
          {children.map((child) =>
            React.cloneElement(child, {
              onClick: () => {
                onValueChange(child.props.value);
                setIsOpen(false);
              },
            })
          )}
        </div>
      )}
    </div>
  );
};

const CustomSelectItem = ({ value, children, onClick, className = "" }) => {
  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-white hover:bg-slate-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CustomDropdownMenu = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-slate-700 bg-slate-800 shadow-lg">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: () => {
                child.props.onClick?.();
                setIsOpen(false);
              },
            })
          )}
        </div>
      )}
    </div>
  );
};

const CustomDropdownMenuItem = ({ children, onClick, className = "" }) => {
  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-slate-300 hover:bg-slate-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg border border-slate-700 bg-slate-800 shadow-lg">
        {children}
      </div>
    </div>
  );
};

const CustomModalHeader = ({ children, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-slate-700">
      <div className="space-y-1.5">{children}</div>
      <button
        onClick={onClose}
        className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <X className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};

const CustomModalTitle = ({ children }) => {
  return <h2 className="text-lg font-semibold text-white">{children}</h2>;
};

const CustomModalDescription = ({ children }) => {
  return <p className="text-sm text-slate-400">{children}</p>;
};

export function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [updatingStatus, setUpdatingStatus] = useState({});

  const possibleStatuses = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];
  const statusOptions = ["all", ...possibleStatuses];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "confirmed":
        return "default";
      case "shipped":
        return "default";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Validate status transitions
  const isValidStatusChange = (currentStatus, newStatus) => {
    const validTransitions = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["shipped", "cancelled"],
      shipped: ["delivered", "cancelled"],
      delivered: [],
      cancelled: [],
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  };

  // Get allowed next statuses for current status
  const getAllowedStatuses = (currentStatus) => {
    return possibleStatuses.filter((status) =>
      isValidStatusChange(currentStatus, status)
    );
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const order = orders.find((o) => o._id === orderId);
      if (!order) return;

      // Validate transition
      if (!isValidStatusChange(order.status, newStatus)) {
        console.error(
          `Invalid status transition from ${order.status} to ${newStatus}`
        );
        return;
      }

      setUpdatingStatus((prev) => ({ ...prev, [orderId]: true }));

      // Update backend
      await updateOrderStatus(orderId, newStatus);

      // Update local state with proper item status handling
      setOrders(
        orders.map((order) => {
          if (order._id === orderId) {
            let updatedItems = order.items;

            // If order is cancelled or delivered, update all non-cancelled items
            if (newStatus === "cancelled" || newStatus === "delivered") {
              updatedItems = order.items.map((item) => ({
                ...item,
                status: item.status === "cancelled" ? "cancelled" : newStatus,
              }));
            }

            return { ...order, status: newStatus, items: updatedItems };
          }
          return order;
        })
      );

      // Update selected order if modal is open
      setSelectedOrder((prev) => {
        if (prev && prev._id === orderId) {
          let updatedItems = prev.items;

          if (newStatus === "cancelled" || newStatus === "delivered") {
            updatedItems = prev.items.map((item) => ({
              ...item,
              status: item.status === "cancelled" ? "cancelled" : newStatus,
            }));
          }

          return { ...prev, status: newStatus, items: updatedItems };
        }
        return prev;
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.shippingAddress.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleItemExpansion = (orderId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedItems(newExpanded);
  };

  const renderOrderItems = (order) => {
    const totalItems = order.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const isExpanded = expandedItems.has(order._id);

    if (order.items.length === 1) {
      const item = order.items[0];
      return (
        <div className="flex items-center gap-2">
          <CustomBadge
            variant="outline"
            className="bg-amber-500/20 text-amber-400 border-amber-500/30 font-medium"
          >
            {item.quantity}x
          </CustomBadge>
          <span className="text-sm text-white font-medium">
            {item.product?.name || "Product"}
          </span>
          {item.status === "cancelled" && (
            <span className="text-xs text-red-400">(Cancelled)</span>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div>
          <button
            onClick={() => toggleItemExpansion(order._id)}
            className="flex items-center gap-2 hover:bg-slate-700/50 p-2 rounded-md transition-colors w-full text-left"
          >
            <CustomBadge
              variant="outline"
              className="bg-amber-500/20 text-amber-400 border-amber-500/30 font-medium"
            >
              {totalItems} items
            </CustomBadge>
            <span className="text-sm text-slate-300 flex-1">
              {order.items.length} different products
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-amber-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-amber-400" />
            )}
          </button>
          {isExpanded && (
            <div className="mt-2">
              <div className="bg-slate-800/50 rounded-lg p-3 space-y-2 border border-slate-700/50">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-slate-700/30 rounded-md border border-slate-600/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <Package className="h-4 w-4 text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">
                          {item.product?.name || "Product"}
                        </p>
                        <p className="text-xs text-slate-400">
                          Quantity: {item.quantity}
                        </p>
                        {item.status === "cancelled" && (
                          <span className="text-xs text-red-400">
                            Cancelled
                          </span>
                        )}
                      </div>
                    </div>
                    <CustomBadge
                      variant="outline"
                      className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs"
                    >
                      {item.quantity}x
                    </CustomBadge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900 min-h-screen text-white">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-400 bg-slate-900 min-h-screen ">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen text-white">
      <div>
        <h1 className="text-3xl font-bold text-white">Order Management</h1>
        <p className="text-slate-400">
          Track and manage all customer orders in real-time.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <CustomInput
            placeholder="Search orders by customer or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((status) => (
            <CustomButton
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => setStatusFilter(status)}
              className="capitalize"
            >
              {status === "all" ? "All" : status}
            </CustomButton>
          ))}
        </div>
      </div>

      <CustomCard>
        <CustomCardHeader>
          <CustomCardTitle>Orders ({filteredOrders.length})</CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No orders found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">
                      Items
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">
                      Total
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">
                      Date
                    </th>
                    <th className="text-right py-3 px-4 text-slate-300 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const orderDate = new Date(order.createdAt);

                    return (
                      <tr
                        key={order._id}
                        className="border-b border-slate-700 hover:bg-slate-700/50"
                      >
                        <td className="py-4 px-4 font-mono text-sm text-slate-300">
                          {order._id.slice(-8)}
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-white">
                              {order.shippingAddress.fullName}
                            </div>
                            <div className="text-sm text-slate-400">
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">{renderOrderItems(order)}</td>
                        <td className="py-4 px-4 font-semibold text-amber-400">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <CustomBadge
                            variant={getStatusVariant(order.status)}
                            className={`capitalize ${
                              order.status === "confirmed"
                                ? "bg-amber-500 text-black hover:bg-amber-600"
                                : order.status === "delivered"
                                ? "bg-green-600 text-white"
                                : order.status === "shipped"
                                ? "bg-blue-600 text-white"
                                : order.status === "cancelled"
                                ? "bg-red-600 text-white"
                                : "bg-slate-600 text-white"
                            }`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{order.status}</span>
                          </CustomBadge>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-400">
                          {orderDate.toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <CustomDropdownMenu
                            trigger={
                              <CustomButton variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </CustomButton>
                            }
                          >
                            <CustomDropdownMenuItem
                              onClick={() => handleViewOrder(order)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </CustomDropdownMenuItem>
                          </CustomDropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CustomCardContent>
      </CustomCard>

      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CustomModalHeader onClose={() => setIsModalOpen(false)}>
          <CustomModalTitle>Order Details</CustomModalTitle>
          <CustomModalDescription>
            Complete information for order {selectedOrder?._id}
          </CustomModalDescription>
        </CustomModalHeader>

        {selectedOrder && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CustomBadge
                  variant={getStatusVariant(selectedOrder.status)}
                  className={`capitalize ${
                    selectedOrder.status === "confirmed"
                      ? "bg-amber-500 text-black"
                      : selectedOrder.status === "delivered"
                      ? "bg-green-600 text-white"
                      : selectedOrder.status === "shipped"
                      ? "bg-blue-600 text-white"
                      : selectedOrder.status === "cancelled"
                      ? "bg-red-600 text-white"
                      : "bg-slate-600 text-white"
                  }`}
                >
                  {getStatusIcon(selectedOrder.status)}
                  <span className="ml-1">{selectedOrder.status}</span>
                </CustomBadge>
              </div>

              {getAllowedStatuses(selectedOrder.status).length > 0 ? (
                <CustomSelect
                  value={selectedOrder.status}
                  onValueChange={(newStatus) =>
                    handleStatusChange(selectedOrder._id, newStatus)
                  }
                  className="w-[180px]"
                >
                  {getAllowedStatuses(selectedOrder.status).map((status) => (
                    <CustomSelectItem key={status} value={status}>
                      {status}
                    </CustomSelectItem>
                  ))}
                </CustomSelect>
              ) : (
                <div className="text-sm text-slate-400 px-3 py-2">
                  Status cannot be changed
                </div>
              )}
            </div>

            <div className="h-px bg-slate-700" />

            <div className="grid grid-cols-2 gap-4">
              <CustomCard className="bg-slate-700 border-slate-600">
                <CustomCardHeader className="pb-3">
                  <CustomCardTitle className="text-sm flex items-center gap-2 text-white">
                    <Calendar className="h-4 w-4" />
                    Order Information
                  </CustomCardTitle>
                </CustomCardHeader>
                <CustomCardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-slate-400">Order ID</p>
                    <p className="font-mono text-sm text-white">
                      {selectedOrder._id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Date</p>
                    <p className="text-sm text-white">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                </CustomCardContent>
              </CustomCard>

              <CustomCard className="bg-slate-700 border-slate-600">
                <CustomCardHeader className="pb-3">
                  <CustomCardTitle className="text-sm flex items-center gap-2 text-white">
                    <DollarSign className="h-4 w-4" />
                    Payment
                  </CustomCardTitle>
                </CustomCardHeader>
                <CustomCardContent>
                  <div>
                    <p className="text-sm text-slate-400">Total Amount</p>
                    <p className="text-2xl font-bold text-amber-400">
                      ${selectedOrder.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </CustomCardContent>
              </CustomCard>
            </div>

            <CustomCard className="bg-slate-700 border-slate-600">
              <CustomCardHeader className="pb-3">
                <CustomCardTitle className="text-sm flex items-center gap-2 text-white">
                  <User className="h-4 w-4" />
                  Customer Information
                </CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <div>
                  <p className="font-medium text-white">
                    {selectedOrder.shippingAddress.fullName}
                  </p>
                </div>
              </CustomCardContent>
            </CustomCard>

            <CustomCard className="bg-slate-700 border-slate-600">
              <CustomCardHeader className="pb-3">
                <CustomCardTitle className="text-sm flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <div className="space-y-1 text-white">
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.state}
                  </p>
                  <p>{selectedOrder.shippingAddress.postalCode}</p>
                </div>
              </CustomCardContent>
            </CustomCard>

            <CustomCard className="bg-slate-700 border-slate-600">
              <CustomCardHeader className="pb-3">
                <CustomCardTitle className="text-sm flex items-center gap-2 text-white">
                  <Package className="h-4 w-4" />
                  Order Items (
                  {selectedOrder.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}{" "}
                  total)
                </CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <div className="grid gap-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/30 hover:bg-slate-800/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {item.product?.name || "Product"}
                          </p>
                          <p className="text-sm text-slate-400">
                            Quantity: {item.quantity}
                          </p>
                          {item.status === "cancelled" && (
                            <span className="text-xs text-red-400">
                              Cancelled
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <CustomBadge
                          variant="outline"
                          className="bg-amber-500/20 text-amber-400 border-amber-500/30"
                        >
                          {item.quantity}x
                        </CustomBadge>
                      </div>
                    </div>
                  ))}
                </div>
              </CustomCardContent>
            </CustomCard>
          </div>
        )}
      </CustomModal>
    </div>
  );
}
