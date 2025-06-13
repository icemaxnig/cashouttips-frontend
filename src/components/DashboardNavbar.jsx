
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-indigo-800 bg-[#0A0E2C]">
      <div className="flex items-center gap-3">
        <img src={logo} alt="CashoutTips Logo" className="h-16 w-auto" />
        <span className="text-2xl font-extrabold text-yellow-400">CashoutTips</span>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/profile" className="bg-yellow-400 text-black text-sm px-4 py-2 rounded hover:bg-yellow-300 transition">My Profile</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
