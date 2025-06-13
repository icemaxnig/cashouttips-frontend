
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

const MyCodes = () => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const fetchMyCodes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/booking/purchased", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCodes(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your codes");
      }
    };
    fetchMyCodes();
  }, []);

  if (codes.length === 0) {
    return <p className="text-center text-gray-500 mt-6">You haven’t purchased any codes yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 grid gap-4">
      {codes.map((tip) => (
        <div key={tip._id} className="border rounded-lg p-4 bg-white shadow">
          <h3 className="font-semibold mb-1">{tip.bookmaker || "Booking Tip"}</h3>
          <p className="font-mono text-xl mb-2">Code: {tip.code}</p>
          <p className="text-sm text-gray-600">
            Odds: {tip.odds} — Purchased on {new Date(tip.purchasedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyCodes;
