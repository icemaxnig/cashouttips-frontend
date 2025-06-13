import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock, FaUnlock } from "react-icons/fa";

const LockedBookingCard = ({ code, purchased, onBuy }) => {
  const minutesLeft = Math.floor((new Date(code.expiresAt) - Date.now()) / 60000);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.code);
    toast.info("Code copied to clipboard!");
  };

  const handleBuy = () => {
    onBuy(code._id, code.price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 w-full max-w-md mx-auto mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">⏳ Expires in: {minutesLeft} mins</span>
        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">{code.urgencyTag || "Standard"}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{code.bookmaker}</h3>
      <p className="text-sm text-gray-600">Odds: <strong>{code.odds}</strong></p>
      <p className="text-sm text-gray-600">Confidence: <strong>{code.successRate}%</strong></p>
      <p className="text-sm text-gray-600 mb-2">Price: <strong>₦{code.price}</strong></p>

      {purchased ? (
        <>
          <p className="font-mono bg-gray-100 p-2 rounded-lg text-center text-lg tracking-wide">{code.code}</p>
          <button
            onClick={handleCopy}
            className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl"
          >
            📋 Copy Code
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-center text-gray-400 text-2xl mb-2">
            <FaLock />
          </div>
          <button
            onClick={handleBuy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
          >
            💳 Buy for ₦{code.price}
          </button>
        </>
      )}
    </div>
  );
};

export default LockedBookingCard;