// src/components/WalletBadge.jsx

import React from "react";
import { useAuth } from "../dashboard/context/AuthContext";

const WalletBadge = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex justify-end flex-wrap gap-3 mb-4">
      <div className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow">
        💼 Main: ₦{user.mainWallet?.toLocaleString() || 0}
      </div>
      <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow">
        🎁 Bonus: ₦{user.bonusWallet?.toLocaleString() || 0}
      </div>
    </div>
  );
};

export default WalletBadge;
