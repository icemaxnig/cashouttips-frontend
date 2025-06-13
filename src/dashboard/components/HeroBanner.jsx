import React, { useState } from "react";
import { Wallet, Gift } from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import RolloverPlans from "./RolloverPlans";

const HeroBanner = ({ user }) => {
  const { wallet = 0, bonus = 0, loading } = useWallet();
  const [showPlans, setShowPlans] = useState(false);

  return (
    <section className="bg-white/10 p-6 rounded-xl shadow text-white border border-yellow-400 space-y-4">
      <h2 className="text-2xl font-bold text-yellow-300">
        👋 Welcome back, {user?.name || "User"}!
      </h2>

      {loading ? (
        <p className="text-sm text-white/70">Loading balances...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0A0E2C] border border-yellow-300 p-4 rounded-xl space-y-1">
            <Wallet className="text-yellow-300" />
            <p className="text-sm">Wallet Balance</p>
            <p className="text-lg font-bold text-yellow-300">
              ₦{wallet.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#0A0E2C] border border-indigo-300 p-4 rounded-xl space-y-1">
            <Gift className="text-indigo-300" />
            <p className="text-sm">Bonus Balance</p>
            <p className="text-lg font-bold text-indigo-300">
              ₦{bonus.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowPlans(!showPlans)}
        className="bg-yellow-400 text-[#0A0E2C] px-4 py-2 rounded font-bold hover:bg-yellow-300 transition"
      >
        🚀 Subscribe to a Rollover Plan
      </button>

      {showPlans && (
        <div className="pt-4">
          <RolloverPlans />
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
