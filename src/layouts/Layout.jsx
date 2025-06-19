// 📄 Layout.jsx — Unified Layout Wrapper
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white font-poppins">
      <header className="bg-[#0A0E2C] shadow-md py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="CashoutTips Logo" className="h-8 sm:h-10" />
          <h1 className="text-lg sm:text-xl font-bold text-white">CashoutTips</h1>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6">
        <Outlet />
      </main>

      <footer className="bg-[#0A0E2C] text-center text-xs text-gray-500 py-4">
        &copy; {new Date().getFullYear()} CashoutTips. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
