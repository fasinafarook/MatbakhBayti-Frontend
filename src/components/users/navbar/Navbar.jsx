import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md text-white shadow-md border-b border-yellow-500/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center py-3">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <img
            src="https://yt3.googleusercontent.com/2n1mMw31wtZbE1ri4audS-SG9sMs0jY8vEJ4Sx9CFXTkkW3V5hmJl4xACqgsgfCw-nzOPYvE4Q=s160-c-k-c0x00ffffff-no-rj"
            alt="Matbakh Bayti Logo"
            className="w-10 h-10 rounded-full object-cover shadow"
          />
          <h1 className="text-lg md:text-xl font-playfair tracking-wide bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Matbakh Bayti
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-300">
          <li className="hover:text-yellow-400 cursor-pointer transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer transition">
            <Link to="/menu">Menu</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer transition">
            <Link to="/about">About</Link>
          </li>

          <li className="hover:text-yellow-400 cursor-pointer transition">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* CTA Button */}
        <button className="hidden md:block bg-yellow-400 text-black text-sm font-semibold py-2 px-4 rounded-full hover:bg-yellow-300 transition">
          Order Now
        </button>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 text-white px-6 pb-6">
          <ul className="space-y-4 text-sm font-medium">
            <li className="hover:text-yellow-400 cursor-pointer transition">
              <Link to="/">Home</Link>
            </li>

            <li className="hover:text-yellow-400 cursor-pointer transition">
              <Link to="/menu">Menu</Link>
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              <Link to="/about">About</Link>
            </li>

            <li className="hover:text-yellow-400 cursor-pointer transition">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <button className="mt-4 bg-yellow-400 text-black text-sm font-semibold py-2 px-4 rounded-full w-full hover:bg-yellow-300 transition">
            Order Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
