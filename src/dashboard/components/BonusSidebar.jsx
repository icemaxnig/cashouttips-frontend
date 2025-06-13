import React from "react";
import { useReferrals } from "../hooks/useReferrals";

const BonusSidebar = () => {
  const { bonus, refCode, loading } = useReferrals();

  const referralLink = `${window.location.origin}/register?ref=${refCode}`;

  if (loading) return <p className="text-white">Loading referral info...</p>;

  return (
    <section className="bg-white/10 p-4 rounded-xl shadow text-white space-y-4 border border-yellow-400">
      <h3 className="text-lg font-bold text-yellow-400">🎁 Referral Bonus</h3>
      <p>You’ve earned:</p>
      <p className="text-2xl font-extrabold text-yellow-300">₦{bonus.toLocaleString()}</p>
      <div>
        <p className="text-sm text-white/80">Your Referral Link:</p>
        <input
          type="text"
          value={referralLink}
          readOnly
          onClick={(e) => e.target.select()}
          className="w-full bg-[#0A0E2C] text-yellow-300 border border-yellow-400 rounded p-2 text-sm mt-1"
        />
      </div>
    </section>
  );
};

export default BonusSidebar;
