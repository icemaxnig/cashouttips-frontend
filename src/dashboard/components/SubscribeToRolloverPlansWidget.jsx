import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import SubscribeModal from "../../components/SubscribeModal";

const SubscribeToRolloverPlansWidget = () => {
  const [allPlans, setAllPlans] = useState([]);
  const [visiblePlans, setVisiblePlans] = useState([]);
  const [myPlanIds, setMyPlanIds] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [wallet, setWallet] = useState({ bonusWallet: 0, mainWallet: 0 });

  const navigate = useNavigate();

  const fetchSubscriptions = async () => {
    try {
      const res = await api.get("/rollover/my-subscriptions");
      const ids = res.data.filter(p => p.isActive).map(p => p.planId);
      setMyPlanIds(ids);
    } catch (err) {
      console.error("Failed to load subscriptions");
    }
  };

  useEffect(() => {
    api.get("/rollover/plans")
      .then(res => {
        const plans = res.data
          .filter(p => p.price > 0 && p.duration > 0)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setAllPlans(plans);
        setVisiblePlans(plans.slice(0, 3));
      })
      .catch(() => console.error("❌ Failed to load rollover plans"));

    fetchSubscriptions();

    api.get("/user/profile") // Assuming this returns wallet balances
      .then(res => setWallet(res.data.wallet))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (allPlans.length <= 3) return;
      const nextIndex = (index + 3) % allPlans.length;
      setVisiblePlans(allPlans.slice(nextIndex, nextIndex + 3));
      setIndex(nextIndex);
    }, 3600000); // Rotate every hour
    return () => clearInterval(interval);
  }, [index, allPlans]);

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="bg-[#1C1F3C] rounded-xl p-4 border border-gray-700 relative flex flex-col justify-between h-full">
      <h3 className="text-white font-bold text-lg mb-4">Available Rollover Plans</h3>
      {visiblePlans.map((plan) => (
        <div key={plan._id} className="mb-4 p-4 bg-[#2A2D4E] rounded">
          <p className="text-white">{plan.odds} Odds / {plan.duration} Days</p>
          <p className="text-gray-300">₦{plan.price.toLocaleString()}</p>
          {myPlanIds.includes(plan._id) ? (
            <button className="mt-2 px-4 py-1 bg-gray-500 text-white rounded" disabled>Subscribed</button>
          ) : (
            <button
              className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={() => handleSubscribeClick(plan)}
            >
              Subscribe
            </button>
          )}
        </div>
      ))}

      {selectedPlan && (
        <SubscribeModal
          plan={selectedPlan}
          wallet={wallet}
          onClose={() => setSelectedPlan(null)}
          onSubscribed={fetchSubscriptions}
        />
      )}
    </div>
  );
};

export default SubscribeToRolloverPlansWidget;
