// 📄 MyPurchasedCodes.jsx — Dark Branded with Alignment
import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyPurchasedCodes = ({ compact }) => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    api
      .get("/booking/purchased")
      .then((res) => setCodes(res.data || []))
      .catch((err) => console.error("Error fetching purchased codes", err));
  }, []);

  const displayCodes = codes.slice(0, compact ? 2 : 4);

  return (
    <div className="bg-[#11152F] rounded-2xl shadow-md p-4 w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-white">🎯 My Booking Codes</h3>
        <Link to="/booking-codes" className="text-yellow-400 text-sm hover:underline">
          See All
        </Link>
      </div>

      {codes.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">You haven’t purchased any codes yet.</p>
      ) : (
        <div className="grid gap-3">
          {displayCodes.map((code) => (
            <motion.div
              key={code._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-700 rounded-xl p-3 bg-[#0A0E2C]"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-white truncate">{code.league}</span>
                <span className="text-xs text-yellow-400 font-semibold">{code.totalOdds} Odds</span>
              </div>
              <div className="text-xs text-gray-300 truncate">
                {code.teamA} vs {code.teamB}
              </div>
              <div className="text-xs text-gray-400 mb-1">⏰ {code.kickoff}</div>
              <div className="text-xs text-green-400 font-bold">Code: {code.code}</div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Link
          to="/booking-codes"
          className="block w-full text-center text-sm font-semibold bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
        >
          🔍 View All Purchased
        </Link>
      </div>
    </div>
  );
};

export default MyPurchasedCodes;
