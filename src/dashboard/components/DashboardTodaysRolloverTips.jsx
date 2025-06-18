// ✅ DashboardTodaysRolloverTips.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PlanBadge from "../../components/PlanBadge";

const DashboardTodaysRolloverTips = () => {
  const [tipsByPlan, setTipsByPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const res = await api.get("/rollover-tips/today");
      setTipsByPlan(res.data);
    } catch (err) {
      toast.error("Failed to load today's rollover tips");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-[#1c223f] h-32 rounded-xl p-4"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#0A0E2C] text-white mt-6">
      <h2 className="text-xl font-bold mb-4">🔥 Today's Rollover Tips</h2>
      {tipsByPlan.length === 0 ? (
        <p>No tips available for your subscribed plans today.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tipsByPlan.map(({ plan, tip }) => {
            const isExpired = new Date(tip.expiresAt) < new Date();
            return (
              <div
                key={tip._id}
                className={`rounded-xl p-4 border transition-all ${
                  isExpired
                    ? "bg-[#1c223f] border-gray-600 opacity-50 blur-[1px] pointer-events-none"
                    : "bg-[#1c223f] border-yellow-500"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-yellow-400">
                    {plan.name} - Day {tip.dayIndex + 1}
                  </h3>
                  <PlanBadge odds={plan.odds} />
                </div>
                <p className="text-green-400 font-bold mb-2">
                  Total Odds: {tip.totalOdds}
                </p>
                <ul className="text-sm space-y-1">
                  {tip.games.map((game, idx) => (
                    <li key={idx} className="border-b border-gray-600 pb-1">
                      <div className="font-semibold text-yellow-300">
                        {game.league} - {game.teams}
                      </div>
                      <div className="text-xs text-gray-300">
                        Kickoff: {game.kickoff} | Odds: {game.odds}
                      </div>
                      <div className="text-xs">
                        {game.bookmaker}: <span className="text-green-300">{game.bookingCode}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                {tip.note && (
                  <p className="mt-2 italic text-sm text-white/80">
                    Note: {tip.note}
                  </p>
                )}
                <p className="text-xs mt-2 text-red-400">
                  Expires: {new Date(tip.expiresAt).toLocaleString()}
                </p>
                {isExpired && (
                  <p className="text-xs text-red-400 italic mt-1">
                    This tip has expired
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/rollover")}
          className="px-4 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300"
        >
          View All Tips
        </button>
      </div>
    </div>
  );
};

export default DashboardTodaysRolloverTips;
