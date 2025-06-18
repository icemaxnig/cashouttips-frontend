
// 📁 pages/FreeTips.jsx

import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const FreeTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    api.get("/tips?type=free")
      .then(res => setTips(res.data))
      .catch(() => toast.error("Failed to load free tips"));
  }, []);

  const handleRedirect = () => {
    window.open("https://t.me/yourchannel", "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎁 Free Tips</h2>
      {tips.length === 0 ? (
        <p>No free tips available today.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, i) => (
            <div key={i} className="bg-[#1B1E38] p-4 rounded border border-gray-600">
              <p className="text-sm">🏟️ <strong>{tip.league}</strong></p>
              <p className="text-sm">⚽ {tip.teams} – {tip.time}</p>
              <p className="text-sm">Odds: <strong>{tip.totalOdds}</strong></p>
              <button
                onClick={handleRedirect}
                className="btn mt-2 bg-blue-500 text-white py-1 px-3 rounded"
              >
                View on Telegram
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreeTips;
