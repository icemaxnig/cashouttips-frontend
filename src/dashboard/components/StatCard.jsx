// 📄 StatCard.jsx — Aligned for Dark Dashboard
import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-[#11152F] text-white rounded-2xl shadow-md p-4 w-full">
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className="text-2xl font-bold text-yellow-400">{value}</div>
    </div>
  );
};

export default StatCard;
