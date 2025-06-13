import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const History = () => {
  const [plans, setPlans] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/subscription/history/${userId}`);
        setPlans(res.data);
      } catch (err) {
        toast.error("Failed to load subscription history.");
      }
    };
    if (userId) fetchHistory();
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6">
      <div className="max-w-4xl mx-auto bg-white/10 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Subscription History</h1>
        {plans.length === 0 ? (
          <p className="text-gray-300">No history found.</p>
        ) : (
          <ul className="space-y-2 text-gray-300">
            {plans.map((plan, index) => (
              <li key={index}>
                {plan.planType} for {plan.days} days — {plan.startDate} to {plan.endDate}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;