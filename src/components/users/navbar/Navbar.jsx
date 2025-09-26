import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userAuthSlice";
import Swal from "sweetalert2";
import AuthModal from "../authenticationModal/Modal";
import { logoutUser, fetchUserCart } from "../../../api/user/userApi";
import { setCart } from "../../../redux/slices/cartAuthSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const totalItems = items.length;

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const getCart = async () => {
      try {
        if (isAuthenticated) {
          const cartData = await fetchUserCart();
          dispatch(setCart(cartData.items || []));
        }
      } catch (error) {
        console.error("Failed to load cart", error);
      }
    };

    getCart();
  }, [isAuthenticated, dispatch]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      background: "rgba(0, 0, 0, 0.6)",
      color: "#fff",
      width: "350px",
      customClass: {
        popup: "glass-popup",
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          popup.style.backdropFilter = "blur(12px)";
          popup.style.border = "2px solid gold";
          popup.style.borderRadius = "15px";
          popup.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.5)";
        }
      },
    });

    if (result.isConfirmed) {
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
          background: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Logout failed",
          text: error?.response?.data?.message || "Something went wrong",
          background: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
        });
      }
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

        {/* Center: Nav Links (Desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/menu" className="hover:text-yellow-400 transition">Menu</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
        </div>

        {/* Right: Cart & User (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {isAuthenticated && (
            <Link to="/cart" className="relative flex items-center gap-1">
              <ShoppingCart className="w-7 h-7" />
              {/* <span>Cart</span> */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-white/10 transition"
              >
<User className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            {user?.name || "User"}
          </span>              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-yellow-500 rounded-lg shadow-lg py-2">
                  {/* <div className="px-4 py-2 text-sm text-gray-300">
                    👋 Hi, {user?.name || "User"}
                  </div> */}
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm hover:bg-yellow-500/10 text-gray-200"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
  <div className="md:hidden bg-black/95 text-white px-6 pb-6 space-y-6">
    {/* Nav Links */}
    <div className="flex flex-col items-center space-y-4 text-sm font-medium text-gray-300">
      <Link to="/" onClick={toggleMenu} className="hover:text-yellow-400 transition">Home</Link>
      <Link to="/menu" onClick={toggleMenu} className="hover:text-yellow-400 transition">Menu</Link>
      <Link to="/about" onClick={toggleMenu} className="hover:text-yellow-400 transition">About</Link>
      <Link to="/contact" onClick={toggleMenu} className="hover:text-yellow-400 transition">Contact</Link>
    </div>

    {/* User Menu (Mobile) */}
    {isAuthenticated && (
      <div className="flex flex-col items-center space-y-4 relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-white/10 transition"
        >
          <User className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            {user?.name || "User"}
          </span>
        </button>

        {userMenuOpen && (
          <div className="w-full bg-black border border-yellow-500 rounded-lg shadow-lg py-2 mt-2">
            <Link
              to="/orders"
              className="block px-4 py-2 text-sm hover:bg-yellow-500/10 text-gray-200"
              onClick={() => {
                setUserMenuOpen(false);
                setIsOpen(false);
              }}
            >
              My Orders
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setUserMenuOpen(false);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    )}

    {/* Cart */}
    {isAuthenticated && (
      <Link
        to="/cart"
        className="flex items-center gap-2 hover:text-yellow-400 transition justify-center"
        onClick={toggleMenu}
      >
        <ShoppingCart className="w-5 h-5" />
        <span> ({totalItems})</span>
      </Link>
    )}

    {!isAuthenticated && (
      <button
        onClick={() => {
          setShowAuthModal(true);
          setIsOpen(false);
        }}
        className="w-full text-center border border-yellow-400 text-yellow-400 text-sm font-semibold py-2 rounded-full hover:bg-yellow-500/10 transition"
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
