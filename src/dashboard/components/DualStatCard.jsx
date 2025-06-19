// 📄 DualStatCard.jsx — Compact Dark-Themed Dual Stats
import React from "react";

const DualStatCard = ({ tipsToday = 0, codesToday = 0 }) => {
  return (
    <div className="bg-[#11152F] p-4 rounded-2xl shadow-md text-white">
      <h3 className="text-sm font-medium text-yellow-400 mb-3">📊 Today's Stats</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Tips Stat */}
        <div className="bg-[#0A0E2C] p-3 rounded-xl border border-gray-700 text-center">
          <div className="text-xs text-gray-300 mb-1">Rollover Tips</div>
          <div className="text-xl font-bold text-white">{tipsToday}</div>
        </div>

        {/* Booking Codes Stat */}
        <div className="bg-[#0A0E2C] p-3 rounded-xl border border-gray-700 text-center">
          <div className="text-xs text-gray-300 mb-1">Booking Codes</div>
          <div className="text-xl font-bold text-white">{codesToday}</div>
        </div>
      </div>
    </div>
  );
};

export default DualStatCard;
