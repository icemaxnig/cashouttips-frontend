import React from "react";
import { toast } from "react-toastify";
import { FaLock, FaUnlock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ModernBookingCard = ({ code, purchased, onBuy }) => {
  const minutesLeft = Math.floor((new Date(code.expiresAt) - Date.now()) / 60000);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.code);
    toast.info("🔔 Booking code copied!");
  };

  const handleBuy = () => {
    onBuy(code._id, code.price);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 max-w-md mx-auto transition-transform hover:scale-[1.01] border border-gray-100 relative">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">⏱ {minutesLeft} mins left</span>
        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
          {code.urgencyTag || "Standard"}
        </span>
      </div>

      <h2 className="text-lg font-bold text-gray-800">{code.bookmaker}</h2>
      <p className="text-sm text-gray-600 mt-1">📈 Odds: <b>{code.odds}</b></p>
      <p className="text-sm text-gray-600">🎯 Confidence: <b>{code.successRate}%</b></p>
      <p className="text-sm text-gray-600 mb-3">💰 Price: <b>₦{code.price}</b></p>

      {purchased ? (
        <>
          <div className="bg-gray-100 rounded-lg p-2 text-center font-mono text-lg tracking-wider text-gray-800 flex items-center justify-center gap-2">
            <FaUnlock className="text-green-500" />
            {code.code}
          </div>
          <button
            onClick={handleCopy}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl"
          >
            📋 Copy Code
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-center text-3xl text-blue-400 mb-4">
            <FaLock />
          </div>
          <button
            onClick={handleBuy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl"
          >
            💳 Unlock Tip for ₦{code.price}
          </button>
        </>
      )}
    </div>
  );
};

export default ModernBookingCard;