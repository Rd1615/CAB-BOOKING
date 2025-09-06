import React, { useState } from "react";
import { Car, X, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear user from store
    setMobileMenuOpen(false);
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110">
              <Car className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">
              RideEase
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-white font-medium text-lg">
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/booking" className="hover:text-blue-400 transition">
              My Booking
            </Link>
            {authUser === null ? (
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="hover:text-blue-400 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-black/60 backdrop-blur-lg rounded-lg p-4 flex flex-col space-y-3">
            <Link
              to="/"
              className="text-white font-medium text-lg hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/booking"
              className="text-white font-medium text-lg hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Booking
            </Link>
            {authUser === null ? (
              <Link
                to="/login"
                className="text-white font-medium text-lg hover:text-blue-400 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white font-medium text-lg hover:text-blue-400 transition text-left"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
