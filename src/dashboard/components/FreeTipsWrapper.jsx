import React, { useEffect, useState } from "react";
import api from "../../api";
import { motion } from "framer-motion";
import "./FreeTipsWrapper.scss";

const FreeTipsWrapper = () => {
  const [pastTips, setPastTips] = useState([]);

  useEffect(() => {
    api.get("/tips/past")
      .then(res => setPastTips(res.data.tips || []))
      .catch(err => console.error("Failed to load past tips", err));
  }, []);

  return (
    <motion.div 
      className="free-tips-card bg-[#FAFAFA] text-[#222222] p-4 rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
    >
      {/* 🎯 Section 1: Live Free Tips */}
      <div className="section live-tips mb-6">
        <h3 className="text-[#1F2D5C] font-poppins font-semibold text-lg mb-2">🎯 Free Tips Today</h3>
        <p className="font-inter text-sm mb-3">Join our premium communities for daily free expert tips:</p>
        <div className="cta-buttons flex flex-col gap-2">
          <a
            href="https://t.me/cashouttips_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1F2D5C] text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-[#152041] transition"
          >
            Join Telegram
          </a>
          <a
            href="https://whatsapp.com/channel/0029Vb9Sd0dAe5VtkUPqFg3n"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25d366] text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-[#1ebe54] transition"
          >
            Join WhatsApp
          </a>
        </div>
      </div>

      {/* 📈 Section 2: Past Tips */}
      <div className="section past-tips">
        <h4 className="text-[#1F2D5C] font-poppins font-semibold text-base mb-3">📈 Past Tips Performance</h4>
        <ul className="space-y-2 text-sm font-inter">
          {pastTips.slice(0, 3).map((tip, idx) => (
            <li key={idx} className="flex justify-between items-center bg-white border border-gray-200 p-2 rounded-md">
              <span>{tip.title || tip.league || "Unnamed Tip"}</span>
              <span className={`font-bold ${tip.status === "Won" ? "text-[#2ECC71]" : tip.status === "Lost" ? "text-[#E74C3C]" : "text-gray-500"}`}>
                {tip.status === "Won" ? "✅ Won" : tip.status === "Lost" ? "❌ Lost" : "⏳ Pending"}
              </span>
            </li>
          ))}
        </ul>
        <a 
          href="/past-tips" 
          className="inline-block mt-4 text-sm text-[#1F2D5C] hover:text-[#FFD700] transition underline"
        >
          View All Past Tips →
        </a>
      </div>
    </motion.div>
  );
};

export default FreeTipsWrapper;
