// src/dashboard/components/StatCard.jsx
import React from "react";
import "./StatCard.scss";

const StatCard = ({ title, value, description, className = "" }) => {
  return (
    <div className={`stat-card ${className}`}>
      <h4>{title}</h4>
      <p className="value">{value}</p>
      {description && <p className="desc">{description}</p>}
    </div>
  );
};

export default StatCard;
