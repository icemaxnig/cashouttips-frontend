import React from "react";

const WalletSummary = ({ user }) => (
  <div className="bg-[#1B1E38] p-4 rounded-xl shadow border border-yellow-400">
    <h2 className="text-xl font-semibold mb-2">💼 Wallet</h2>
    <p className="text-sm mb-1">Main: <span className="font-bold">₦{user.mainWallet?.toLocaleString() || 0}</span></p>
    <p className="text-sm">Bonus: <span className="font-bold">₦{user.bonusWallet?.toLocaleString() || 0}</span></p>
  </div>
);

export default WalletSummary;
