// 📄 MyPurchasedCodes.jsx — Compact Mode Enabled
import React, { useEffect, useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";

const MyPurchasedCodes = ({ compact = false }) => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    api.get("/user/purchased-codes")
      .then(res => setCodes(res.data))
      .catch(() => toast.error("Failed to load your codes"));
  }, []);

  return (
    <div className={`bg-white border border-[#1F2D5C] rounded-2xl shadow-md ${compact ? 'p-3' : 'p-5'}`}>
      <h3 className={`font-bold text-[#1F2D5C] mb-3 ${compact ? 'text-sm' : 'text-lg'}`}>🎫 My Booking Codes</h3>

      {codes.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No codes purchased yet.</p>
      ) : (
        <ul className="space-y-2">
          {codes.slice(0, compact ? 2 : 5).map((code, i) => (
            <li key={i} className="text-xs bg-gray-50 p-2 rounded-md border border-gray-200">
              <div className="font-semibold">{code.bookmaker || "-"} — {code.bookingCode || "-"}</div>
              <div className="text-gray-600">{new Date(code.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPurchasedCodes;
