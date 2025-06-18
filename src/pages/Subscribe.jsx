// Subscribe.jsx — Branded and Functional
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import WalletBadge from "../components/WalletBadge";
import { toast } from "react-toastify";

const Subscribe = () => {
  const [plans, setPlans] = useState([]);
  const [wallets, setWallets] = useState({ mainWallet: 0, bonusWallet: 0 });
  const [stake, setStake] = useState(1000);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/rollover/plans/all")
      .then((res) => setPlans(res.data))
      .catch((err) => toast.error("Error loading plans"));

    axios
      .get("/wallets/balance") // Updated to match correct mounting path
      .then((res) => setWallets(res.data))
      .catch((err) => toast.error("Error loading wallet"));
  }, []);

  const calculateReturns = (odds, duration, stake) => {
    let result = stake;
    for (let i = 0; i < duration; i++) {
      result = (result - stake) + (result * odds);
    }
    return Math.floor(result);
  };

  const handleSubscribe = async (planId, price) => {
    if (wallets.mainWallet < price) {
      return toast.error("Insufficient main wallet balance");
    }

    try {
      const res = await axios.post("/rollover/subscribe", {
        planId,
        walletType: "main",
      });
      toast.success("Subscribed successfully");
      navigate("/my-rollover");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Subscription failed. Try again."
      );
    }
  };

  return (
    <div className="p-4 md:p-8 text-white bg-[#0A0E2C] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🔥 Subscribe to Rollover Plans</h1>
        <WalletBadge wallets={wallets} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-[#11173A] rounded-2xl p-4 shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-bold mb-2">🎯 {plan.name}</h2>
              <p className="text-sm mb-1">📆 {plan.duration} Days</p>
              <p className="text-sm mb-1">💰 ₦{plan.price.toLocaleString()}</p>
              <p className="text-sm mb-1">🔥 {plan.odds} Odds / Day</p>
              <p className="text-sm mb-3 text-green-400">
                💸 Potential Return: ₦{calculateReturns(plan.odds, plan.duration, stake).toLocaleString()}
              </p>

              <div className="mb-3">
                <label className="text-sm">Stake (₦):</label>
                <input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#1B2145] text-white p-2 rounded mt-1"
                />
              </div>
            </div>

            <button
              onClick={() => handleSubscribe(plan._id, plan.price)}
              className="bg-green-600 hover:bg-green-700 mt-2 py-2 rounded text-white font-bold"
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
