import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // ✅ loading state
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    const name = user?.firstName || "You";

    toast.success(`${name}, you have been logged out 👋`, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });

    logout();
    navigate("/login", { replace: true });
    setIsLoggingOut(false);
  };

  return (
    <nav className="w-full bg-gray-900 px-6 py-3 flex justify-end items-center relative z-50">
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none"
        >
          <User className="w-5 h-5 mr-2" />
          Account
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Link
                to="/profile"
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4" /> Profile
              </Link>

              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                disabled={isLoggingOut}
                className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
                  isLoggingOut
                    ? "cursor-not-allowed opacity-50 bg-gray-100 text-gray-500"
                    : "hover:bg-gray-100 text-red-600"
                }`}
              >
                {isLoggingOut ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
