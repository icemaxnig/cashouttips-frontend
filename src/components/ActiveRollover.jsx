import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

const ActiveRollover = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/rollover/active")
      .then((res) => setPlan(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-6 text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-6">{error}</div>;
  if (!plan) return null;

  return (
    <div className="bg-white/5 text-white rounded-xl p-6 max-w-md mx-auto mt-6">
      <h3 className="text-lg font-bold text-yellow-400 mb-2">Your Active Rollover</h3>
      <p><strong>Odds:</strong> {plan.odds}</p>
      <p><strong>Total Days:</strong> {plan.totalDays}</p>
      <p><strong>Days Left:</strong> {plan.daysLeft}</p>
      <p><strong>Start Date:</strong> {new Date(plan.startDate).toLocaleDateString()}</p>
      <p className="mt-2 text-sm text-gray-300">Keep following daily posts. Your plan progresses automatically.</p>
    </div>
  );
};

export default ActiveRollover;
