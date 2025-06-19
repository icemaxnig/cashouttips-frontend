// 📄 PastTips.jsx — Dark Mode Version
import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";

const PastTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    api
      .get("/tips/past")
      .then((res) => setTips(res.data.tips || []))
      .catch((err) => console.error("Failed to load past tips", err));
  }, []);

  return (
    <div className="bg-[#0A0E2C] text-white min-h-screen p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-yellow-300">
        📈 Past Tips Performance
      </h2>

      {tips.length === 0 ? (
        <p className="text-gray-400 text-sm">No past tips available.</p>
      ) : (
        <div className="grid gap-4">
          {tips.map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-[#11152F] rounded-xl p-4 text-sm text-white shadow-md"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-yellow-400">{tip.title || tip.league || "Unnamed Tip"}</span>
                <span
                  className={`font-bold ${
                    tip.status === "Won"
                      ? "text-green-400"
                      : tip.status === "Lost"
                      ? "text-red-400"
                      : "text-yellow-300"
                  }`}
                >
                  {tip.status === "Won"
                    ? "✅ Won"
                    : tip.status === "Lost"
                    ? "❌ Lost"
                    : "⏳ Pending"}
                </span>
              </div>
              {tip.prediction && (
                <p className="text-xs text-gray-300 mb-1">
                  Prediction: <span className="text-white">{tip.prediction}</span>
                </p>
              )}
              {tip.kickoff && (
                <p className="text-xs text-gray-400">
                  Kickoff: {new Date(tip.kickoff).toLocaleString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastTips;
