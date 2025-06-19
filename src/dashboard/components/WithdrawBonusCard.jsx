// 📄 WithdrawBonusCard.jsx — Dark Branded Bonus Wallet
import React from "react";
import { useNavigate } from "react-router-dom";

const WithdrawBonusCard = ({ user }) => {
  const navigate = useNavigate();
  const bonusWallet = user?.bonusWallet || 0;

  return (
    <div className="bg-[#11152F] p-4 rounded-2xl shadow-md text-white flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-medium text-yellow-400 mb-2">🎁 Bonus Wallet</h3>
        <p className="text-xs text-gray-300 mb-1">Withdrawable Rewards</p>
        <div className="text-2xl font-bold text-white">
          ₦{bonusWallet.toLocaleString()}
        </div>
      </div>

      <button
        onClick={() => navigate("/withdraw")}
        className="mt-4 bg-yellow-500 text-black text-sm font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
      >
        Withdraw Bonus
      </button>
    </div>
  );
};

export default WithdrawBonusCard;
