import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { ShoppingCart } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userAuthSlice";
import Swal from "sweetalert2";
import AuthModal from "../authenticationModal/Modal";
import { logoutUser } from "../../../api/user/userApi"; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
  try {
    await logoutUser(); 
    localStorage.removeItem("auth");
    dispatch(logout()); 
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  } catch (error) {
    console.error("Logout failed:", error);
    Swal.fire({
      icon: "error",
      title: "Logout failed",
      text: error?.response?.data?.message || "Something went wrong",
    });
  }
};

  return (
    <div className="bg-black text-white px-4 py-3 sticky top-0 z-50">
      <div className="container mx-auto relative flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://yt3.googleusercontent.com/2n1mMw31wtZbE1ri4audS-SG9sMs0jY8vEJ4Sx9CFXTkkW3V5hmJl4xACqgsgfCw-nzOPYvE4Q=s160-c-k-c0x00ffffff-no-rj"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover shadow"
          />
          <h1 className="text-lg md:text-xl font-playfair tracking-wide bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Matbakh Bayti
          </h1>
        </div>

        {/* Center: Nav Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/menu" className="hover:text-yellow-400 transition">
            Menu
          </Link>
          <Link to="/about" className="hover:text-yellow-400 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>
        </div>

        {/* Right: Auth Button & Cart */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && (
            <Link to="/cart" className="relative flex items-center gap-1">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center gap-1">
                👋 Hi, {user?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold py-2 px-4 border border-red-500 text-red-500 rounded-full hover:bg-red-500/10 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-sm font-semibold py-2 px-4 border border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-500/10 transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/95 text-white px-6 pb-6 space-y-3">
          <Link
            to="/"
            className="block hover:text-yellow-400 transition"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="block hover:text-yellow-400 transition"
            onClick={toggleMenu}
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="block hover:text-yellow-400 transition"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block hover:text-yellow-400 transition"
            onClick={toggleMenu}
          >
            Contact
          </Link>

          {isAuthenticated && (
            <Link
              to="/cart"
              className="block hover:text-yellow-400 transition"
              onClick={toggleMenu}
            >
              Cart ({totalItems})
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="mt-6 w-full text-center border border-red-500 text-red-500 text-sm font-semibold py-2 rounded-full hover:bg-red-500/10 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setShowAuthModal(true);
                setIsOpen(false);
              }}
              className="mt-6 w-full text-center border border-yellow-400 text-yellow-400 text-sm font-semibold py-2 rounded-full hover:bg-yellow-500/10 transition"
            >
              Login
            </button>
          )}
        </div>
      )}

      {showAuthModal && (
        <AuthModal closeModal={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Navbar;

