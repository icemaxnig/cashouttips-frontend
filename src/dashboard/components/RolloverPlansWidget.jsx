import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Adjust path if needed

const RolloverPlansWidget = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/rollover/plans")
      .then((res) => {
        const latest = res.data
          .filter(p => p.price && p.duration)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 3);
        setPlans(latest);
      })
      .catch(() => console.error("❌ Failed to load plans"));
  }, []);

  const simulateSubscribers = (plan) => {
    const created = new Date(plan.createdAt).getTime();
    const minutes = Math.floor((Date.now() - created) / 60000);
    return 50 + Math.floor(minutes * 1.5);
  };

  return (
    <div className="bg-[#1C1F3C] rounded-xl p-4 border border-gray-700 relative">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-yellow-300 font-semibold text-lg">
          🔁 Subscribe to Rollover Plan
        </h4>
        <button
          onClick={() => navigate("/rollover")}
          className="text-sm bg-yellow-500 text-black font-semibold px-3 py-1 rounded hover:bg-yellow-400"
        >
          View More
        </button>
      </div>

      <div className="space-y-3">
        {plans.length === 0 ? (
          <p className="text-sm text-gray-300">No active plans available yet.</p>
        ) : (
          plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-[#292D4A] p-3 rounded border border-gray-600 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-white font-semibold">🔥 {plan.odds} Odds</p>
                <p className="text-xs text-gray-300">
                  {plan.duration} Days • ₦{plan.price.toLocaleString()}
                </p>
                <p className="text-xs text-green-400">
                  Subscribers: {simulateSubscribers(plan).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => navigate("/rollover")}
                className="text-xs text-yellow-300 hover:underline"
              >
                Subscribe →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RolloverPlansWidget;
