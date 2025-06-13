// 📄 TodaysRolloverTips.jsx — Branded Dashboard Styling
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Countdown from "react-countdown";
import toast from "react-hot-toast";

const TodaysRolloverTips = () => {
  const [tips, setTips] = useState([]);
  const [subscribedPlanIds, setSubscribedPlanIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/rollover/today")
      .then(res => setTips(res.data))
      .catch(() => toast.error("Failed to load today's tips"))
      .finally(() => setLoading(false));

    api.get("/rollover/my")
      .then(res => {
        const subscribed = res.data.map(t => t.planId);
        setSubscribedPlanIds(subscribed);
      });
  }, []);

  const renderCountdown = ({ hours, minutes, seconds, completed }) => {
    return completed ? "Expired" : `${hours}h ${minutes}m ${seconds}s left`;
  };

  return (
    <div className="bg-[#FAFAFA] rounded-2xl p-4 shadow-lg border border-[#1F2D5C]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-[#1F2D5C] font-poppins">🎯 Today’s Rollover Tips</h3>
        <button
          onClick={() => navigate("/rollover")}
          className="text-sm text-blue-700 font-medium hover:underline"
        >
          View All
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {!loading && tips.length === 0 && (
        <p className="text-sm text-gray-400 italic">No tips available today.</p>
      )}

      {tips.slice(0, 1).map((tip, i) => {
        const isLocked = !subscribedPlanIds.includes(tip.planId);
        const visibleGames = tip.games.slice(0, 2);

        return (
          <div key={i} className="relative bg-white border border-[#1F2D5C] rounded-2xl p-4 shadow-md overflow-hidden">
            <div className="text-sm font-bold text-[#1F2D5C] mb-2 font-poppins">
              🎯 {tip.planName || tip.planType || "Unknown Plan"}
            </div>

            <div className="space-y-2">
              {visibleGames.map((game, j) => (
                <div
                  key={j}
                  className={`rounded-xl p-3 ${isLocked ? 'relative overflow-hidden bg-gray-200' : 'bg-[#F9F9F9] border border-gray-200'}`}
                >
                  {isLocked && <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-10 rounded-xl" />}
                  <div className="relative z-20 space-y-1">
                    <div className="text-xs text-gray-500 font-medium uppercase">{game.league || "-"}</div>
                    <div className="text-sm font-semibold font-poppins">{game.teamA || "-"} vs {game.teamB || "-"}</div>
                    <div className="text-xs">🎯 Prediction: {game.prediction || "-"} • 🧮 Odds: {game.odds || "-"}</div>
                    <div className="text-xs text-gray-600">⏱️ Kickoff: {new Date(game.time).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Always visible */}
            <div className="text-xs mt-4 text-gray-700 relative z-30 space-y-1">
              <div>🏦 <span className="font-semibold">Bookmaker:</span> {tip.bookmaker || "-"}</div>
              <div>📋 <span className="font-semibold">Code:</span> {tip.bookingCode || "-"}</div>
              <div className="text-red-600 font-semibold font-mono">
                ⏳ <Countdown date={new Date(tip.expiresAt)} renderer={renderCountdown} />
              </div>
            </div>

            {isLocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-40">
                <p className="text-center font-semibold mb-2 text-black bg-white px-4 py-1 rounded-full shadow">🔒 Locked Tip</p>
                <button
                  onClick={() => navigate(`/subscribe/${tip.planId}`)}
                  className="bg-[#FFD700] text-black font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-300"
                >
                  Subscribe to Unlock
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TodaysRolloverTips;
