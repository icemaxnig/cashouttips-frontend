import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

const SubscribePlanDetail = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState({ mainWallet: 0, bonusWallet: 0 });
  const [stake, setStake] = useState(1000);
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/rollover/plans/${id}`)
      .then((res) => setPlan(res.data))
      .catch(() => {
        toast.error("Plan not found");
        navigate("/subscribe");
      })
      .finally(() => setLoading(false));

    api.get("/auth/me")
      .then((res) => {
        setWallet({
          mainWallet: res.data.user.mainWallet || 0,
          bonusWallet: res.data.user.bonusWallet || 0,
        });
      })
      .catch(() => toast.error("Failed to load wallet"));
  }, [id]);

  const calculateSubscribers = (createdAt) => {
    const created = new Date(createdAt);
    const minutes = Math.floor((new Date() - created) / 60000);
    return Math.floor(100 + minutes * 1.5);
  };

  const handleSubscribe = async () => {
    const walletType = wallet.mainWallet >= plan.price
      ? "main"
      : wallet.bonusWallet >= plan.price
      ? "bonus"
      : null;

    if (!walletType) {
      return toast((t) => (
        <span>
          Insufficient balance.<br />
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
      ));
    }

    console.log("🔁 Sending subscription request", {
      planId: plan?._id,
      walletType,
    });

    try {
      await api.post("/subscribe/rollover", { planId: plan._id, walletType });
      toast.success(`Subscribed using ${walletType === "main" ? "Main Wallet" : "Bonus Wallet"}`);

      const userRes = await api.get("/auth/me");
      const userId = userRes?.data?.user?._id || null;

      if (userId) {
        await api.post("/transactions/log", {
          type: "rollover_subscription",
          planId: plan._id,
          amount: plan.price,
          walletType,
        });

        await api.post("/referrals/track", {
          planId: plan._id,
          userId,
          amount: plan.price,
          source: "rollover_plan_subscription",
        });

        await api.post("/referrals/commission", {
          userId,
          planId: plan._id,
          amount: plan.price,
          source: "rollover_plan_subscription",
        });
      }

      navigate(`/subscribe/success?plan=${encodeURIComponent(plan.name)}`);
    } catch (err) {
      console.log("❌ Subscription error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Subscription failed");
    }
  };

  if (loading || !plan) return <p className="text-white p-6">Loading plan details...</p>;

  const oneDayReturn = stake * plan.odds;
  let compounded = stake;
  for (let i = 0; i < plan.duration; i++) compounded *= plan.odds;
  const riskLevel = plan.odds <= 1.5 ? "Low Risk" : plan.odds <= 2.0 ? "Moderate Risk" : "High Risk";
  const subscribers = calculateSubscribers(plan.createdAt);

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 py-6 bg-[#1C1F3C] text-white rounded shadow border border-gray-700">
      <h2 className="text-xl font-bold text-yellow-400 mb-2">{plan.name}</h2>
      <p className="text-sm text-gray-300 mb-4">
        {plan.description || "Unlock powerful betting plans with high ROI odds."}
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <span className="bg-indigo-500 text-white px-3 py-1 text-xs rounded-full">🎯 {plan.odds} Odds</span>
        <span className="bg-green-500 text-white px-3 py-1 text-xs rounded-full">📆 {plan.duration}-Day Cycle</span>
        <span className="bg-yellow-300 text-black px-3 py-1 text-xs rounded-full">₦{plan.price?.toLocaleString()}</span>
        <span className="bg-blue-600 text-white px-3 py-1 text-xs rounded-full">👥 {subscribers.toLocaleString()} joined</span>
      </div>

      <p className="text-sm text-gray-300 mb-2">
        💼 Main Wallet: ₦{wallet.mainWallet?.toLocaleString()} | Bonus Wallet: ₦{wallet.bonusWallet?.toLocaleString()}
        <button onClick={() => navigate('/wallet/history')} className="ml-2 text-blue-300 underline text-xs">
          View Wallet History
        </button>
      </p>
      <p className="text-sm text-gray-400 mb-2">📊 Risk Level: {riskLevel}</p>

      <div className="mb-4">
        <label className="block text-sm mb-1">Enter stake:</label>
        <input
          type="number"
          className="text-black p-2 rounded w-full max-w-[200px]"
          value={stake}
          onChange={(e) => setStake(Number(e.target.value))}
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

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {plan.alreadySubscribed ? (
          <>
            <p className="text-yellow-400 font-semibold">✅ Already subscribed to this plan.</p>
            <button
              onClick={() => navigate("/my-rollover")}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-500 transition"
            >
              View My Tips
            </button>
          </>
        ) : (
          <button
            onClick={handleSubscribe}
            className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-300 transition"
          >
            Subscribe Now
          </button>
        )}
        <button
          onClick={() => navigate("/subscribe")}
          className="bg-gray-800 border border-gray-500 text-white font-semibold py-2 px-6 rounded hover:bg-gray-700 transition"
        >
          View More Plans
        </button>
      </div>

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

export default SubscribePlanDetail;
