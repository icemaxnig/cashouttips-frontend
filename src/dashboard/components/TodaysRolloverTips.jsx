// 📄 TodaysRolloverTips.jsx — Compact Preview for Dashboard
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Countdown from "react-countdown";
import { useAuth } from "../../dashboard/context/AuthContext";
import { toast } from "react-toastify";

const TodaysRolloverTips = () => {
  const [tips, setTips] = useState([]);
  const [subscribedPlanIds, setSubscribedPlanIds] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const [tipRes, subRes] = await Promise.all([
          api.get("/rollover/all", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/rollover/my", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setTips(tipRes.data.slice(0, 2)); // show only 2 tips
        setSubscribedPlanIds(subRes.data.map(p => p.planId));
      } catch (err) {
        console.error("Failed to load rollover preview:", err);
        toast.error("Failed to load rollover preview");
      }
    };
    fetchTips();
  }, [token]);

  const isSubscribed = (id) => subscribedPlanIds.includes(id);

  return (
    <div className="bg-[#0A0E2C] text-white p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold">🎯 Today’s Rollover Tips</h3>
        <button
          className="text-xs text-indigo-400 hover:underline"
          onClick={() => navigate("/rollover")}
        >
          See All
        </button>
      </div>
      {tips.length === 0 ? (
        <p className="text-sm text-gray-400">No tips available</p>
      ) : (
        tips.map((plan, i) => (
          <div key={i} className="mb-3 bg-[#11152F] p-3 rounded-lg relative">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{plan.planName}</span>
              <span className="text-xs text-gray-400">{plan.totalOdds} Odds</span>
            </div>
            {plan.tips[0]?.games.map((g, j) => (
              <div key={j} className={`text-sm ${!isSubscribed(plan.planId) ? "blur-sm" : ""}`}>
                ⚽ {g.teamA} vs {g.teamB} — {g.league}
              </div>
            ))}
            <p className="text-xs text-right text-gray-400 mt-1">
              ⏳ <Countdown date={plan.tips[0]?.expiresAt} />
            </p>
            {!isSubscribed(plan.planId) && (
              <div className="absolute inset-0 bg-[#0A0E2C]/80 backdrop-blur-sm z-10 flex items-center justify-center text-white text-xs font-semibold">
                Subscribe to Unlock
              </div>
            )}
          </div>
        ))
      )}
      <button
        className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-sm rounded-lg"
        onClick={() => navigate("/my-rollover")}
      >
        🔍 View My Rollover
      </button>
    </div>
  );
};

export default TodaysRolloverTips;