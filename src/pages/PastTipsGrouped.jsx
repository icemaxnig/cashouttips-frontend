
// 📄 PastTips.jsx — Grouped by Day with Dark Mode
import React, { useEffect, useState } from "react";
import api from "../../api";
import { format } from "date-fns";
import "./PastTips.scss";

const PastTips = () => {
  const [tips, setTips] = useState([]);
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    api.get("/tips/past")
      .then((res) => {
        const sorted = res.data.tips?.sort((a, b) => new Date(b.kickoff) - new Date(a.kickoff));
        const groupedByDate = {};
        sorted.forEach((tip) => {
          const day = format(new Date(tip.kickoff), "yyyy-MM-dd");
          if (!groupedByDate[day]) groupedByDate[day] = [];
          groupedByDate[day].push(tip);
        });
        setGrouped(groupedByDate);
        setTips(sorted);
      })
      .catch((err) => console.error("Failed to load past tips", err));
  }, []);

  return (
    <div className="bg-[#0A0E2C] min-h-screen text-white px-4 py-6 max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-[#FFD700]">📈 Past Tips</h2>

      {Object.keys(grouped).length === 0 && (
        <p className="text-gray-400">No past tips available.</p>
      )}

      {Object.entries(grouped).map(([date, tipsOnDate]) => (
        <div key={date} className="bg-[#11152F] rounded-xl p-4 shadow space-y-3">
          <h3 className="text-lg text-[#FFD700] font-semibold">
            🗓️ {format(new Date(date), "EEEE, MMMM d")}
          </h3>
          <ul className="space-y-2">
            {tipsOnDate.map((tip, idx) => (
              <li
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border border-gray-700 p-3 rounded-md"
              >
                <div className="text-sm text-white">
                  ⚽ {tip.teamA} vs {tip.teamB}
                  <div className="text-xs text-gray-400">{tip.league}</div>
                  <div className="text-xs mt-1">Prediction: <span className="text-yellow-400">{tip.prediction}</span></div>
                  <div className="text-xs">Kickoff: {format(new Date(tip.kickoff), "hh:mm a")}</div>
                </div>
                <div className="mt-2 sm:mt-0 text-sm font-bold text-right">
                  {tip.status === "Won" ? (
                    <span className="text-green-400">✅ Won</span>
                  ) : tip.status === "Lost" ? (
                    <span className="text-red-400">❌ Lost</span>
                  ) : (
                    <span className="text-gray-400">⏳ Pending</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PastTips;
