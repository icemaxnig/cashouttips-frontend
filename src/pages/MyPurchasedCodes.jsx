// src/dashboard/components/MyPurchasedCodes.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const MyPurchasedCodes = () => {
  const { token, loading } = useAuth();
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    if (!token || loading) return;

    api.get("/user/purchased-codes", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCodes(res.data))
      .catch(() => toast.error("Failed to load your purchased codes"));
  }, [token, loading]);

  return (
    <div className="max-w-3xl mx-auto p-4 text-white bg-[#0A0E2C] min-h-screen">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🎯 My Purchased Booking Codes</h1>

      {codes.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">You haven't purchased any codes yet.</div>
      ) : (
        <div className="space-y-4">
          {codes.map(p => (
            <div key={p._id} className="bg-[#111A44] p-4 rounded-xl shadow-md space-y-2">
              <div className="text-lg font-semibold text-green-400">
                🟢 Code: <span className="text-white font-mono">{p.code?.code || "N/A"}</span>
              </div>
              <div>📊 Odds: <span className="text-yellow-300">{p.code?.odds}</span></div>
              <div>🏦 Bookmaker: <span className="text-blue-300">{p.code?.bookmaker || "N/A"}</span></div>
              <div>⚡ Urgency: <span>{p.code?.urgencyTag || "Normal"}</span></div>
              <div className="text-sm text-gray-400">🕒 Purchased: {new Date(p.createdAt).toLocaleString()}</div>
              <Link
                to={`/booking-codes/${p.code?._id}`}
                className="inline-block mt-2 px-4 py-1 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300"
              >
                View Booking Code Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchasedCodes;
