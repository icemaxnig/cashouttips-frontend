import React, { useEffect, useState } from "react";
import axios from "axios";
import WalletBadge from "../components/WalletBadge";

const formatCurrency = (amount) => {
  return `₦${parseFloat(amount).toLocaleString()}`;
};

const Subscribe = () => {
  const [plans, setPlans] = useState([]);
  const [mySubs, setMySubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const rawToken = localStorage.getItem("token");
  const userToken = rawToken?.replace(/^"|"$/g, "");

  useEffect(() => {
    if (!userToken) return;
    fetchPlans();
    fetchSubscriptions();
  }, [userToken]);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("/api/rollover/plans", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const planList = res.data?.plans || res.data; // support { plans: [...] } or [...]
      setPlans(Array.isArray(planList) ? planList : []);
    } catch (err) {
      console.error("Failed to fetch plans", err);
      setPlans([]);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get("/api/rollover/my-subscriptions", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const activePlanIds = res.data.map((sub) => sub.planId);
      setMySubs(activePlanIds);
    } catch (err) {
      console.error("Failed to fetch subscriptions:", err);
      setMySubs([]);
    }
  };

  const handleSubscribe = async (planId) => {
    if (!userToken) {
      alert("Please log in to subscribe.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `/api/rollover/subscribe`,
        { planId, walletType: "main" },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      await fetchSubscriptions();
    } catch (err) {
      console.error("Subscription failed", err);
      alert("Subscription failed. Check balance or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#1F2D5C]">🔥 Rollover Plans</h1>
        <WalletBadge />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(plans) && plans.length > 0 ? (
          plans.map((plan) => {
            const isSubscribed = mySubs.includes(plan._id);
            return (
              <div
                key={plan._id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#1F2D5C]">{plan.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    🎯 Odds: {plan.odds} <br />
                    📆 Duration: {plan.duration} days <br />
                    💰 Price: {formatCurrency(plan.price)}
                  </p>
                </div>

                {isSubscribed ? (
                  <button
                    disabled
                    className="mt-4 bg-gray-300 text-white font-semibold py-2 px-4 rounded-full cursor-not-allowed"
                  >
                    ✅ Subscribed
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan._id)}
                    className="mt-4 bg-[#1F2D5C] hover:opacity-90 text-white font-bold py-2 px-4 rounded-full"
                    disabled={loading}
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">No plans available</p>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
