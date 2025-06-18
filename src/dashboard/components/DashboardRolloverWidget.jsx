// ✅ DashboardRolloverWidget.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import PlanBadge from "../../components/PlanBadge";

const DashboardRolloverWidget = () => {
  const [plans, setPlans] = useState([]);
  const [index, setIndex] = useState(0);
  const [stakeInputs, setStakeInputs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/rollover/plans").then((res) => {
      const result = Array.isArray(res.data) ? res.data : res.data.plans || [];
      setPlans(result);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % Math.ceil(plans.length / 2));
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [plans.length]);

  const handleStakeChange = (planId, value) => {
    setStakeInputs((prev) => ({ ...prev, [planId]: value }));
  };

  const getExpectedReturn = (stake, odds, days) => {
    const stakeValue = parseFloat(stake);
    const oddsValue = parseFloat(odds);
    if (isNaN(stakeValue) || isNaN(oddsValue)) return "";
    let compounded = stakeValue;
    for (let i = 0; i < days; i++) compounded *= oddsValue;
    return compounded.toFixed(2);
  };

  const visiblePlans = plans.slice(index * 2, index * 2 + 2);

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-800">🔥 Popular Rollover Plans</h3>
        <button
          className="text-blue-600 text-sm hover:underline"
          onClick={() => navigate("/subscribe")}
        >
          See All Plans
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visiblePlans.map((plan) => (
          <div
            key={plan._id}
            className="border rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center text-xs text-gray-500 font-medium mb-1">
              <span>🎯 {plan.name}</span>
              <PlanBadge odds={plan.odds} />
            </div>
            <div className="text-sm font-semibold mb-2 text-gray-800">
              ₦{plan.price} total — 👥 {plan.fakeSubscribers || 0}+ subs
            </div>

            <div className="mb-3">
              <input
                type="number"
                placeholder="Enter Stake"
                className="w-full p-2 border rounded text-sm"
                value={stakeInputs[plan._id] || ""}
                onChange={(e) => handleStakeChange(plan._id, e.target.value)}
              />
              {stakeInputs[plan._id] ? (
                <div className="text-xs text-green-700 mt-1">
                  💰 Est. Return in {plan.duration} Days: ₦
                  {getExpectedReturn(stakeInputs[plan._id], plan.odds, plan.duration)}
                </div>
              ) : (
                <div className="text-xs text-gray-400 mt-1">Enter Stake to Preview</div>
              )}
            </div>

            <button
              onClick={() => navigate("/subscribe")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm rounded"
            >
              View Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardRolloverWidget;


