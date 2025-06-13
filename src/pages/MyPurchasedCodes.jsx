import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const MyPurchasedCodes = () => {
  const [codes, setCodes] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await api.get(`/codes/purchased/${userId}`);
        setCodes(res.data);
      } catch (err) {
        toast.error("Failed to load purchased codes.");
      }
    };
    if (userId) fetchCodes();
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6">
      <div className="max-w-4xl mx-auto bg-white/10 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">My Purchased Codes</h1>
        {codes.length === 0 ? (
          <p className="text-gray-300">You haven't purchased any codes yet.</p>
        ) : (
          <ul className="space-y-2 text-gray-300">
            {codes.map((code) => (
              <li key={code._id}>• {code.league}: {code.code} ({code.status})</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyPurchasedCodes;