import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

const FreeTips = () => {
  const [tip, setTip] = useState(null);

  useEffect(() => {
    api.get("/freetip/latest")
      .then(res => setTip(res.data))
      .catch(() => setTip(null));
  }, []);

  if (!tip) return <div className="p-4 text-center">No free tip available.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Today’s Free Tip Preview</h2>
      <div className="bg-white/10 text-white rounded-2xl border border-white/10 shadow p-4 max-w-xl mx-auto">
        {tip.games.map((game, index) => (
          <div key={index} className="mb-3 border-b pb-2">
            <p className="text-sm font-medium text-yellow-400">{game.sport} | {game.league}</p>
            <p className="text-lg font-semibold">{game.teams}</p>
            <p className="text-xs text-gray-300">Time: {game.time}</p>
          </div>
        ))}
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700"
          onClick={() => window.open("https://t.me/cashouttips_ai", "_blank")}
        >
          View Full Tip on Telegram
        </button>
      </div>
    </div>
  );
};

export default FreeTips;
