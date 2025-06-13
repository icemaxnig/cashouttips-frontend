// 📄 DashboardRolloverWidget.jsx — Compact Mode Support
import React, { useEffect, useState } from "react";
import api from "../../api";

const DashboardRolloverWidget = ({ compact = false }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get("/rollover/plans")
      .then(res => setPlans(res.data))
      .catch(() => console.error("Failed to load rollover plans"));
  }, []);

  return (
    <div className={`bg-white border border-[#1F2D5C] rounded-2xl shadow-md ${compact ? 'p-3' : 'p-5'}`}>
      <h3 className={`font-bold text-[#1F2D5C] mb-2 ${compact ? 'text-sm' : 'text-lg'}`}>🔥 Popular Rollover Plans</h3>
      <ul className="space-y-2">
        {plans.slice(0, compact ? 2 : 3).map((plan, i) => (
          <li key={i} className="text-xs bg-gray-50 p-2 rounded-md border border-gray-200">
            <div className="font-semibold">{plan.name}</div>
            <div className="text-gray-600">🎯 {plan.odds} Odds • 📅 {plan.duration} Days</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardRolloverWidget;
