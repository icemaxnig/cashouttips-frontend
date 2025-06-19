// src/pages/RolloverPlans.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import "./RolloverPlans.scss";
import { useNavigate } from "react-router-dom";

const RolloverPlans = () => {
  const [plans, setPlans] = useState([]);
  const [subscribedPlans, setSubscribedPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await api.get("/rollover/plans");
        console.log("📦 Full plans:", res.data);
        setPlans(res.data);
      } catch (err) {
        console.error("❌ Error loading all rollover plans:", err.message);
      }
    };
    fetchAll();
    // Fetch user subscriptions
    api.get("/rollover/my-subscriptions").then(res => {
      setSubscribedPlans(res.data.map(sub => sub.planId));
    }).catch(() => {});
  }, []);

  return (
    <div className="rollover-plans-page">
      <h2>📜 Available Rollover Plans</h2>
      <div className="plans-list">
        {plans.length === 0 ? (
          <p>No plans available</p>
        ) : (
          plans.map((plan) => {
            const isSubscribed = subscribedPlans.includes(plan._id);
            return (
              <div key={plan._id} className="plan-card">
                <h4>{plan.name}</h4>
                <p><strong>Odds:</strong> {plan.odds}</p>
                <p><strong>Price:</strong> ₦{plan.price}</p>
                <p><strong>Duration:</strong> {plan.duration} days</p>
                <p><strong>Daily Posts:</strong> {plan.postLimit}</p>
                <button
                  className={
                    "subscribe-btn " + (isSubscribed ? "bg-gray-400 text-white cursor-not-allowed" : "")
                  }
                  disabled={isSubscribed}
                  onClick={() => !isSubscribed && navigate(`/subscribe/${plan._id}`)}
                >
                  {isSubscribed ? "✅ Subscribed" : "Subscribe"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RolloverPlans;
