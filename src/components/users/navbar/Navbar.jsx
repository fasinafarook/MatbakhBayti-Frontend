import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userAuthSlice";
import Swal from "sweetalert2";
import AuthModal from "../authenticationModal/Modal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
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
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/services" className="hover:text-yellow-400 transition">Services</Link>
          <Link to="/blog" className="hover:text-yellow-400 transition">Blog</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
        </div>

        {/* Right: Auth Button */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-300">Hi, {user?.name || "User"}</span>
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
          <Link to="/" className="block hover:text-yellow-400 transition" onClick={toggleMenu}>Home</Link>
          <Link to="/services" className="block hover:text-yellow-400 transition" onClick={toggleMenu}>Services</Link>
          <Link to="/blog" className="block hover:text-yellow-400 transition" onClick={toggleMenu}>Blog</Link>
          <Link to="/about" className="block hover:text-yellow-400 transition" onClick={toggleMenu}>About</Link>

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

      {showAuthModal && <AuthModal closeModal={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default Navbar;
