// 📦 RolloverCard.jsx (Unified tip display + color-coded countdown)
import React from "react";

const RolloverCard = ({ tip, locked = false }) => {
  const isExpired = new Date(tip.expiresAt) < new Date();

  const getCountdownColor = () => {
    if (!tip.countdown || typeof tip.countdown !== "string") return "text-gray-400";
    if (tip.countdown.includes("Expired")) return "text-red-500 font-bold";
    if (tip.countdown.includes("0h") || tip.countdown.includes("15m") || tip.countdown.includes("30m")) return "text-yellow-400 font-semibold animate-pulse";
    return "text-green-400";
  };

  return (
    <div className="bg-white text-black p-4 rounded-2xl shadow-md w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-[#1F2D5C]">
          🎯 {tip.planName || tip.plan?.name} • Day {tip.dayIndex || "-"}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${getCountdownColor()}`}>
          {tip.countdown || (isExpired ? "❌ Expired" : "⏳ Soon")}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        {tip.games?.map((game, i) => (
          <div key={i} className="border-b border-gray-200 pb-2">
            <div className="text-sm font-semibold">
              ⚽ {game.teamA} vs {game.teamB} <span className="text-gray-600 text-xs">({game.league})</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Prediction: <span className="text-yellow-700 font-semibold">{game.prediction || "--"}</span></span>
              <span>Odds: <span className="text-green-600 font-semibold">{game.odds}</span></span>
            </div>
            <div className="text-xs text-gray-500">Kickoff: {new Date(game.time).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="font-semibold text-[#1F2D5C]">Bookmaker:</span> {tip.bookmaker || "-"}
        </div>
        <div className="text-sm">
          <span className="font-semibold text-[#1F2D5C]">Code:</span>{" "}
          {locked || isExpired ? <span className="text-gray-400">🔒 Locked</span> : tip.bookingCode}
        </div>
      </div>
    </div>
  );
};

export default RolloverCard;
