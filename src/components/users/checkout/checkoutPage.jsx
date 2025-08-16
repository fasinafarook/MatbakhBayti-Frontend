import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserCart,
  placeOrderAPI,
  fetchUserAddresses,
  updateAddressAPI,
} from "../../../api/user/userApi";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    location: {
      coordinates: [],
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart items
        const cartRes = await fetchUserCart();
        setCartItems(cartRes.items);

        // Calculate total
        const total = cartRes.items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        setTotalAmount(total);

        // Fetch saved addresses
        const addressesRes = await fetchUserAddresses();
        setSavedAddresses(addressesRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        showModal("Error", "Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const showModal = (title, message) => {
    setModal({
      isOpen: true,
      title,
      message,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: "",
      message: "",
    });
  };

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

  // Update the handlePlaceOrder function
  const handlePlaceOrder = async () => {
    // Validate address
    if (
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.postalCode
    ) {
      showModal(
        "Incomplete Information",
        "Please fill in all required shipping information"
      );
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        paymentMethod,
        shippingAddress: {
          ...shippingAddress,
          location:
            shippingAddress.location?.coordinates?.length === 2
              ? {
                  type: "Point",
                  coordinates: [
                    Number(shippingAddress.location.coordinates[0]),
                    Number(shippingAddress.location.coordinates[1]),
                  ],
                }
              : undefined,
        },
      };

      const res = await placeOrderAPI(orderData);

      if (res.success) {
        setModal({
          isOpen: true,
          title: "Order Placed Successfully!",
          message: res.message || "Your order has been placed successfully.",
          buttons: [
            {
              text: "Continue Shopping",
              primary: false,
              onClick: () => navigate("/"),
            },
            {
              text: "View Orders",
              primary: true,
              onClick: () => navigate("/orders"),
            },
          ],
        });
      } else {
        showModal("Order Failed", res.message || "Failed to place order");
      }
    } catch (err) {
      showModal(
        "Error",
        err.response?.data?.message || "Failed to place order"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressSelect = (address) => {
    const clonedAddress = JSON.parse(JSON.stringify(address)); // avoid mutation
    setShippingAddress(clonedAddress);
    setSelectedAddressId(address._id || clonedAddress._id);
    setShowAddressForm(false);
    setIsEditing(false);
  };

  const handleEditAddress = (address) => {
    // Create a deep copy of the address to avoid mutation
    const clonedAddress = JSON.parse(JSON.stringify(address));

    // Ensure location object exists with coordinates array
    if (!clonedAddress.location) {
      clonedAddress.location = { type: "Point", coordinates: [] };
    } else if (!clonedAddress.location.coordinates) {
      clonedAddress.location.coordinates = [];
    }

    setShippingAddress(clonedAddress);
    setSelectedAddressId(address._id);
    setShowAddressForm(true);
    setIsEditing(true);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      showModal(
        "Location Error",
        "Geolocation is not supported by your browser"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setShippingAddress((prev) => ({
          ...prev,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        }));
      },
      (error) => {
        console.error("Error getting location", error);
        showModal(
          "Location Error",
          "Failed to get your location. Please allow location access."
        );
      }
    );
  };

  const handleSaveAddress = async () => {
    try {
      // Validate required fields
      if (
        !shippingAddress.fullName ||
        !shippingAddress.phone ||
        !shippingAddress.street ||
        !shippingAddress.city ||
        !shippingAddress.postalCode
      ) {
        showModal(
          "Incomplete Information",
          "Please fill in all required fields"
        );
        return;
      }

      // Prepare the address data
      const addressData = {
        ...shippingAddress,
        location:
          shippingAddress.location?.coordinates?.length === 2
            ? {
                type: "Point",
                coordinates: [
                  Number(shippingAddress.location.coordinates[0]),
                  Number(shippingAddress.location.coordinates[1]),
                ],
              }
            : undefined,
      };

      if (isEditing) {
        // Update in backend first
        const updatedAddress = await updateAddressAPI(
          selectedAddressId,
          addressData
        );

        // Then update local state
        setSavedAddresses((prevAddresses) =>
          prevAddresses.map((addr) =>
            addr._id === selectedAddressId ? updatedAddress.data : addr
          )
        );
      } else {
        // For new addresses, use your existing placeOrderAPI
        // Or create a separate API endpoint for saving addresses
        const newAddress = {
          ...addressData,
          _id: `temp-${Date.now()}`,
        };
        setSavedAddresses((prev) => [...prev, newAddress]);
        setSelectedAddressId(newAddress._id);
      }

      setShowAddressForm(false);
    } catch (error) {
      console.error("Error saving address:", error);
      showModal("Error", "Failed to save address");
    }
  };

  const handleNewAddress = () => {
    setShippingAddress({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      location: { coordinates: [] },
    });
    setSelectedAddressId(null);
    setShowAddressForm(true);
    setIsEditing(false);
  };

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  return (
    <div
      className="relative min-h-screen p-4 md:p-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://csvending.com/wp-content/uploads/2018/08/food-bg-1.jpg")',
      }}
    >
      
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Modal Component */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        buttons={modal.buttons}
      >
        {modal.message}
      </Modal>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Checkout
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Shipping and Payment */}
          <div className="space-y-6">
            {/* Shipping Address Section */}
            <section className="glass-card">
              <div
                className="flex justify-between items-center cursor-pointer p-4"
                onClick={toggleAddressForm}
              >
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 text-white mr-3">
                    1
                  </span>
                  Shipping Information
                </h3>
                <span className="text-white text-2xl">
                  {showAddressForm ? "−" : "+"}
                </span>
              </div>

              {!showAddressForm && savedAddresses.length > 0 && (
                <div className="p-4 pt-0">
                  <h4 className="text-white text-opacity-80 mb-3">
                    Saved Addresses
                  </h4>
                  <div className="space-y-3 mb-4">
                    {savedAddresses.map((address) => (
                      <div
                        key={address._id}
                        className={`p-3 rounded-lg border ${
                          selectedAddressId === address._id
                            ? "border-yellow-400 bg-white bg-opacity-10"
                            : "border-white border-opacity-20"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="text-white">
                            <p className="font-medium">{address.fullName}</p>
                            <p className="text-sm">
                              {address.street}, {address.city}
                            </p>
                            <p className="text-sm">
                              {address.state}, {address.postalCode}
                            </p>
                            <p className="text-sm">{address.country}</p>
                            <p className="text-sm mt-1">
                              Phone: {address.phone}
                            </p>
                          </div>
                          <button
                            onClick={() => handleEditAddress(address)}
                            className="text-yellow-400 text-sm hover:text-yellow-300"
                          >
                            Edit
                          </button>
                        </div>
                        <button
                          onClick={() => handleAddressSelect(address)}
                          className={`mt-2 w-full py-1 text-sm rounded ${
                            selectedAddressId === address._id
                              ? "bg-yellow-400 text-black"
                              : "bg-white bg-opacity-10 text-white"
                          }`}
                        >
                          {selectedAddressId === address._id
                            ? "Selected"
                            : "Select this address"}
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleNewAddress}
                    className="w-full py-2 px-4 bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 rounded-lg text-white font-medium transition"
                  >
                    + Add New Address
                  </button>
                </div>
              )}

              {showAddressForm && (
                <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      field: "fullName",
                      label: "Full Name",
                      required: true,
                      type: "text",
                    },
                    {
                      field: "phone",
                      label: "Phone Number",
                      required: true,
                      type: "tel",
                    },
                    {
                      field: "street",
                      label: "Street Address",
                      required: true,
                      type: "text",
                    },
                    {
                      field: "city",
                      label: "City",
                      required: true,
                      type: "text",
                    },
                    {
                      field: "state",
                      label: "State/Province",
                      required: true,
                      type: "text",
                    },
                    {
                      field: "postalCode",
                      label: "Postal Code",
                      required: true,
                      type: "text",
                    },
                    {
                      field: "country",
                      label: "Country",
                      required: true,
                      type: "text",
                    },
                  ].map(({ field, label, required, type }) => (
                    <div className="form-group" key={field}>
                      <label className="block text-sm font-medium text-white mb-1">
                        {label}{" "}
                        {required && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                        id={field}
                        type={type}
                        name={field}
                        value={shippingAddress[field] || ""}
                        onChange={handleInputChange}
                        placeholder={label}
                        required={required}
                      />
                    </div>
                  ))}

                  <div className="form-group md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-1">
                      Location
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleUseMyLocation}
                        className="mt-2 px-3 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 text-sm font-medium"
                      >
                        Use My Current Location
                      </button>
                    </div>
                    <small className="text-xs text-white text-opacity-70 mt-1">
                      Optional for delivery accuracy
                    </small>
                  </div>

                  <div className="md:col-span-2 flex justify-end space-x-3">
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="px-4 py-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-30 text-white transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveAddress}
                      className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition"
                    >
                      {isEditing ? "Update Address" : "Save Address"}
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Payment Method Section */}
            <section className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white flex items-center mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 text-white mr-3">
                  2
                </span>
                Payment Method
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 hover:bg-opacity-20 transition cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="h-5 w-5 text-yellow-300 focus:ring-yellow-300 border-white"
                  />
                  <div className="ml-3">
                    <span className="block font-medium text-white">
                      Cash on Delivery
                    </span>
                    <span className="block text-sm text-white text-opacity-70">
                      Pay when you receive your order
                    </span>
                  </div>
                </label>

                <label className="flex items-center p-4 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 hover:bg-opacity-20 transition cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={() => setPaymentMethod("Online")}
                    className="h-5 w-5 text-yellow-300 focus:ring-yellow-300 border-white"
                  />
                  <div className="ml-3">
                    <span className="block font-medium text-white">
                      Online Payment
                    </span>
                    <span className="block text-sm text-white text-opacity-70">
                      Pay securely with credit/debit card
                    </span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="glass-card p-6 h-fit sticky top-6">
            <h3 className="text-xl font-semibold text-white flex items-center mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 text-white mr-3">
                3
              </span>
              Order Summary
            </h3>

            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-white text-opacity-70">
                Your cart is empty
              </div>
            ) : (
              <>
<div className="max-h-96 overflow-y-auto mb-6 border-b border-white border-opacity-20 pb-4">
  {cartItems.map((item) => (
    <div
      key={item.product._id}
      className="flex justify-between items-center py-3 border-b border-white border-opacity-10 last:border-0"
    >
      {/* Product info with image */}
      <div className="flex items-center space-x-3">
        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-white border-opacity-20">
          <img
            src={item.product.image || '/placeholder-product.jpg'}
            alt={item.product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div>
          <p className="font-medium text-white">{item.product.name}</p>
          <p className="text-sm text-white text-opacity-70">
            Qty: {item.quantity}
          </p>
        </div>
      </div>

      {/* Price */}
      <p className="font-medium text-white">
        ₹{(item.product.price * item.quantity).toFixed(2)}
      </p>
    </div>
  ))}
</div>


                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-white">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white border-opacity-20">
                    <span>Total</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isLoading || cartItems.length === 0}
                  className="w-full py-3 px-4 bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 rounded-lg text-white font-medium uppercase tracking-wider transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .glass-card {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.125);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
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

export default CheckoutPage;
