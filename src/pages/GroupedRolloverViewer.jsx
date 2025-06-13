// 📄 GroupedRolloverViewer.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const GroupedRolloverViewer = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/rollover/grouped")
      .then(res => setGroups(res.data))
      .catch(() => console.error("Failed to load grouped tips"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-white">Loading tips...</div>;

  if (groups.length === 0) {
    return <div className="p-4 text-yellow-300 text-center">No rollover tips available</div>;
  }

  return (
    <div className="p-4 text-white bg-[#0A0E2C] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400 text-center">🎯 All Rollover Tips</h1>
      {groups.map(group => (
        <div key={group.planId} className="mb-8">
          <div className="bg-[#1a1d3b] p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-400">
              {group.planName} ({group.odds} Odds / {group.duration} Days)
            </h2>
            {group.tips.map(tip => (
              <div key={tip._id} className="bg-[#0d112c] mt-3 p-4 rounded-md border border-blue-900">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Expires {dayjs(tip.expiresAt).fromNow()}</span>
                  <span>Day {tip.dayIndex ?? "-"}</span>
                </div>
                <ul className="list-disc ml-4 text-sm text-white space-y-1">
                  {tip.games.map((g, i) => (
                    <li key={i}>
                      <span className="text-yellow-300 font-semibold">{g.teams}</span> —{" "}
                      {g.prediction && <span>{g.prediction} @ </span>}
                      {g.odds} | {g.time}
                    </li>
                  ))}
                </ul>
                {tip.note && (
                  <p className="mt-2 text-xs italic text-gray-400">{tip.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupedRolloverViewer;
