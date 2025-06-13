import React from "react";

const LockedTipCard = ({ tip, onUnlock }) => {
  return (
    <div className="bg-white/10 p-4 rounded-xl w-full sm:w-64 text-center border border-yellow-500">
      <h4 className="text-yellow-300 font-semibold">{tip.bookmaker}</h4>
      <p className="text-sm text-gray-400">Odds: {tip.odds}</p>
      <p className="text-sm text-red-400">Code: 🔒 Locked</p>
      <button
        onClick={() => onUnlock(tip._id)}
        className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
      >
        Unlock Tip ₦100
      </button>
    </div>
  );
};

export default LockedTipCard;