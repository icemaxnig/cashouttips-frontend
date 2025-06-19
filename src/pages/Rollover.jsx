// 📄 Rollover.jsx — Full Public Tips Listing
import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../dashboard/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";

const Rollover = () => {
  const [tips, setTips] = useState([]);
  const [subscribedPlans, setSubscribedPlans] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTips = async () => {
      try {
        const [tipRes, subRes] = await Promise.all([
          api.get("/rollover/all", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/rollover/my-subscriptions", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const activeSubs = (subRes.data || []).filter(sub => new Date(sub.expiresAt) > new Date());
        setSubscribedPlans(activeSubs.map(p => p.planId));
        setTips(tipRes.data);
      } catch (err) {
        console.error("Error loading tips:", err);
      }
    };

    loadTips();
  }, [token]);

  const isSubscribed = (planId) => subscribedPlans.includes(planId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2D5C] mb-4">🎯 All Rollover Tips</h2>

      {tips.length === 0 ? (
        <div className="text-gray-400 text-sm">No tips available at the moment.</div>
      ) : (
        tips.map((tip, index) => {
          const tipData = tip.tips?.[0] || {};
          const subscribed = isSubscribed(tip.planId);
          const fakeSubs = tip.fakeSubscribers || 0;

          return (
            <div key={index} className="bg-[#0A0E2C] text-white rounded-xl shadow p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-yellow-300">
                  {tip.planName} ({tip.odds}x)
                </span>
                <span className="text-xs text-green-400 font-bold">{tip.totalOdds} Odds</span>
              </div>

              <div className="text-sm text-white">⚽ {tipData.games?.[0]?.teamA} vs {tipData.games?.[0]?.teamB}</div>
              <div className="text-xs text-gray-400">{tipData.games?.[0]?.league}</div>

              {subscribed ? (
                <>
                  <div className="text-sm text-green-400">Tip: {tipData.games?.[0]?.prediction || "N/A"}</div>
                  <div className="text-sm text-blue-400">Code: {tipData.bookingCode || "N/A"}</div>
                  {tipData.note && <div className="text-xs italic text-gray-400">💬 {tipData.note}</div>}
                </>
              ) : (
                <>
                  <div className="text-sm text-yellow-500">Tip: 🔒 Locked</div>
                  <div className="text-sm text-yellow-500">Code: 🔒 Locked</div>
                </>
              )}

              <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                {tipData.expiresAt && (
                  <span>⏳ <Countdown date={tipData.expiresAt} /></span>
                )}
                <span className="text-xs text-indigo-300 font-medium">
                  👥 {fakeSubs.toLocaleString()} Subscribers
                </span>
              </div>

              <div className="mt-2">
                <button
                  className={`px-4 py-1 text-sm rounded font-medium w-full ${subscribed ? "bg-indigo-600 text-white" : "bg-yellow-400 text-black"}`}
                  onClick={() => navigate(subscribed ? "/my-rollover" : "/subscribe")}
                >
                  {subscribed ? "🔍 View Today’s Tip" : "🔓 Subscribe to Unlock"}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Rollover;
