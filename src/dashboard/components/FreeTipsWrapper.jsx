// 📄 FreeTipsWrapper.jsx — Compact Dashboard Widget
import React, { useEffect, useState } from "react";
import api from "../../api";
import { motion } from "framer-motion";

const FreeTipsWrapper = () => {
  const [pastTips, setPastTips] = useState([]);

  useEffect(() => {
    api.get("/tips/past")
      .then(res => setPastTips(res.data.tips || []))
      .catch(err => console.error("Failed to load past tips", err));
  }, []);

  return (
    <motion.div
      className="bg-[#11152F] text-white p-4 rounded-xl shadow-md space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div>
        <h3 className="text-sm sm:text-md font-semibold text-yellow-400 mb-1">🎯 Free Tips Today</h3>
        <p className="text-xs text-gray-400 mb-2">Join our premium communities for free expert tips daily.</p>

        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <a
            href="https://t.me/cashouttips_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-4 rounded-lg text-center transition"
          >
            📢 Telegram
          </a>
          <a
            href="https://whatsapp.com/channel/0029Vb9Sd0dAe5VtkUPqFg3n"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-4 rounded-lg text-center transition"
          >
            📲 WhatsApp
          </a>
        </div>
      </div>

      {/* Past Performance */}
      <div>
        <h4 className="text-sm text-white font-medium mb-2">📈 Past Tips</h4>
        <ul className="space-y-1 text-xs">
          {pastTips.slice(0, 3).map((tip, idx) => (
            <li key={idx} className="flex justify-between items-center bg-[#1A1F3A] p-2 rounded-md">
              <span>{tip.title || tip.league || "Unnamed Tip"}</span>
              <span className={`font-bold ${
                tip.status === "Won"
                  ? "text-green-400"
                  : tip.status === "Lost"
                  ? "text-red-400"
                  : "text-gray-400"
              }`}>
                {tip.status === "Won" ? "✅ Won" : tip.status === "Lost" ? "❌ Lost" : "⏳ Pending"}
              </span>
            </li>
          ))}
        </ul>
        <a
          href="/past-tips"
          className="inline-block mt-3 text-xs text-indigo-400 hover:underline transition"
        >
          View All → 
        </a>
      </div>
    </motion.div>
  );
};

export default FreeTipsWrapper;
