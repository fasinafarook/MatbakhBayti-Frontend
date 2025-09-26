import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders, cancelOrderAPI } from "../../../api/user/userApi";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    orderId: null,
    isConfirmation: false,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6, // Show 6 cards per page
    totalItems: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetchUserOrders();
        setOrders(res.data);
        setPagination((prev) => ({
          ...prev,
          totalItems: res.data.length,
        }));
      } catch (error) {
        console.error("Error fetching orders:", error);
        setModal({
          isOpen: true,
          title: "Error",
          message: "Failed to fetch orders. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  // Calculate pagination values
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: pageNumber,
      }));
    }
  };

  const handleCancelOrder = async () => {
    if (!modal.orderId) return;

    try {
      await cancelOrderAPI(modal.orderId);
      setOrders(
        orders.map((order) =>
          order._id === modal.orderId
            ? { ...order, status: "cancelled" }
            : order
        )
      );
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

  const openCancelConfirmation = (orderId) => {
    setModal({
      isOpen: true,
      title: "Confirm Cancellation",
      message: "Are you sure you want to cancel this order?",
      orderId,
      isConfirmation: true,
    });
  };
  const PaginationControls = () => {
    return (
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => paginate(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            pagination.currentPage === 1
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-white bg-opacity-10 hover:bg-opacity-20"
          } text-white`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded-lg ${
              pagination.currentPage === number
                ? "bg-yellow-400 text-black"
                : "bg-white bg-opacity-10 hover:bg-opacity-20 text-white"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => paginate(pagination.currentPage + 1)}
          disabled={pagination.currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            pagination.currentPage === totalPages
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-white bg-opacity-10 hover:bg-opacity-20"
          } text-white`}
        >
          Next
        </button>
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-400 bg-opacity-20 text-blue-300";
      case "confirmed":
        return "bg-purple-400 bg-opacity-20 text-purple-300";
      case "shipped":
        return "bg-yellow-400 bg-opacity-20 text-yellow-300";
      case "delivered":
        return "bg-green-400 bg-opacity-20 text-green-300";
      case "cancelled":
        return "bg-red-400 bg-opacity-20 text-red-300";
      default:
        return "bg-gray-400 bg-opacity-20 text-gray-300";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
    </div>
  );

  // Modal Component
  const Modal = ({ isOpen, onClose, children, title, buttons }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="glass-card max-w-md w-full p-6">
          {title && (
            <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
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
                      ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                      : "bg-white bg-opacity-10 hover:bg-opacity-20 text-white"
                  } font-medium transition`}
                >
                  {button.text}
                </button>
              ))
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition"
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className="relative min-h-screen p-4 md:p-8 bg-cover bg-center bg-no-repeat"
      
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
          My Orders
        </h2>
        <p className="text-center text-white text-opacity-80 mb-8">
          View your order history and track current orders
        </p>

        {orders.length === 0 ? (
          <div className="glass-card text-center py-12 ">
            <svg
              className="mx-auto h-12 w-12 text-white text-opacity-70 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-white">
              No orders yet
            </h3>
            <p className="mt-2 text-white text-opacity-70">
              Start shopping to see your orders here.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {currentOrders.map((order) => (
                <div
                  key={order._id}
                  className="glass-card hover:bg-white hover:bg-opacity-10 transition transform hover:-translate-y-1 "
                >
                  <div className="p-5">
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-yellow-400">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h3>
                        <p className="text-sm text-white text-opacity-70">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>

                    {/* Order Summary */}
                    <div className="mb-4">
                      <div className="flex items-center text-white text-opacity-80 mb-2 ">
                        <svg
                          className="w-4 h-4 mr-2 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {order.items.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        items
                      </div>
                      <div className="flex items-center text-white text-opacity-80 mb-2 ">
                        <svg
                          className="w-4 h-4 mr-2 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </div>
                      <div className="flex items-center text-white text-opacity-80">
                        <svg
                          className="w-4 h-4 mr-2 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        {order.paymentMethod === "COD"
                          ? "Cash on Delivery"
                          : "Paid Online"}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="flex justify-between items-center border-t border-white border-opacity-10 pt-3">
                      <div>
                        <p className="text-sm text-white text-opacity-70">
                          Total
                        </p>
                        <p className="text-xl font-bold text-yellow-400">
                          ₹{order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/orders/${order._id}`)}
                          className="px-3 py-1 text-sm bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-md transition"
                        >
                          Details
                        </button>
                        {(order.status === "pending" ||
                          order.status === "confirmed") && (
                          <button
                            onClick={() => openCancelConfirmation(order._id)}
                            className="px-3 py-1 text-sm bg-red-400 bg-opacity-20 hover:bg-opacity-30 text-red-300 rounded-md transition"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>{" "}
            {totalPages > 1 && <PaginationControls />}
          </>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        buttons={
          modal.isConfirmation
            ? [
                {
                  text: "No, Keep Order",
                  onClick: () => setModal({ ...modal, isOpen: false }),
                  primary: false,
                },
                {
                  text: "Yes, Cancel",
                  onClick: handleCancelOrder,
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
        {modal.message}
      </Modal>

      <style jsx global>{`
        .glass-card {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.125);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        .glass-card ::-webkit-scrollbar {
          width: 6px;
        }

        .glass-card ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .glass-card ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        .glass-card ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default OrdersPage;
