// src/pages/RolloverPlans.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./RolloverPlans.scss";

const RolloverPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("/rollover/plans");
        console.log("📦 Full plans:", res.data);
        setPlans(res.data);
      } catch (err) {
        console.error("❌ Error loading all rollover plans:", err.message);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="rollover-plans-page">
      <h2>📜 Available Rollover Plans</h2>
      <div className="plans-list">
        {plans.length === 0 ? (
          <p>No plans available</p>
        ) : (
          plans.map((plan) => (
            <div key={plan._id} className="plan-card">
              <h4>{plan.name}</h4>
              <p><strong>Odds:</strong> {plan.odds}</p>
              <p><strong>Price:</strong> ₦{plan.price}</p>
              <p><strong>Duration:</strong> {plan.duration} days</p>
              <p><strong>Daily Posts:</strong> {plan.postLimit}</p>
              <button className="subscribe-btn">Subscribe</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RolloverPlans;
