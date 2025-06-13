import React from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    label: "🎯 1.5 Odds - 3 Days",
    description: "Steady entry plan",
  },
  {
    label: "🔥 2.0 Odds - 5 Days",
    description: "Boosted short run",
  },
  {
    label: "🚀 3.0 Odds - 7 Days",
    description: "Longer goal-chaser",
  },
];

const SubscribeRolloverPlansWidget = () => {
  return (
    <div className="bg-[#1C1F3C] rounded p-4 border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-yellow-300 font-semibold text-lg">📈 Subscribe to Rollover Plan</h4>
        <Link
          to="/rollover-plans"
          className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-1 px-3 rounded"
        >
          View More
        </Link>
      </div>

      <ul className="space-y-2">
        {plans.map((plan, index) => (
          <li
            key={index}
            className="bg-[#262A4F] p-3 rounded text-sm border border-gray-600 flex justify-between items-center"
          >
            <div>
              <div className="font-bold">{plan.label}</div>
              <div className="text-gray-400">{plan.description}</div>
            </div>
            <span className="text-yellow-400 font-bold">Subscribe →</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscribeRolloverPlansWidget;
