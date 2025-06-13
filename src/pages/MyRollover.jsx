// 📄 MyRollover.jsx — Branded CashoutTips Style + Subscribe CTA + Responsive Layout
import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import toast from "react-hot-toast";

const MyRollover = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribedPlanIds, setSubscribedPlanIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/rollover/my")
      .then(res => {
        setTips(res.data);
        const subscribed = res.data.map(t => t.planId);
        setSubscribedPlanIds(subscribed);
      })
      .catch(() => toast.error("Failed to load tips"))
      .finally(() => setLoading(false));
  }, []);

  const renderCountdown = ({ hours, minutes, seconds, completed }) => {
    return completed ? "Expired" : `${hours}h ${minutes}m ${seconds}s left`;
  };

  const getDayNumber = (tip) => {
    if (!tip.totalDays || !tip.daysLeft || isNaN(tip.totalDays) || isNaN(tip.daysLeft)) return "-";
    return tip.totalDays - tip.daysLeft + 1;
  };

  return (
    <div className="p-4 min-h-screen bg-[#FAFAFA] text-[#222222] font-sans">
      <h2 className="text-2xl font-bold mb-4 font-poppins">🎯 Your Active Rollover Tips</h2>

      {loading && <p className="text-gray-600">Loading tips...</p>}

      {!loading && tips.length === 0 && (
        <p className="text-gray-400">You don't have any tips available right now.</p>
      )}

      <div className="space-y-6">
        {tips.map((tip, i) => (
          <div key={i} className="bg-white border border-[#1F2D5C] text-[#222222] p-5 rounded-2xl shadow-lg space-y-3">
            <div className="text-sm font-bold text-[#1F2D5C] flex flex-wrap justify-between items-center">
              <span>🎯 {tip.planName || tip.planType || "Unknown Plan"} • Day {getDayNumber(tip)} / {tip.totalDays || "-"}</span>
              {!subscribedPlanIds.includes(tip.planId) && (
                <button
                  onClick={() => navigate(`/subscribe/${tip.planId}`)}
                  className="bg-[#FFD700] text-sm text-black font-semibold px-4 py-1.5 rounded-full hover:bg-yellow-300 transition-all"
                >
                  🔓 Subscribe to this Plan
                </button>
              )}
            </div>

            <div className="grid gap-2">
              {tip.games?.length > 0 ? tip.games.map((game, j) => (
                <div key={j} className="border border-gray-200 p-3 rounded-xl bg-gray-50">
                  <div className="text-xs text-gray-500 font-medium">{game.sport || "⚽"} • {game.league || "-"}</div>
                  <div className="font-semibold text-base font-poppins">{game.teamA || "-"} vs {game.teamB || "-"}</div>
                  <div className="text-sm">🎯 <strong>Prediction:</strong> {game.prediction || "-"} • 🧮 <strong>Odds:</strong> {game.odds || "-"}</div>
                  <div className="text-xs text-gray-600">⏱️ Kickoff: {game.time ? new Date(game.time).toLocaleString() : "-"}</div>
                </div>
              )) : (
                <p className="text-xs text-gray-500 italic">No games attached</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 text-sm text-gray-600 border-t pt-3 gap-y-2">
              <div>🏦 <span className="font-semibold">Bookmaker:</span> {tip.bookmaker || "-"}</div>
              <div>📋 <span className="font-semibold">Code:</span> {tip.bookingCode || "-"}</div>
              <div>🎲 <span className="font-semibold">Total Odds:</span> {tip.totalOdds || "-"}</div>
              <div className="sm:col-span-2 text-right text-red-600 font-semibold font-mono">
                ⏳ <Countdown date={new Date(tip.expiresAt)} renderer={renderCountdown} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRollover;
