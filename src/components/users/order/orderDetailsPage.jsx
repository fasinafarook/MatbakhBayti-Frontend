import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchOrderDetails,
  cancelOrderAPI,
  cancelOrderItemAPI,
} from "../../../api/user/userApi";
import { motion } from "framer-motion";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetchOrderDetails(orderId);
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order:", error);
        setModal({
          isOpen: true,
          title: "Error",
          message: "Failed to fetch order details. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleCancelItem = async (itemId) => {
    try {
      await cancelOrderItemAPI(orderId, itemId);
      const updatedItems = order.items.map((i) =>
        i._id === itemId ? { ...i, status: "cancelled" } : i
      );

      // Check if all items are now cancelled
      const allCancelled = updatedItems.every(
        (item) => item.status === "cancelled"
      );

      setOrder({
        ...order,
        items: updatedItems,
        status: allCancelled ? "cancelled" : order.status,
      });

      setModal({
        isOpen: true,
        title: "Success",
        message: "Item cancelled successfully.",
      });
    } catch (error) {
      console.error("Error cancelling item:", error);
      setModal({
        isOpen: true,
        title: "Error",
        message: error.response?.data?.message || "Failed to cancel item",
      });
    }
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrderAPI(orderId);
      setOrder({
        ...order,
        status: "cancelled",
        items: order.items.map((item) => ({
          ...item,
          status: "cancelled",
        })),
      });
      setModal({
        isOpen: true,
        title: "Success",
        message: "Your order has been cancelled successfully.",
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
      setModal({
        isOpen: true,
        title: "Error",
        message: error.response?.data?.message || "Failed to cancel order",
      });
    }
  };

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case "pending":
  //       return "bg-blue-100 text-blue-800";
  //     case "confirmed":
  //       return "bg-indigo-100 text-indigo-800";
  //     case "shipped":
  //       return "bg-amber-100 text-amber-800";
  //     case "delivered":
  //       return "bg-emerald-100 text-emerald-800";
  //     case "cancelled":
  //       return "bg-rose-100 text-rose-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-indigo-100 text-indigo-800";
      case "shipped":
        return "bg-amber-100 text-amber-800";
      case "delivered":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Add this helper function to determine the item status based on order status
  const getItemStatus = (orderStatus, itemStatus) => {
    // If item is already cancelled, keep it cancelled
    if (itemStatus === "cancelled") return "cancelled";

    // If order is cancelled, all items should be cancelled
    if (orderStatus === "cancelled") return "cancelled";

    // For other order statuses, items should match the order status
    // unless the item status is already at a more advanced state
    const statusHierarchy = ["pending", "confirmed", "shipped", "delivered"];
    const orderStatusIndex = statusHierarchy.indexOf(orderStatus);
    const itemStatusIndex = statusHierarchy.indexOf(itemStatus);

    return orderStatusIndex > itemStatusIndex ? orderStatus : itemStatus;
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  );

  const Modal = ({ isOpen, onClose, children, title, buttons }) => {
    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="bg-black bg-opacity-80 backdrop-blur-lg max-w-md w-full rounded-xl overflow-hidden shadow-2xl border border-yellow-500"
        >
          <div className="p-6">
            {title && (
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                {title}
              </h3>
            )}
            <div className="text-white mb-6">{children}</div>
            <div className="flex justify-end space-x-3">
              {buttons ? (
                buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className={`px-4 py-2 rounded-lg ${
                      button.primary
                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                        : "bg-gray-800 hover:bg-gray-700 text-white"
                    } font-medium transition-colors`}
                  >
                    {button.text}
                  </button>
                ))
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition-colors"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (loading) return <LoadingSpinner />;
  if (!order)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center p-8 bg-black bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg border border-yellow-500">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            Order not found
          </h2>
          <p className="text-gray-300 mb-6">
            We couldn't locate your order details.
          </p>
          <button
            onClick={() => navigate("/orders")}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors shadow-md"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );

  return (
    <div
      className="relative min-h-screen p-4 md:p-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://static.vecteezy.com/system/resources/previews/031/425/067/non_2x/thanks-giving-flat-lay-in-wooden-board-table-with-copy-space-ai-generated-free-photo.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-6 border border-yellow-500"
        >
          <div className="p-6 bg-gradient-to-r from-black to-gray-900">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/orders")}
                className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Orders
              </button>
              <h1 className="text-2xl font-bold text-yellow-400">
                Order Details
              </h1>
              <div className="w-5"></div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-yellow-500"
            >
              <div className="p-6 border-b border-yellow-500 border-opacity-30">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-yellow-400">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-gray-300 mt-1">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <motion.div
                      key={item._id}
                      whileHover={{ scale: 1.01 }}
                      className="flex justify-between items-start p-4 bg-gray-900 bg-opacity-50 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800"
                    >
                      <div className="flex">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800 border border-gray-700">
                          <img
                            src={
                              item.product.image || "/placeholder-product.jpg"
                            }
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-white font-medium">
                            {item.product.name}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">
                            Qty: {item.quantity}
                          </p>
                          <span
                            className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${getStatusColor(
                              getItemStatus(order.status, item.status)
                            )}`}
                          >
                            {getItemStatus(order.status, item.status)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-white font-medium">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        {(getItemStatus(order.status, item.status) ===
                          "pending" ||
                          getItemStatus(order.status, item.status) ===
                            "confirmed") &&
                          order.status !== "cancelled" &&
                          order.status !== "delivered" && (
                            <button
                              onClick={() =>
                                setModal({
                                  isOpen: true,
                                  title: "Confirm Item Cancellation",
                                  message: `Are you sure you want to cancel ${item.product.name}?`,
                                  onConfirm: () => handleCancelItem(item._id),
                                })
                              }
                              className="mt-2 text-xs text-rose-400 hover:text-rose-300 border border-rose-500 px-2 py-1 rounded hover:bg-rose-900 transition-colors"
                            >
                              Cancel Item
                            </button>
                          )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="mt-6 pt-4 border-t border-yellow-500 border-opacity-30">
                  <div className="flex justify-between text-gray-300 mb-2">
                    <span>Subtotal</span>
                    <span>₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg mt-3 pt-2 border-t border-yellow-500 border-opacity-30">
                    <span>Total</span>
                    <span className="text-yellow-400">
                      ₹{order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-yellow-500"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                  Order Timeline
                </h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 to-emerald-500"></div>

                  <div className="space-y-8">
                    <div className="relative flex items-start">
                      <div className="absolute left-4 -ml-1.5 mt-1.5 h-3 w-3 rounded-full bg-yellow-500 ring-2 ring-yellow-200"></div>
                      <div className="ml-8">
                        <p className="text-white font-medium">Order Placed</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    {(order.status === "confirmed" ||
                      order.status === "shipped" ||
                      order.status === "delivered") && (
                      <div className="relative flex items-start">
                        <div className="absolute left-4 -ml-1.5 mt-1.5 h-3 w-3 rounded-full bg-indigo-500 ring-2 ring-indigo-200"></div>
                        <div className="ml-8">
                          <p className="text-white font-medium">
                            Order Confirmed
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            {order.updatedAt
                              ? formatDate(order.updatedAt)
                              : "Processing..."}
                          </p>
                        </div>
                      </div>
                    )}

                    {(order.status === "shipped" ||
                      order.status === "delivered") && (
                      <div className="relative flex items-start">
                        <div className="absolute left-4 -ml-1.5 mt-1.5 h-3 w-3 rounded-full bg-blue-500 ring-2 ring-blue-200"></div>
                        <div className="ml-8">
                          <p className="text-white font-medium">Shipped</p>
                          <p className="text-gray-400 text-sm mt-1">
                            {order.shippedAt
                              ? formatDate(order.shippedAt)
                              : "Preparing for shipment..."}
                          </p>
                          {order.trackingNumber && (
                            <p className="text-sm text-blue-400 mt-1">
                              Tracking #: {order.trackingNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {order.status === "delivered" && (
                      <div className="relative flex items-start">
                        <div className="absolute left-4 -ml-1.5 mt-1.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></div>
                        <div className="ml-8">
                          <p className="text-white font-medium">Delivered</p>
                          <p className="text-gray-400 text-sm mt-1">
                            {order.deliveredAt
                              ? formatDate(order.deliveredAt)
                              : "On its way..."}
                          </p>
                        </div>
                      </div>
                    )}

                    {order.status === "cancelled" && (
                      <div className="relative flex items-start">
                        <div className="absolute left-4 -ml-1.5 mt-1.5 h-3 w-3 rounded-full bg-rose-500 ring-2 ring-rose-200"></div>
                        <div className="ml-8">
                          <p className="text-white font-medium">
                            Order Cancelled
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            {order.updatedAt
                              ? formatDate(order.updatedAt)
                              : "Recently cancelled"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Shipping Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-yellow-500"
            >
              <div className="p-6 border-b border-yellow-500 border-opacity-30 bg-gradient-to-r from-gray-900 to-black">
                <h3 className="text-lg font-semibold text-yellow-400">
                  Shipping Information
                </h3>
              </div>
              <div className="p-6">
                <div className="text-gray-300 space-y-3">
                  <p className="font-medium text-white">
                    {order.shippingAddress.fullName}
                  </p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-3">
                    <span className="font-medium text-white">Phone:</span>{" "}
                    {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Payment Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-yellow-500"
            >
              <div className="p-6 border-b border-yellow-500 border-opacity-30 bg-gradient-to-r from-gray-900 to-black">
                <h3 className="text-lg font-semibold text-yellow-400">
                  Payment Method
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-900 bg-opacity-50 p-2 rounded-lg mr-3">
                    {order.paymentMethod === "COD" ? (
                      <svg
                        className="h-6 w-6 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-white font-medium">
                    {order.paymentMethod === "COD"
                      ? "Cash on Delivery"
                      : "Paid Online"}
                  </p>
                </div>
                {order.paymentMethod === "Online" && order.paymentDetails && (
                  <div className="mt-4 space-y-2 text-sm bg-gray-900 bg-opacity-50 p-3 rounded-lg">
                    <p className="text-gray-300">
                      <span className="font-medium text-white">
                        Transaction ID:
                      </span>{" "}
                      {order.paymentDetails.transactionId}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Paid on:</span>{" "}
                      {formatDate(order.paymentDetails.paidAt)}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Cancel Order Card */}
            {(order.status === "pending" || order.status === "confirmed") &&
              order.status !== "delivered" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-black bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-yellow-500"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                      Order Actions
                    </h3>
                    <button
                      onClick={() =>
                        setModal({
                          isOpen: true,
                          title: "Confirm Cancellation",
                          message:
                            "Are you sure you want to cancel this entire order?",
                          onConfirm: handleCancelOrder,
                        })
                      }
                      className="w-full px-4 py-2 border border-rose-500 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-900 hover:text-white transition-colors shadow-sm hover:shadow-md"
                    >
                      Cancel Entire Order
                    </button>
                  </div>
                </motion.div>
              )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        buttons={
          modal.onConfirm
            ? [
                {
                  text: "No, Keep Order",
                  onClick: () => setModal({ ...modal, isOpen: false }),
                  primary: false,
                },
                {
                  text: "Yes, Cancel",
                  onClick: () => {
                    modal.onConfirm();
                    setModal({ ...modal, isOpen: false });
                  },
                  primary: true,
                },
              ]
            : [
                {
                  text: "OK",
                  onClick: () => setModal({ ...modal, isOpen: false }),
                  primary: true,
                },
              ]
        }
      >
        <p className="text-gray-300">{modal.message}</p>
      </Modal>
    </div>
  );
};

export default OrderDetailsPage;
