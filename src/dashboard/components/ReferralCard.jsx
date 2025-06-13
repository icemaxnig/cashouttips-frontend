// 📄 ReferralCard.jsx — Compact Mode Support
import React from "react";

const ReferralCard = ({ compact = false }) => {
  const referralCode = localStorage.getItem("referralCode") || "CASH-TIPS";

  return (
    <div className={`bg-white border border-[#1F2D5C] rounded-2xl shadow-md ${compact ? 'p-3' : 'p-5'}`}>
      <h3 className={`font-bold text-[#1F2D5C] mb-2 ${compact ? 'text-sm' : 'text-lg'}`}>👥 Referral Program</h3>
      <p className={`text-sm text-gray-700 ${compact ? 'mb-1' : 'mb-3'}`}>
        Invite friends and earn rewards when they subscribe!
      </p>

      <div className={`bg-gray-100 border border-dashed border-gray-400 p-2 rounded-lg font-mono text-center ${compact ? 'text-xs' : 'text-sm'}`}>
        {referralCode}
      </div>

      {!compact && (
        <p className="text-xs text-gray-500 mt-2">
          Share this code with friends. They’ll get ₦500 off, and you’ll earn bonuses.
        </p>
      )}
    </div>
  );
};

export default ReferralCard;
