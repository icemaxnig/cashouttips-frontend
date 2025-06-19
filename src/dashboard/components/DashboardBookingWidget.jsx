
// 📄 DashboardBookingWidget.jsx — Updated Dark Theme + Clean Title
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { AnimatePresence, motion } from "framer-motion";

const DashboardBookingWidget = ({ compact }) => {
  const [bookingCodes, setBookingCodes] = useState([]);

  useEffect(() => {
    api
      .get("/booking")
      .then((res) => setBookingCodes(res.data || []))
      .catch((err) => console.error("Error fetching booking codes", err));
  }, []);

  const displayedCodes = bookingCodes.slice(0, compact ? 2 : 3);

  return (
    <div className="bg-[#11152F] rounded-2xl shadow-md p-4 w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-white">🎯 Booking Codes</h3>
        <Link to="/booking-codes" className="text-yellow-400 text-sm hover:underline">
          See All
        </Link>
      </div>

      {bookingCodes.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-6">
          No available codes. All premium codes have been purchased.
        </p>
      ) : (
        <div className="grid gap-3">
          <AnimatePresence mode="wait">
            {displayedCodes.map((code) => (
              <motion.div
                key={code._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-700 rounded-xl p-3 bg-[#0A0E2C]"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-white truncate">
                    {code.league || "Unknown League"}
                  </span>
                  <span className="text-xs text-yellow-400 font-semibold">
                    {code.totalOdds} Odds
                  </span>
                </div>
                <div className="text-xs text-gray-300 truncate">
                  {code.teamA} vs {code.teamB}
                </div>
                <div className="text-xs text-gray-400">⏰ {code.kickoff}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-4">
        <Link
          to="/booking-codes"
          className="block w-full text-center text-sm font-semibold bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
        >
          🔓 View Booking Codes
        </Link>
      </div>
    </div>
  );
};

export default DashboardBookingWidget;
