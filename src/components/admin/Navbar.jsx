import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";

const AdminNavbar = ({ toggleSidebar }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md text-white shadow-md border-b border-yellow-500/10">
      <div className="flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://yt3.googleusercontent.com/2n1mMw31wtZbE1ri4audS-SG9sMs0jY8vEJ4Sx9CFXTkkW3V5hmJl4xACqgsgfCw-nzOPYvE4Q=s160-c-k-c0x00ffffff-no-rj"
            alt="Admin Logo"
            className="w-10 h-10 rounded-full object-cover shadow"
          />
          <h1 className="text-lg md:text-xl font-semibold tracking-wide bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>

        {/* Desktop logout button */}
        <div className="hidden md:flex items-center gap-6">
          <button className="bg-yellow-400 text-black text-sm font-semibold py-2 px-4 rounded-full hover:bg-yellow-300 transition">
            Logout
          </button>
        </div>

        {/* Mobile: toggle sidebar & menu */}
        <div className="md:hidden flex items-center gap-4">
          {/* Sidebar toggle */}
          <button onClick={toggleSidebar} className="text-white text-2xl">
            <FiMenu />
          </button>

          {/* Toggle mobile menu (for logout) */}
          <button
            onClick={() => setShowMobileMenu((prev) => !prev)}
            className="text-white text-sm border border-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-500/10"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Logout Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-black/95 text-white px-6 pb-4">
          <button className="w-full bg-yellow-400 text-black text-sm font-semibold py-2 rounded-full hover:bg-yellow-300 transition">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
