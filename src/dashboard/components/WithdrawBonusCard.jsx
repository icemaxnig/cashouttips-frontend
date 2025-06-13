// src/dashboard/components/WithdrawBonusCard.jsx
import React from "react";
import "./Card.scss";

const WithdrawBonusCard = ({ user }) => {
  const bonus = user?.bonusWallet || 0;

  return (
    <div className="card bonus-card">
      <h3>Bonus Wallet</h3>
      <p className="amount">₦{parseFloat(bonus).toFixed(2)}</p>
      <button
        className="cta-button"
        onClick={() => {
          window.location.href = "/withdraw-bonus";
        }}
      >
        Withdraw Bonus
      </button>
    </div>
  );
};

export default WithdrawBonusCard;
