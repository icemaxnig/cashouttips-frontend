// 💰 Wallet.jsx - View balances, deposit, and bonus withdrawal
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [balances, setBalances] = useState({ main: 0, bonus: 0 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const res = await axios.get(`/api/user/wallet/${user._id}`);
      setBalances(res.data);
    } catch (err) {
      setMessage("Failed to load wallet balances.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    try {
      const res = await axios.post(`/api/user/bonus-withdrawal`, { userId: user._id });
      alert(res.data.message);
      fetchBalances();
    } catch (err) {
      alert("Withdrawal failed. You may not have enough bonus balance.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Wallet</h2>

      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p className="text-red-400">{message}</p>
      ) : (
        <div className="grid gap-6">
          <div className="bg-white/10 p-4 rounded-xl">
            <h3 className="text-lg text-gray-300">Main Wallet</h3>
            <p className="text-2xl font-bold text-green-400">₦{balances.main.toLocaleString()}</p>
            <button
              onClick={() => navigate("/deposit")}
              className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
            >
              Fund Wallet
            </button>
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            <h3 className="text-lg text-gray-300">Bonus Wallet</h3>
            <p className="text-2xl font-bold text-blue-400">₦{balances.bonus.toLocaleString()}</p>
            <button
              onClick={handleWithdrawal}
              className="mt-3 bg-blue-400 text-black px-4 py-2 rounded hover:bg-blue-300"
            >
              Request Bonus Withdrawal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
