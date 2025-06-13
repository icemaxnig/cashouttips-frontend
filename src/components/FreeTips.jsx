// 📁 src/components/FreeTips.jsx
import React, { useEffect, useState } from "react";
import api from "../utils/api"; // adjust if path differs
import toast from "react-hot-toast";

const FreeTips = ({ compact }) => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    api.get("/tips?type=free")
      .then(res => setTips(res.data.tips || []))
      .catch(err => {
        console.error("Failed to fetch tips:", err);
        toast.error("Could not load free tips");
      });
  }, []);

  if (!tips.length) return null;

  return (
    <div className="bg-[#1C1F3C] rounded p-4 border border-gray-700">
      <h4 className="text-yellow-300 font-semibold mb-2 text-lg">🆓 Free Tips</h4>
      <ul className="space-y-2 text-white text-sm">
        {tips.slice(0, compact ? 3 : tips.length).map((tip, idx) => (
          <li key={idx} className="border-b border-gray-600 pb-2">
            <span className="block font-bold text-yellow-400">{tip.match}</span>
            <span>{tip.tip}</span> | <span className="italic">{tip.odd}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreeTips;
