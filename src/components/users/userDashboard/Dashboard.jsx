import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OrdersPage from "../order/orderPage";
import { fetchUserAddresses, updateAddressAPI } from "../../../api/user/userApi";

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttons: []
  });

  // Get user from Redux
  const user = useSelector((state) => state.auth.user);

  // Form state for addresses
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
    location: {
      coordinates: [],
    },
  });

  // Fetch saved addresses
  useEffect(() => {
    if (activeTab === "addresses") {
      fetchAddresses();
    }
  }, [activeTab]);

  const fetchAddresses = () => {
    setLoading(true);
    fetchUserAddresses()
      .then((res) => setAddresses(res.data))
      .catch((err) => {
        console.error("Error fetching addresses:", err);
        showModal("Error", "Failed to fetch addresses. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const showModal = (title, message, buttons = []) => {
    setModal({
      isOpen: true,
      title,
      message,
      buttons: buttons.length ? buttons : [
        {
          text: "OK",
          primary: true,
          onClick: () => setModal({ ...modal, isOpen: false })
        }
      ]
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: "",
      message: "",
      buttons: []
    });
  };

  const Modal = ({ isOpen, onClose, title, message, buttons }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="glass-card max-w-md w-full p-6">
          {title && (
            <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
          )}
          <div className="text-white mb-6">{message}</div>
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      showModal("Location Error", "Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setAddressForm(prev => ({
          ...prev,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        }));
        showModal("Location Updated", "Your location has been set successfully.");
      },
      (error) => {
        console.error("Error getting location", error);
        showModal("Location Error", "Failed to get your location. Please allow location access.");
      }
    );
  };

  const handleSaveAddress = async () => {
    try {
      // Validate required fields
      if (
        !addressForm.fullName ||
        !addressForm.phone ||
        !addressForm.street ||
        !addressForm.city ||
        !addressForm.postalCode
      ) {
        showModal("Incomplete Information", "Please fill in all required fields");
        return;
      }

      // Prepare the address data
      const addressData = {
        ...addressForm,
        location:
          addressForm.location?.coordinates?.length === 2
            ? {
                type: "Point",
                coordinates: [
                  Number(addressForm.location.coordinates[0]),
                  Number(addressForm.location.coordinates[1]),
                ],
              }
            : undefined,
      };

      if (isEditing && editingAddress) {
        // Update in backend
        const updatedAddress = await updateAddressAPI(editingAddress._id, addressData);

        // Update local state
        setAddresses((prevAddresses) =>
          prevAddresses.map((addr) =>
            addr._id === editingAddress._id ? updatedAddress.data : addr
          )
        );

        setShowAddressForm(false);
        setEditingAddress(null);
        setIsEditing(false);
        showModal("Success", "Address updated successfully");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      showModal("Error", "Failed to save address");
    }
  };

  const handleEditAddress = (address) => {
    setAddressForm({
      fullName: address.fullName || "",
      phone: address.phone || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      postalCode: address.postalCode || "",
      country: address.country || "",
      isDefault: address.isDefault || false,
      location: address.location || { coordinates: [] },
    });
    setEditingAddress(address);
    setIsEditing(true);
    setShowAddressForm(true);
  };

  const handleCancelEdit = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setIsEditing(false);
    setAddressForm({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefault: false,
      location: { coordinates: [] },
    });
  };

  // Section Render
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="glass-card p-8">
            <div className="flex items-center mb-6">
              <div className="golden-divider mr-4"></div>
              <h3 className="text-2xl font-bold text-yellow-400">Profile Information</h3>
              <div className="golden-divider ml-4"></div>
            </div>
            
            <div className="space-y-4">
              <div className="info-item">
                <span className="icon">👤</span>
                <div>
                  <p className="label">Name</p>
                  <p className="value">{user?.name || "Not provided"}</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="icon">📧</span>
                <div>
                  <p className="label">Email</p>
                  <p className="value">{user?.email}</p>
                </div>
              </div>
              
              {/* <div className="info-item">
                <span className="icon">📞</span>
                <div>
                  <p className="label">Phone</p>
                  <p className="value">{user?.phone || "Not provided"}</p>
                </div>
              </div> */}
            </div>
          </div>
        );

      case "addresses":
        return (
          <div className="glass-card p-8">
            <div className="flex items-center mb-6">
              <div className="golden-divider mr-4"></div>
              <h3 className="text-2xl font-bold text-yellow-400">Saved Addresses</h3>
              <div className="golden-divider ml-4"></div>
            </div>
            
            {showAddressForm ? (
              <div className="address-form-container mb-6">
                <h4 className="text-xl font-semibold text-white mb-4">
                  Edit Address
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { field: "fullName", label: "Full Name", required: true, type: "text" },
                    { field: "phone", label: "Phone Number", required: true, type: "tel" },
                    { field: "street", label: "Street Address", required: true, type: "text" },
                    { field: "city", label: "City", required: true, type: "text" },
                    { field: "state", label: "State/Province", required: true, type: "text" },
                    { field: "postalCode", label: "Postal Code", required: true, type: "text" },
                    { field: "country", label: "Country", required: true, type: "text" },
                  ].map(({ field, label, required, type }) => (
                    <div className="form-group" key={field}>
                      <label className="block text-sm font-medium text-white mb-1">
                        {label} {required && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                        type={type}
                        name={field}
                        value={addressForm[field] || ""}
                        onChange={handleInputChange}
                        placeholder={label}
                        required={required}
                      />
                    </div>
                  ))}
                  
                  <div className="form-group md:col-span-2 flex items-center">
                    <input
                      type="checkbox"
                      id="isDefault"
                      name="isDefault"
                      checked={addressForm.isDefault}
                      onChange={handleInputChange}
                      className="mr-2 h-5 w-5 text-yellow-400 focus:ring-yellow-300 border-white"
                    />
                    <label htmlFor="isDefault" className="text-white text-opacity-80">
                      Set as default address
                    </label>
                  </div>
                  
                  <div className="form-group md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-1">
                      Location
                    </label>
                    <button
                      type="button"
                      onClick={handleUseMyLocation}
                      className="px-3 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 text-sm font-medium"
                    >
                      Use My Current Location
                    </button>
                    <small className="text-xs text-white text-opacity-70 mt-1 block">
                      Optional for delivery accuracy
                    </small>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-30 text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAddress}
                    className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition"
                  >
                    Update Address
                  </button>
                </div>
              </div>
            ) : null}
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="golden-loader"></div>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-8">
                <div className="empty-icon mb-4">🏠</div>
                <p className="text-white opacity-80">No saved addresses found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                  <div key={addr._id} className="glass-card p-6 relative">
                    <div className="absolute top-4 right-4">
                      {/* <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                        {addr.isDefault ? "DEFAULT" : ""}
                      </span> */}
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="text-yellow-400 mr-3">📍</div>
                      <div>
                        <p className="text-yellow-400 font-bold">{addr.fullName}</p>
                        <p className="text-white">{addr.street}, {addr.city}</p>
                        <p className="text-white">{addr.state}, {addr.postalCode}</p>
                        <p className="text-white">{addr.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 pt-4 border-t border-white border-opacity-10">
                      <span className="text-yellow-400 mr-2">📞</span>
                      <p className="text-white">{addr.phone}</p>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button 
                        className="px-3 py-1 text-yellow-400 border border-yellow-400 rounded hover:bg-yellow-400 hover:bg-opacity-10 transition"
                        onClick={() => handleEditAddress(addr)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "orders":
        return (
          <div className="glass-card p-8">
            <div className="flex items-center mb-6">
              <div className="golden-divider mr-4"></div>
              <h3 className="text-2xl font-bold text-yellow-400">Order History</h3>
              <div className="golden-divider ml-4"></div>
            </div>
            <OrdersPage />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: 'url("https://csvending.com/wp-content/uploads/2018/08/food-bg-1.jpg")',
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">My Account</h1>
          <p className="text-white text-opacity-70">Welcome back, {user?.name}</p>
        </div>

        {/* Buttons / Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === "profile" 
                ? "bg-yellow-400 text-black" 
                : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
            }`}
          >
            👤 Profile
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === "addresses" 
                ? "bg-yellow-400 text-black" 
                : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
            }`}
          >
            🏠 Addresses
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === "orders" 
                ? "bg-yellow-400 text-black" 
                : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
            }`}
          >
            📦 Orders
          </button>
        </div>

        {/* Content */}
        <div>
          {renderContent()}
        </div>
      </div>
      
      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        buttons={modal.buttons}
      />
      
      <style jsx global>{`
        .glass-card {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.125);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }
        
        .golden-divider {
          height: 2px;
          width: 40px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }
        
        .info-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border-left: 2px solid #D4AF37;
        }
        
        .info-item .icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          color: #D4AF37;
        }
        
        .info-item .label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          margin-bottom: 0.25rem;
        }
        
        .info-item .value {
          color: #fff;
          font-weight: 500;
        }
        
        .golden-loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          border-top: 3px solid #D4AF37;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UserDashboardPage;