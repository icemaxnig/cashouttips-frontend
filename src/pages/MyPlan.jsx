import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

const MyPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await api.get("/user/status");
        setPlan(res.data);
      } catch {
        setPlan(null);
      }
      setLoading(false);
    };

    fetchPlan();
  }, []);

  if (loading) return <div className="p-4">Loading plan...</div>;

  if (!plan?.isSubscribed) {
    return <div className="p-6 text-center text-gray-600">❌ You don’t have an active rollover plan.</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="rounded-xl shadow-lg border p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-2 text-blue-700">Your Active Plan</h2>
        <p className="mb-1">📦 Odds Plan: <strong>{plan.oddsPlan}</strong></p>
        <p className="mb-1">📅 Start Date: {new Date(plan.subscriptionStart).toLocaleDateString()}</p>
        <p className="mb-1">⏳ Expiry Date: {new Date(plan.subscriptionExpires).toLocaleDateString()}</p>
        <p className="text-green-600 mt-2 font-medium">Status: Active</p>
      </div>
    </div>
  );
};

export default MyPlan;