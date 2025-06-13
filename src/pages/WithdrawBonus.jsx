// 💸 WithdrawBonus.jsx - For withdrawing from bonus wallet
import React, { useState, useEffect } from "react";
import axios from "axios";

const WithdrawBonus = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [bonusBalance, setBonusBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.bonusWallet) setBonusBalance(user.bonusWallet);
  }, [user]);

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount) || amount < 500) {
      setMessage("Enter valid amount (min ₦500)");
      return;
    }
    if (amount > bonusBalance) {
      setMessage("Amount exceeds your bonus balance");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/bonus/withdraw", {
        userId: user._id,
        amount,
      });
      setMessage(res.data.message || "Withdrawal submitted successfully");
      setBonusBalance(bonusBalance - amount);
      setAmount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting withdrawal request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6 flex justify-center items-center">
      <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">Withdraw Bonus</h2>
        <p className="text-sm text-gray-300 mb-4">Available: ₦{bonusBalance}</p>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-3 rounded bg-[#1C2340] border border-gray-600 text-white mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="bg-yellow-400 w-full py-2 text-black font-bold rounded hover:bg-yellow-300"
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
        {message && <p className="text-sm mt-3 text-center text-red-400">{message}</p>}
      </div>
    </div>
  );
};

export default WithdrawBonus;
