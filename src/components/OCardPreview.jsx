import React from "react";

const OCardPreview = ({ tip }) => {
  const remaining = tip.slotLimit > 0
    ? tip.slotLimit - (tip.purchasedBy?.length || 0)
    : "∞";

  return (
    <div className="bg-white text-black border border-gray-300 rounded-lg shadow-md p-4 w-full max-w-md">
      <div className="flex justify-between mb-2">
        <span className="text-xs font-semibold bg-yellow-400 text-black px-2 py-0.5 rounded">
          {tip.category}
        </span>
        <span className="text-xs font-semibold bg-pink-500 text-white px-2 py-0.5 rounded">
          {tip.urgency}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-800">{tip.bookmaker}</h3>
      <p className="font-mono text-xl text-gray-900 my-1">{tip.code}</p>

      <div className="grid grid-cols-2 text-xs text-gray-700 gap-y-1 mt-2">
        <span>🎯 Odds: {tip.totalOdds}</span>
        <span>₦{tip.amount?.toLocaleString()}</span>
        <span>🎛️ Confidence: {tip.confidence}%</span>
        <span>⏳ {new Date(tip.expiresAt).toLocaleString()}</span>
        <span>🎟️ Slots Left: {remaining}</span>
      </div>

      {tip.note && (
        <p className="mt-2 text-xs italic text-gray-600">💬 {tip.note}</p>
      )}
    </div>
  );
};

export default OCardPreview;
