// 📄 TodaysRolloverTips.jsx — Final Branded Dashboard Widget
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Countdown from "react-countdown";
import { useAuth } from "../context/AuthContext";

const TodaysRolloverTips = ({ compact }) => {
  const [tips, setTips] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const [tipRes, subRes] = await Promise.all([
          api.get("/rollover/today", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/rollover/my-subscriptions", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setTips(tipRes.data.slice(0, compact ? 2 : 3));
        setSubscriptions(subRes.data);
      } catch (err) {
        console.error("❌ Error loading rollover tips", err);
      }
    };

    fetchTips();
  }, [token, compact]);

  const isSubscribed = (planId) =>
    subscriptions.some((sub) => sub.planId === planId);

  return (
    <div className="bg-[#11152F] rounded-2xl shadow-md p-4 w-full text-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-yellow-400">🎯 Today’s Rollover Tips</h3>
        <button
          onClick={() => navigate("/rollover")}
          className="text-sm text-yellow-300 hover:underline"
        >
          View All
        </button>
      </div>

      {tips.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-6">
          No rollover tips posted yet today.
        </p>
      ) : (
        <div className="space-y-3">
          {tips.map((tip) => {
            const subscribed = isSubscribed(tip.planId);
            const firstGame = tip.games[0];

            return (
              <div
                key={tip._id}
                className="bg-[#0A0E2C] p-3 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-white truncate">
                    {tip.planName} Plan
                  </span>
                  <span className="text-xs text-yellow-400 font-semibold">
                    {tip.totalOdds} Odds
                  </span>
                </div>
                {firstGame && (
                  <>
                    <div className="text-xs text-gray-300">
                      ⚽ {firstGame.teamA} vs {firstGame.teamB}
                    </div>
                    <div className="text-xs text-gray-400">{firstGame.league}</div>
                    <div className="text-xs text-gray-400">⏰ {firstGame.kickoff}</div>
                    <div className="mt-1 text-xs">
                      Tip:{" "}
                      {subscribed ? (
                        <span className="text-green-400">{firstGame.prediction}</span>
                      ) : (
                        <span className="text-yellow-400">🔒 Locked</span>
                      )}
                    </div>
                    <div className="text-xs">
                      Code:{" "}
                      {subscribed ? (
                        <span className="text-blue-400">{tip.bookingCode}</span>
                      ) : (
                        <span className="text-yellow-400">🔒 Locked</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      ⏳ <Countdown date={tip.expiresAt} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4">
        {subscriptions.length > 0 ? (
          <button
            onClick={() => navigate("/my-rollover")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold text-sm"
          >
            🔍 View More Today’s Tips
          </button>
        ) : (
          <button
            onClick={() => navigate("/subscribe")}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg font-semibold text-sm"
          >
            🔓 Subscribe to Unlock
          </button>
        )}
      </div>
    </div>
  );
};

export default TodaysRolloverTips;
