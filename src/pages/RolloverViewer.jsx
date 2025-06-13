
// RolloverViewer.jsx (Full viewer with prediction display)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RolloverViewer = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      const res = await axios.get('/api/rollover');
      setTips(res.data);
    };
    fetchTips();
  }, []);

  return (
    <div className="p-4">
      {tips.map((tip) => (
        <div key={tip._id} className="mb-6 p-4 bg-white rounded-2xl shadow-md">
          <div className="mb-2 text-[#1F2D5C] font-bold">Day {tip.dayIndex} • Plan: {tip.planId.name}</div>
          {tip.games.map((game, i) => (
            <div key={i} className="flex justify-between text-sm py-2 border-b border-gray-100">
              <div>
                <div className="font-medium text-[#1F2D5C]">{game.teamA} vs {game.teamB}</div>
                <div className="text-xs text-gray-500">{new Date(game.kickoff).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-semibold">💸 {game.odds}</div>
                {game.prediction && <div className="text-xs italic text-yellow-600">📊 {game.prediction}</div>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RolloverViewer;
