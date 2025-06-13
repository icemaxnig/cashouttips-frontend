// src/dashboard/components/DualStatCard.jsx
import React from "react";
import "./DualStatCard.scss";

const DualStatCard = ({ tipsToday, codesToday }) => {
  return (
    <div className="dual-stat-card">
      <h4>📊 Today's Overview</h4>
      <div className="stats">
        <div className="stat">
          <span className="label">Rollover Tips</span>
          <span className="value">{tipsToday}</span>
        </div>
        <div className="stat">
          <span className="label">Booking Codes</span>
          <span className="value">{codesToday}</span>
        </div>
      </div>
    </div>
  );
};

export default DualStatCard;
