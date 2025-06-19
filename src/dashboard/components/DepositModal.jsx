// 📄 DepositModal.jsx — Add Funds Modal
import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api";
import { toast } from "react-toastify";

const DepositModal = ({ onClose, onDeposit }) => {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    const amt = parseInt(amount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      const res = await api.post("/wallet/deposit", { amount: amt });
      toast.success("Wallet funded successfully!");
      onDeposit(res.data.newBalance || amt);
      onClose();
    } catch (err) {
      console.error("Deposit error:", err);
      toast.error("Failed to deposit");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-[#0A0E2C] text-white p-6 rounded-xl w-96 max-w-[90%] shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <h3 className="text-lg font-bold mb-4 text-yellow-400">💰 Add Funds to Wallet</h3>
        <input
          type="number"
          placeholder="Enter amount (₦)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#1C213D] text-white mb-4 outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-400"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDeposit}
            className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-600"
          >
            Deposit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DepositModal;
