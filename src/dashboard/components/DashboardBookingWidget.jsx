// 📁 src/dashboard/components/DashboardBookingWidget.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api";

const DashboardBookingWidget = () => {
  const [bookingCodes, setBookingCodes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [now, setNow] = useState(Date.now());

  // Countdown timer tick every second
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  const fetchCodes = () => {
    const token = localStorage.getItem("token");
    api
      .get("/booking-codes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const validCodes = res.data.filter(
          (code) => !code.alreadyPurchased && new Date(code.expiresAt) > new Date()
        );
        setBookingCodes(validCodes);
      })
      .catch((err) => console.error("❌ Error fetching booking codes", err));
  };

  fetchCodes(); // initial load

  window.addEventListener("focus", fetchCodes); // re-fetch when user comes back
  return () => window.removeEventListener("focus", fetchCodes);
}, []);


  // Rotate every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 1 >= Math.min(2, bookingCodes.length) ? 0 : prev + 1
      );
    }, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, [bookingCodes.length]);

  const displayedCodes = bookingCodes.slice(currentIndex, currentIndex + 2);

  const getCountdown = (expiry) => {
    const diff = new Date(expiry).getTime() - now;
    if (diff <= 0) return "Expired";
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const hrs = Math.floor((diff / 1000 / 60 / 60) % 24);
    return `⏳ ${hrs}h ${mins}m`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-gray-800">
          🎯 Premium Booking Codes
        </h3>
        <Link
          to="/booking-codes"
          className="text-blue-600 text-sm hover:underline"
        >
          See All
        </Link>
      </div>

      {bookingCodes.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-6">
          No available codes. All premium codes have been purchased.
        </p>
      ) : (
        <div className="grid gap-3">
          <AnimatePresence mode="wait">
            {displayedCodes.map((code) => (
              <motion.div
                key={code._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="border border-gray-200 rounded-xl p-3 bg-gray-50"
              >
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium animate-pulse">
                    {code.successRate || 0}% Success
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-medium ${
                      code.urgencyTag === "High"
                        ? "bg-red-200 text-red-700 animate-pulse"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {code.urgencyTag}
                  </span>
                </div>
                <div className="text-sm text-gray-800 space-y-1 mb-2">
                  <div>📊 Odds: <strong>{code.odds}</strong></div>
                  <div>🏦 {code.bookmaker}</div>
                  <div>💵 ₦{code.price}</div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>👥 {code.purchasedBy?.length || 0} buyers</span>
                  <span>🎫 {code.slotLimit - (code.purchasedBy?.length || 0)} left</span>
                </div>
                <div className="text-xs text-red-500 font-medium mb-2">
                  {getCountdown(code.expiresAt)}
                </div>
                <Link
                  to="/booking-codes"
                  className="block w-full text-center bg-blue-600 text-white py-1.5 text-sm rounded-md hover:bg-blue-700"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default DashboardBookingWidget;
