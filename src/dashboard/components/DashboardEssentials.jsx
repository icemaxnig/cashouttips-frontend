import React from "react";
import { Link } from "react-router-dom";

const DashboardEssentials = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
    <Link
      to="/wallet"
      className="p-6 bg-[#1B1E38] text-white rounded-lg shadow border border-yellow-400 hover:bg-yellow-500 hover:text-black text-center font-bold"
    >
      💰 Fund Wallet
    </Link>

    <Link
      to="/referral"
      className="p-6 bg-[#1B1E38] text-white rounded-lg shadow border border-yellow-400 hover:bg-yellow-500 hover:text-black text-center font-bold"
    >
      👥 Referral Program
    </Link>

    <Link
      to="/withdraw"
      className="p-6 bg-[#1B1E38] text-white rounded-lg shadow border border-yellow-400 hover:bg-yellow-500 hover:text-black text-center font-bold"
    >
      💸 Withdraw Bonus
    </Link>
  </div>
);

export default DashboardEssentials;
