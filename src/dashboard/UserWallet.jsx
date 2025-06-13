import React, { useState } from "react";
import api from "../../utils/api"; // <- or wherever your Axios setup is
import toast from "react-hot-toast";

const UserWallet = () => {
  const [amount, setAmount] = useState("");

  const handleFund = async () => {
    try {
      const res = await api.post("/wallet/fund", { amount: parseFloat(amount) });
      toast.success("Wallet funded successfully");

      // ✅ Sync wallet everywhere
      window.dispatchEvent(new Event("wallet-updated"));
    } catch (err) {
      toast.error("Failed to fund wallet");
    }
  };

  return (
    <div className="wallet-box">
      <h3>💰 Fund Wallet</h3>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleFund}>Fund Now</button>
    </div>
  );
};

export default UserWallet;
