// 📄 WalletOverviewCard.jsx — Updated with Deposit Modal and Live Balance Update
import React, { useState } from "react";
import { motion } from "framer-motion";
import DepositModal from "./DepositModal";

const WalletOverviewCard = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [mainWallet, setMainWallet] = useState(user?.mainWallet || 0);
  const [bonusWallet] = useState(user?.bonusWallet || 0);

  const handleDepositSuccess = (newBalance) => {
    setMainWallet(newBalance);
    setShowModal(false);
  };

  return (
    <motion.div
      className="bg-[#11152F] text-white p-4 rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold">💼 Wallet Balance</h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold py-1 px-3 rounded-md transition"
        >
          + Deposit
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Main Wallet:</span>
          <span className="font-bold text-white">₦{mainWallet.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Bonus Wallet:</span>
          <span className="font-bold text-white">₦{bonusWallet.toLocaleString()}</span>
        </div>
      </div>

      {showModal && (
        <DepositModal
          userId={user?._id}
          onClose={() => setShowModal(false)}
          onSuccess={handleDepositSuccess}
        />
      )}
    </motion.div>
  );
};

export default WalletOverviewCard;
