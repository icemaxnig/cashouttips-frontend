// 📄 ReferralCard.jsx — Dark Themed Version with Compact Support
import React from "react";

const ReferralCard = ({ compact = false }) => {
  const referralCode = localStorage.getItem("referralCode") || "CASH-TIPS";

  return (
    <div className={`bg-[#11152F] rounded-2xl shadow-md ${compact ? 'p-3' : 'p-5'} text-white`}>
      <h3 className={`font-bold text-yellow-400 mb-2 ${compact ? 'text-sm' : 'text-lg'}`}>
        👥 Referral Program
      </h3>

      <p className={`text-sm text-gray-300 ${compact ? 'mb-1' : 'mb-3'}`}>
        Invite friends and earn rewards when they subscribe!
      </p>

      <div className={`bg-[#0A0E2C] border border-dashed border-gray-500 p-2 rounded-lg font-mono text-center text-yellow-300 ${compact ? 'text-xs' : 'text-sm'}`}>
        {referralCode}
      </div>

      {!compact && (
        <p className="text-xs text-gray-400 mt-2">
          Share this code with friends. They’ll get ₦500 off, and you’ll earn bonuses.
        </p>
      )}
    </div>
  );
};

export default ReferralCard;
