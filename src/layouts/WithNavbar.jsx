// src/layouts/WithNavbar.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../dashboard/context/AuthContext";

const WithNavbar = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-[#0A0E2C]">
          CashoutTips
        </Link>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="rounded-full bg-[#f2f2f2] p-2 hover:bg-[#e2e2e2] transition"
          >
            <User className="h-5 w-5 text-[#0A0E2C]" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <button
                onClick={logout}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
              >
                <LogOut className="inline-block mr-2 w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="p-4">{children}</main>
    </div>
  );
};

export default WithNavbar;
