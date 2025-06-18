import React from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "../assets/lock.svg";
import moment from "moment";

const BookingCodeCard = ({ code }) => {
  const navigate = useNavigate();

  const {
    _id,
    odds,
    price,
    urgencyTag,
    category,
    slotLimit,
    purchasedBy = [],
    expiresAt,
    alreadyPurchased,
    code: actualCode,
  } = code || {};

  const buyerCount = purchasedBy.length;
  const remainingTime = moment(expiresAt).fromNow(true);

  const handleViewDetails = () => {
    if (_id) {
      navigate(`/booking-codes/${_id}`);
    } else {
      console.warn("🚫 Booking code ID is undefined");
    }
  };

  return (
    <div className="bg-[#0A0E2C] rounded-xl p-4 shadow-md text-white flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-2">
        {urgencyTag && (
          <span className="inline-block bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
            {urgencyTag}
          </span>
        )}
        {category && (
          <span className="inline-block bg-[#1F2D5C] text-white text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      <div className="text-lg font-bold text-yellow-400">₦{price}</div>
      <div className="text-sm text-gray-300">Odds: {odds}</div>
      {slotLimit && (
        <div className="text-sm text-gray-400">👥 {buyerCount}/{slotLimit}</div>
      )}
      <div className="text-sm text-gray-400">⏳ {remainingTime}</div>

      <div className="flex items-center gap-2">
        {alreadyPurchased ? (
          <span className="font-mono text-lg tracking-widest text-green-400">
            {actualCode}
          </span>
        ) : (
          <>
            <span className="font-mono tracking-widest text-xl">•••••••</span>
            <img src={LockIcon} alt="Locked" className="w-4 h-4" />
          </>
        )}
      </div>

      <button
        onClick={handleViewDetails}
        className="mt-3 text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        🔍 View Details
      </button>
    </div>
  );
};

export default BookingCodeCard;
