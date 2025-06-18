// ✅ Rollover.jsx — Final Merged and Branded Full Tips View
import React, { useEffect, useState } from "react";
import api from "../api";
import PlanBadge from "../components/PlanBadge";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { toast } from "react-toastify";

const Rollover = () => {
  const [plans, setPlans] = useState([]);
  const [subscribedPlanIds, setSubscribedPlanIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/rollover/all")
      .then(res => setPlans(res.data))
      .catch(() => toast.error("Failed to load rollover tips"));

    api.get("/rollover/my")
      .then(res => setSubscribedPlanIds(res.data.map(p => p.planId)))
      .catch(() => console.warn("Could not fetch subscriptions"))
      .finally(() => setLoading(false));
  }, []);

  const isSubscribed = (id) => subscribedPlanIds.includes(id);

  return (
    <div className="bg-[#0A0E2C] text-white min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">
        📋 All Rollover Tips
      </h1>

      {loading ? (
        <p className="text-sm text-gray-400">Loading tips...</p>
      ) : plans.length === 0 ? (
        <p className="text-sm text-gray-400">No rollover tips available.</p>
      ) : (
        plans.map(plan => (
          <div key={plan.planId} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">{plan.planName}</h2>
              <PlanBadge odds={plan.totalOdds} />
            </div>
            <div className="space-y-4">
              {plan.tips.map((tip) => (
                <div
                  key={tip._id}
                  className={`rounded-xl p-4 border transition ${
                    new Date(tip.expiresAt) < new Date()
                      ? "bg-[#1c223f] border-gray-600 opacity-50 blur-[1px] pointer-events-none"
                      : "bg-[#1c223f] border-yellow-500"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-yellow-300 font-semibold">
                      📆 Day {tip.dayIndex + 1} — Total Odds: {tip.totalOdds}
                    </p>
                    <p className="text-xs text-red-400">
                      ⏳ <Countdown date={tip.expiresAt} />
                    </p>
                  </div>

                  <ul className={`text-sm space-y-1 ${!isSubscribed(plan.planId) ? "blur-sm" : ""}`}>
                    {tip.games.map((game, idx) => (
                      <li key={idx} className="border-b border-gray-700 pb-1">
                        <div className="font-semibold text-yellow-300">
                          {game.league} - {game.teams || `${game.teamA} vs ${game.teamB}`}
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

                  {!isSubscribed(plan.planId) && (
                    <div className="absolute inset-0 bg-[#0A0E2C]/80 backdrop-blur-sm z-10 flex items-center justify-center text-white text-xs font-semibold rounded-xl">
                      🔐 Subscribe to Unlock
                    </div>
                  )}
                </div>
              ))}
            </div>
            {!isSubscribed(plan.planId) && (
              <button
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 w-full py-2 rounded text-sm"
                onClick={() => navigate(`/subscribe/${plan.planId}`)}
              >
                🔐 Subscribe to Unlock {plan.planName}
              </button>
            )}
          </div>
        ))
      )}

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/subscribe")}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-2 rounded-full"
        >
          🧾 View All Plans
        </button>
      </div>
    </div>
  );
};

export default Rollover;
