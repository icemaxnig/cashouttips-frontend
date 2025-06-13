
// 📁 pages/ManageRolloverPlans.jsx

import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const ManageRolloverPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/rollover/plans")
      .then(res => setPlans(res.data))
      .catch(() => toast.error("Failed to load rollover plans"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const savePlan = async (plan) => {
    try {
      await api.patch(`/admin/rollover-plan/${plan._id}`, plan);
      toast.success("✅ Plan updated");
    } catch (err) {
      toast.error("❌ Update failed");
    }
  };

  const deletePlan = async (planId) => {
    try {
      await api.delete(`/admin/rollover-plan/${planId}`);
      toast.success("🗑️ Plan deleted");
      setPlans(plans.filter(p => p._id !== planId));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="p-6 text-white">Loading plans...</div>;

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">🛠 Manage Rollover Plans</h2>

      <div className="space-y-4">
        {plans.map((plan, i) => (
          <div key={plan._id} className="bg-[#1A1D35] p-4 rounded-lg border border-gray-700">
            <div className="grid md:grid-cols-5 gap-3 items-center">
              <input
                className="input bg-[#0A0E2C] border border-gray-500 text-white"
                value={plan.name || ""}
                onChange={(e) => handleChange(i, "name", e.target.value)}
                placeholder="Name"
              />
              <input
                className="input bg-[#0A0E2C] border border-gray-500 text-white"
                value={plan.odds || ""}
                onChange={(e) => handleChange(i, "odds", e.target.value)}
                placeholder="Odds"
              />
              <input
                className="input bg-[#0A0E2C] border border-gray-500 text-white"
                value={plan.duration || ""}
                onChange={(e) => handleChange(i, "duration", e.target.value)}
                placeholder="Duration"
              />
              <input
                className="input bg-[#0A0E2C] border border-gray-500 text-white"
                value={plan.price || ""}
                onChange={(e) => handleChange(i, "price", e.target.value)}
                placeholder="Price"
              />
              <input
                className="input bg-[#0A0E2C] border border-gray-500 text-white"
                value={plan.postLimit || ""}
                onChange={(e) => handleChange(i, "postLimit", e.target.value)}
                placeholder="Post Limit"
              />
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => savePlan(plan)} className="bg-yellow-400 text-[#0A0E2C] font-bold px-4 py-1 rounded">
                💾 Save
              </button>
              <button onClick={() => deletePlan(plan._id)} className="bg-red-600 text-white font-bold px-4 py-1 rounded">
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRolloverPlans;
