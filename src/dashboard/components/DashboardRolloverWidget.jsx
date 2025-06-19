
// 📄 DashboardRolloverWidget.jsx — Updated Dark Theme + Clean Title
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const DashboardRolloverWidget = ({ compact }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get("/rollover/plans").then((res) => {
      setPlans(res.data?.plans?.slice(0, compact ? 2 : 3) || []);
    });
  }, [compact]);

  return (
    <div className="bg-[#11152F] rounded-2xl shadow-md p-4 w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-white">🔥 Rollover Plans</h3>
        <Link to="/subscribe" className="text-yellow-400 text-sm hover:underline">
          See All
        </Link>
      </div>

      {plans.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">No plans available.</p>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => (
            <div key={plan._id} className="border border-gray-700 bg-[#0A0E2C] rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-white font-semibold">{plan.name}</span>
                <span className="text-xs text-yellow-400">{plan.odds} Odds</span>
              </div>
              <p className="text-xs text-gray-300">{plan.duration} Days • ₦{plan.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Link
          to="/subscribe"
          className="block w-full text-center text-sm font-semibold bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
        >
          💰 View Plans
        </Link>
      </div>
    </div>
  );
};

export default DashboardRolloverWidget;
