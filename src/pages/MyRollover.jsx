import React, { useEffect, useState } from "react";
import api from "../api";
import PlanBadge from "../components/PlanBadge";
import { toast } from "react-toastify";
import Countdown from "react-countdown";

const MyRollover = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExpired, setShowExpired] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subRes = await api.get("/rollover/my-subscriptions");
        setSubscriptions(subRes.data);

        const tipsRes = await api.get("/rollover/today");
        const allTips = tipsRes.data;

        // Match tip to user’s plan if not expired
        const matchedTips = subRes.data.map(sub => {
          const match = allTips.find(
            tip =>
              tip.plan?._id?.toString() === sub.planId?.toString() &&
              new Date(tip.expiresAt) > new Date()
          );
          return match ? { ...match, subscription: sub } : null;
        }).filter(Boolean);

        setTips(matchedTips);
      } catch (err) {
        console.error("Error loading my rollover data:", err);
        toast.error("Failed to load your rollover tips");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isExpired = (sub) => new Date(sub.expiresAt) < new Date();

  const tomorrowMidnight = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  const progressBar = (current, total) => {
    const percent = Math.round((current / total) * 100);
    return (
      <div className="mt-1 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-[#1F2D5C]" style={{ width: `${percent}%` }} />
      </div>
    );
  };

  if (loading) return <div className="text-center p-4 text-gray-500">Loading your plans...</div>;

  const activeSubs = subscriptions.filter(sub => !isExpired(sub));
  const expiredSubs = subscriptions.filter(isExpired);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2D5C]">🎯 My Rollover Plans</h2>

      {activeSubs.length === 0 && (
        <div className="text-gray-500">You have no active rollover subscriptions.</div>
      )}

      {activeSubs.map(sub => {
        const tip = tips.find(t => t.plan._id === sub.planId);
        const daysLeft = Math.max(0, Math.ceil((new Date(sub.expiresAt) - new Date()) / (1000 * 60 * 60 * 24)));

        return (
          <div key={sub.planId} className="bg-white p-4 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-1">
              <PlanBadge odds={sub.odds} />
              <span className="text-sm text-gray-500">
                Day {sub.currentDay} of {sub.duration}
              </span>
            </div>
            {progressBar(sub.currentDay, sub.duration)}

            {tip ? (
              <>
                <ul className="text-sm text-gray-800 space-y-1 mt-2">
                  {tip.games.map((g, i) => (
                    <li key={i}>⚽ {g.teamA} vs {g.teamB} — {g.prediction} — {g.kickoff}</li>
                  ))}
                </ul>
                <div className="mt-2 text-sm text-gray-500">
                  ⏳ Expires in: <Countdown date={tip.expiresAt} />
                </div>
                {tip.note && (
                  <div className="mt-2 text-xs italic text-gray-600">💬 {tip.note}</div>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-400 mt-2">
                📭 No tip uploaded for your plan yet.<br />
                🕒 Next tip expected in: <Countdown date={tomorrowMidnight()} />
              </div>
            )}
          </div>
        );
      })}

      {expiredSubs.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setShowExpired(!showExpired)}
          >
            {showExpired ? "Hide" : "Show"} Expired Plans ({expiredSubs.length})
          </button>

          {showExpired && (
            <div className="grid gap-4 mt-4">
              {expiredSubs.map(sub => (
                <div key={sub.planId} className="bg-gray-100 p-4 rounded-xl shadow-inner">
                  <div className="flex justify-between items-center mb-1">
                    <PlanBadge odds={sub.odds} />
                    <span className="text-sm text-gray-400">Expired</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Started: {new Date(sub.startDate).toLocaleDateString()}<br />
                    Ended: {new Date(sub.expiresAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRollover;
