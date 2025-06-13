// src/dashboard/components/ActivePlansCard.jsx
import React from "react";
import "./ActivePlansCard.scss";

const ActivePlansCard = ({ plans = [] }) => {
  const getRemainingDays = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="card active-plans-card">
      <h3>📦 Active Rollover Plans</h3>
      {plans.length === 0 ? (
        <p>No active plans found.</p>
      ) : (
        <ul className="plan-list">
          {plans.map((plan) => {
            const daysLeft = getRemainingDays(plan.expiryDate);
            return (
              <li key={plan._id} className={daysLeft <= 2 ? "expiring" : ""}>
                <div className="plan-name">{plan.title}</div>
                <div className="plan-meta">
                  <span>{daysLeft} day{daysLeft !== 1 ? "s" : ""} left</span>
                  {daysLeft <= 2 && <span className="badge">⏳ Expiring Soon</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ActivePlansCard;
