// 📄 SubscribeRollover.jsx (fixed calculator block JSX syntax)
import React, { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SubscribeRollover = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribingId, setSubscribingId] = useState(null);
  const [wallet, setWallet] = useState({ wallet: 0, bonusWallet: 0 });
  const [myPlans, setMyPlans] = useState([]);
  const [calculatorVisible, setCalculatorVisible] = useState(null);
  const [inputAmounts, setInputAmounts] = useState({});
  const [animatedCounts, setAnimatedCounts] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
    fetchWallet();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCounts(prev => {
        const updated = { ...prev };
        plans.forEach(plan => {
          if (!updated[plan._id]) {
            updated[plan._id] = plan.fakeSubscribers;
          } else {
            const increment = generateRandomIncrement();
            updated[plan._id] += increment;
          }
        });
        return updated;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [plans]);

  const generateRandomIncrement = () => {
    const rand = Math.floor(Math.random() * 10);
    return rand === 0 ? 2 : rand < 3 ? 1 : 0;
  };

  const fetchPlans = async () => {
    try {
      const res = await api.get("/rollover/plans");
      setPlans(res.data);
    } catch {
      toast.error("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const fetchWallet = async () => {
    try {
      const res = await api.get("/auth/me");
      setWallet({
        wallet: res.data.user.mainWallet || 0,
        bonusWallet: res.data.user.bonusWallet || 0,
      });
      setMyPlans(res.data.user.rolloverPlans || []);
    } catch {
      toast.error("Failed to load wallet info");
    }
  };

  const isPlanActive = (planId) => {
    const match = myPlans.find((p) => p.plan === planId);
    if (!match) return false;
    return new Date(match.startDate).getTime() + match.duration * 86400000 > Date.now();
  };

  const handleSubscribe = async (plan) => {
    let selectedWallet = "main";
    if (wallet.wallet < plan.price && wallet.bonusWallet >= plan.price) {
      selectedWallet = "bonus";
      toast("💡 Main wallet low. Using Bonus wallet instead.", { icon: "⚠️" });
    }

    const balance = selectedWallet === "main" ? wallet.wallet : wallet.bonusWallet;
    if (balance < plan.price) {
      return toast(
        (t) => (
          <span>
            Insufficient balance in both wallets. <br />
            <button
              className="bg-yellow-500 text-black px-3 py-1 mt-2 rounded"
              onClick={() => {
                toast.dismiss(t.id);
                navigate(`/deposit?amount=${plan.price}`);
              }}
            >
              Deposit Now
            </button>
          </span>
        ),
        { duration: 6000 }
      );
    }

    setSubscribingId(plan._id);
    try {
      const res = await api.post("/subscribe/rollover", {
        planId: plan._id,
        walletType: selectedWallet,
      });
      toast.success(
        `Subscribed using ${selectedWallet === "main" ? "Main Wallet" : "Bonus Wallet"}`
      );
      setCalculatorVisible(null);
      fetchWallet();
    } catch (err) {
      toast.error(err.response?.data?.message || "Subscription failed");
    } finally {
      setSubscribingId(null);
    }
  };

  const getRiskLevel = (odds) => {
    if (odds <= 1.5) return "Low Risk";
    if (odds <= 2.0) return "Moderate Risk";
    return "High Risk";
  };

  const topSubscribers = Math.max(...plans.map(p => animatedCounts[p._id] || p.fakeSubscribers || 0));

  if (loading) return <div className="p-6 text-white">Loading plans...</div>;

  return (
    <div className="p-6 bg-[#0A0E2C] text-white min-h-screen">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">
        🪙 Subscribe to a Rollover Plan
      </h1>

      <p className="text-sm mb-6 text-yellow-300">
        Main Wallet: ₦{wallet.wallet?.toLocaleString()} | Bonus Wallet: ₦{wallet.bonusWallet?.toLocaleString()}
      </p>

      {plans.length === 0 ? (
        <p className="text-yellow-300">No plans available at the moment.</p>
      ) : (
        <div className="grid gap-6">
          {plans.map((plan) => {
            const active = isPlanActive(plan._id);
            const stake = inputAmounts[plan._id] || 1000;
            const liveSubscribers = animatedCounts[plan._id] || plan.fakeSubscribers;
            const isTopPick = liveSubscribers === topSubscribers;
            const oneDayReturn = stake * plan.odds;
            let compounded = stake;
            for (let i = 0; i < plan.duration; i++) compounded *= plan.odds;
            const riskLevel = getRiskLevel(plan.odds);

            return (
              <div
                key={plan._id}
                className={`bg-[#1a1d3b] p-4 rounded-lg shadow border ${active ? "border-green-500" : "border-blue-800"}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-xl font-semibold text-blue-400">{plan.name}</h2>
                  {isTopPick && (
                    <span className="text-xs bg-orange-400 text-black px-2 py-1 rounded">🔥 Top Pick</span>
                  )}
                </div>
                <p className="text-sm text-yellow-300 mt-1">🎯 {plan.odds} Odds<br />📆 {plan.duration}-Day Cycle<br />₦{plan.price?.toLocaleString()}<br />👥 {liveSubscribers.toLocaleString()} joined</p>
                <p className="text-sm text-gray-400 mb-1">Risk Level: {riskLevel}</p>

                {calculatorVisible === plan._id ? (
                  <div className="mb-3">
                    <label className="block text-sm mb-1">Enter stake:</label>
                    <input
                      type="number"
                      className="text-black p-2 rounded w-full max-w-[200px]"
                      value={stake}
                      onChange={(e) => setInputAmounts({ ...inputAmounts, [plan._id]: Number(e.target.value) })}
                    />
                    <p className="text-sm text-green-400 mt-1">
                      Est. 1-day: ₦{oneDayReturn.toLocaleString()}<br />
                      Est. {plan.duration}-day: ₦{compounded.toLocaleString()} (all days win)
                    </p>
                    <p className="text-xs text-yellow-300 mt-1">
                      💡 You may withdraw your initial ₦{stake} daily to reduce risk exposure.
                      <button
                        className="ml-2 text-xs text-blue-300 underline"
                        onClick={() => setShowExplanation(true)}
                      >
                        What does this mean?
                      </button>
                    </p>
                  </div>
                ) : (
                  <button
                    className="text-sm underline text-yellow-400 mb-2"
                    onClick={() => setCalculatorVisible(plan._id)}
                  >
                    📈 View Profit Calculator
                  </button>
                )}

                {/* Placeholder for future: Show historical results for this plan */}
                <p className="text-xs text-gray-500 italic">📊 Historical results coming soon</p>

                {active ? (
                  <span className="inline-block px-3 py-1 text-sm bg-green-600 text-white rounded">
                    ✅ Active Subscription
                  </span>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan)}
                    className="btn bg-yellow-400 text-black font-semibold px-4 py-2 mt-2 rounded"
                  >
                    {subscribingId === plan._id ? "Processing..." : "Subscribe"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showExplanation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-2">What does daily withdrawal mean?</h2>
            <p className="text-sm mb-4">
              This means your original capital (e.g., ₦1000) is withdrawn daily after each win.
              Only your profits continue to roll over. This reduces your exposure to losing everything
              in case of a failed tip. It’s a strategy to protect your capital while compounding winnings.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowExplanation(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribeRollover;
