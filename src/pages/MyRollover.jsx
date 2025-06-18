import React, { useEffect, useState } from "react";
import api from "../api";
import PlanBadge from "../components/PlanBadge";

const MyRollover = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get("/rollover/my")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Error loading my rollover plans", err));
  }, []);

  const countdown = (expiry) => {
    const ms = new Date(expiry) - new Date();
    if (ms <= 0) return "Expired";
    const mins = Math.floor((ms / 1000 / 60) % 60);
    const hrs = Math.floor((ms / 1000 / 60 / 60) % 24);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="bg-[#0A0E2C] min-h-screen text-white px-4 py-6 space-y-6">
      <h1 className="text-xl font-bold mb-4">🎯 My Rollover Tips</h1>

      {plans.length === 0 ? (
        <p className="text-gray-400">No active rollover plans.</p>
      ) : (
        plans.map((plan) => (
          <div key={plan._id} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <PlanBadge odds={plan.odds} />
            </div>

            {plan.tips.map((tip, idx) => (
              <div key={idx} className="bg-[#131A42] rounded-xl p-4">
                <p className="text-sm text-gray-300">📆 Day {tip.dayIndex + 1}</p>
                <p className="font-bold text-base mt-1">{tip.games?.join(" | ")}</p>
                <p className="text-green-400 text-sm mt-1">⏳ {countdown(tip.expiresAt)}</p>
                <p className="text-xs text-yellow-500 mt-1">{tip.note}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyRollover;
