// src/layouts/WithNavbar.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../dashboard/context/AuthContext";

const WithNavbar = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white font-poppins">
      <nav className="bg-[#0A0E2C] shadow-md px-6 py-4 flex justify-between items-center">
        {/* ✅ Larger Logo */}
        <Link to="/dashboard" className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="CashoutTips Logo"
            className="h-10 sm:h-12" // ✅ Increased height for visibility
          />
          <span className="text-xl sm:text-2xl font-bold text-white">CashoutTips</span>
        </Link>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="rounded-full bg-[#1A1E3F] p-2 hover:bg-[#2A2F55] transition"
          >
            <User className="h-5 w-5 text-white" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-[#1A1E3F] border border-gray-700 rounded-lg shadow-lg z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-white hover:bg-[#2A2F55]"
              >
                My Profile
              </Link>
              <button
                onClick={logout}
                className="block px-4 py-2 text-sm text-red-400 hover:bg-[#2A2F55] w-full text-left"
              >
                <LogOut className="inline-block mr-2 w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
};

export default WithNavbar;
