import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {/* Deposit */}
      <div
        onClick={() => navigate("/deposit")}
        className="bg-[#1F2937] hover:bg-[#27304a] p-4 rounded-lg shadow cursor-pointer transition"
      >
        <div className="text-green-400 text-3xl mb-2">📥</div>
        <h3 className="text-white font-semibold text-lg">Deposit</h3>
        <p className="text-gray-400 text-sm">Add funds to your wallet</p>
      </div>

      {/* Withdraw */}
      <div
        onClick={() => navigate("/withdraw")}
        className="bg-[#1F2937] hover:bg-[#27304a] p-4 rounded-lg shadow cursor-pointer transition"
      >
        <div className="text-red-400 text-3xl mb-2">📤</div>
        <h3 className="text-white font-semibold text-lg">Withdraw</h3>
        <p className="text-gray-400 text-sm">Bonus wallet only</p>
      </div>

      {/* My Rollover Plans */}
      <div
        onClick={() => navigate("/plans")}
        className="bg-[#1F2937] hover:bg-[#27304a] p-4 rounded-lg shadow cursor-pointer transition"
      >
        <div className="text-indigo-400 text-3xl mb-2">📜</div>
        <h3 className="text-white font-semibold text-lg">My Rollover Plans</h3>
        <p className="text-gray-400 text-sm">View subscriptions and tips</p>
      </div>

      {/* Buy Booking Codes */}
      <div
        onClick={() => navigate("/codes")}
        className="bg-[#1F2937] hover:bg-[#27304a] p-4 rounded-lg shadow cursor-pointer transition"
      >
        <div className="text-yellow-400 text-3xl mb-2">💡</div>
        <h3 className="text-white font-semibold text-lg">Buy Booking Codes</h3>
        <p className="text-gray-400 text-sm">Purchase tip codes</p>
      </div>
    </div>
  );
};

export default QuickActions;
