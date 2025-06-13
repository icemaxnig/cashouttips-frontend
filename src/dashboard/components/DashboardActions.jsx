import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Link to="/my-rollover" className="bg-[#1B1E38] p-6 rounded-lg border border-yellow-400 hover:bg-yellow-500 hover:text-black font-bold text-center">
      📅 View My Rollover Tips
    </Link>
    <Link to="/premium-codes" className="bg-[#1B1E38] p-6 rounded-lg border border-yellow-400 hover:bg-yellow-500 hover:text-black font-bold text-center">
      🪙 Buy Premium Booking Codes
    </Link>
    <Link to="/my-codes" className="bg-[#1B1E38] p-6 rounded-lg border border-yellow-400 hover:bg-yellow-500 hover:text-black font-bold text-center">
      🗂️ View My Purchased Codes
    </Link>
  </div>
);

export default DashboardActions;
