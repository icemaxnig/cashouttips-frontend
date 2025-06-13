// 📦 OCard.jsx (Booking card with color-coded countdown)
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useAuth } from "../dashboard/context/authContext";

const OCard = ({ tip, refresh }) => {
  const { user } = useAuth();
  const [confirm, setConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const alreadyPurchased = tip.purchasedBy?.includes(user._id);
  const remaining = tip.slotLimit > 0
    ? tip.slotLimit - (tip.purchasedBy?.length || 0)
    : "∞";

  const formatCode = (code) => {
    if (!code) return "";
    const visible = code.slice(0, 3);
    return alreadyPurchased ? code : visible + "•••••";
  };

  const handleBuy = async () => {
    try {
      await api.post(`/booking/purchase/${tip._id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("✅ Unlocked!");
      refresh && refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Purchase failed");
    } finally {
      setConfirm(false);
    }
  };

  const getTimeRemaining = () => {
    if (!tip.expiresAt) return "Unknown";
    const diff = new Date(tip.expiresAt) - new Date();
    if (diff <= 0) return "❌ Expired";
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return hrs > 0 ? `${hrs}h ${remainingMins}m` : `${remainingMins}m`;
  };

  const getCountdownStyle = () => {
    const diff = new Date(tip.expiresAt) - new Date();
    if (diff <= 0) return "text-red-500 font-bold";
    if (diff <= 30 * 60 * 1000) return "text-yellow-300 font-semibold animate-pulse";
    return "text-green-400";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [tip.expiresAt]);

  return (
    <div
      className={`rounded-xl shadow p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative transition ${
        new Date(tip.expiresAt) - new Date() <= 30 * 60 * 1000
          ? "bg-[#1f0a0a] border border-red-500 animate-pulse"
          : "bg-[#101322] border border-gray-700"
      }`}
    >
      {/* Left Info */}
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold bg-yellow-300 text-black px-2 py-0.5 rounded-full">
            🏷️ {tip.category}
          </span>
          <span className="text-xs font-bold bg-pink-600 text-white px-2 py-0.5 rounded-full">
            ⚡ {tip.urgency}
          </span>
        </div>
        <div className="text-white text-sm font-medium">📍 {tip.bookmaker}</div>
        <div className="text-gray-300 text-xs">🎛️ Confidence: {tip.confidence || "--"}%</div>
        <div className={`text-xs ${getCountdownStyle()}`}>⏳ Expires in: {timeLeft}</div>
        <div className="text-gray-300 text-xs">🎟️ Slots Left: {remaining}</div>
      </div>

      {/* Right Info */}
      <div className="flex flex-col items-start sm:items-end gap-2">
        <div className="text-lg font-mono text-white tracking-wider">
          {formatCode(tip.code)}
        </div>
        <div className="text-sm text-indigo-300 flex items-center gap-1">
          🎯 Odds: {tip.totalOdds}
          {new Date(tip.expiresAt) - new Date() <= 30 * 60 * 1000 && (
            <span className="text-red-400 text-xs font-bold animate-ping ml-1">⚠️</span>
          )}
        </div>
        <div className="text-sm text-green-400 font-semibold">
          ₦{tip.amount?.toLocaleString()}
        </div>

        {alreadyPurchased ? (
          <span className="text-xs text-green-500 font-bold">✅ Purchased</span>
        ) : (
          <button
            onClick={() => setConfirm(true)}
            disabled={remaining === 0}
            className={`px-3 py-1 mt-1 rounded text-xs font-semibold ${
              remaining === 0
                ? "bg-gray-500 cursor-not-allowed text-white"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            {remaining === 0 ? "SOLD OUT" : "UNLOCK"}
          </button>
        )}
      </div>

      {/* Modal */}
      {confirm && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 rounded-xl">
          <div className="bg-white text-black p-4 rounded w-[90%] max-w-xs shadow-lg">
            <p className="text-sm font-semibold mb-2">Confirm Purchase</p>
            <p className="text-xs mb-4">Unlock this code for ₦{tip.amount}?</p>
            <div className="flex justify-end gap-2 text-sm">
              <button onClick={() => setConfirm(false)} className="text-gray-600">Cancel</button>
              <button onClick={handleBuy} className="bg-yellow-400 text-black px-3 py-1 rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCard;
