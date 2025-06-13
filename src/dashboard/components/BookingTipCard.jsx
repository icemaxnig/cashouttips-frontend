// BookingCodeCard.jsx (Updated to link Buy button to /booking-codes/:id)

import React from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@/assets/lock.svg";

const BookingCodeCard = ({ code }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/booking-codes/${code._id}`);
  };

  return (
    <div className="rounded-xl bg-[#0A0E2C] border border-yellow-400 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-yellow-300">🎯 {code.category || "Booking Code"}</h3>
        <span className="text-sm text-white/60">{code.odds} Odds</span>
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-2">
          <img src={LockIcon} alt="Locked" className="w-5 h-5" />
          <span className="text-white text-sm font-mono">{code.code ? "Locked" : "No Code Yet"}</span>
        </div>

        <p className="text-white/70 mt-1 text-xs">{code.bookmaker} | {code.successRate}% confidence</p>
        {code.alreadyPurchased && (
          <p className="text-green-500 text-sm mt-1 font-semibold">✔️ Purchased</p>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-white">Buy for <span className="text-yellow-400 font-semibold">₦{code.price}</span></p>
        {!code.alreadyPurchased && (
          <button
            onClick={handleBuyClick}
            className="text-sm bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCodeCard;
