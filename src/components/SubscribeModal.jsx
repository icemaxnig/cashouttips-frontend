import React from "react";
import api from "../utils/api.js";
import { toast } from "react-toastify";

const SubscribeModal = ({ plan, wallet, onClose }) => {
  const { odds, days, price } = plan;
  const { bonusWallet, mainWallet } = wallet;

  const fromBonus = Math.min(price, bonusWallet);
  const fromMain = price - fromBonus;

  const handleConfirm = async () => {
    try {
      await api.post("/rollover/subscribe", {
        odds,
        days,
        amount: price,
      });
      toast.success("Subscription successful");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md text-[#0A0E2C]">
        <h3 className="text-xl font-bold mb-4">Confirm Subscription</h3>
        <p className="text-sm mb-2">Plan: <strong>{odds} Odds / {days} Days</strong></p>
        <p className="text-sm mb-2">Total: <strong>₦{price.toLocaleString()}</strong></p>
        <p className="text-sm mb-2">From Bonus Wallet: <strong>₦{fromBonus.toLocaleString()}</strong></p>
        <p className="text-sm mb-4">From Main Wallet: <strong>₦{fromMain.toLocaleString()}</strong></p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-300">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
