// ✅ Live wallet balance from context
import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Card.scss";

const WalletOverviewCard = () => {
  const { user } = useAuth();
  const balance = user?.mainWallet || 0;

  return (
    <div className="card deposit-card">
      <h3>Deposit</h3>
      <p className="amount">₦{parseFloat(balance).toFixed(2)}</p>
      <button
        className="cta-button"
        onClick={() => {
          window.location.href = "/deposit";
        }}
      >
        Deposit Now
      </button>
    </div>
  );
};

export default WalletOverviewCard;
