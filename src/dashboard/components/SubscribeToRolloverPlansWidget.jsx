
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const SubscribeToRolloverPlansWidget = () => {
  const [allPlans, setAllPlans] = useState([]);
  const [visiblePlans, setVisiblePlans] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/rollover/plans")
      .then(res => {
        const plans = res.data
          .filter(p => p.price > 0 && p.duration > 0)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setAllPlans(plans);
        setVisiblePlans(plans.slice(0, 3));
      })
      .catch(() => console.error("❌ Failed to load rollover plans"));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (allPlans.length <= 3) return;
      const nextIndex = (index + 3) % allPlans.length;
      setVisiblePlans(allPlans.slice(nextIndex, nextIndex + 3));
      setIndex(nextIndex);
    }, 3600000); // Rotate every hour
    return () => clearInterval(interval);
  }, [index, allPlans]);

  const simulateSubscribers = (plan) => {
    const created = new Date(plan.createdAt).getTime();
    const minutesSince = Math.floor((Date.now() - created) / 60000);
    return 50 + Math.floor(minutesSince * 1.5);
  };

  return (
    <div className="bg-[#1C1F3C] rounded-xl p-4 border border-gray-700 relative flex flex-col justify-between h-full">
      <div>
        <h4 className="text-yellow-300 font-semibold text-lg mb-3">
          🔁 Subscribe to Rollover Plan
        </h4>
        <div className="space-y-3">
          {visiblePlans.length === 0 ? (
            <p className="text-sm text-gray-300">No active plans available yet.</p>
          ) : (
            visiblePlans.map((plan) => (
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

      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/subscribe")}
          className="text-sm bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default SubscribeToRolloverPlansWidget;
