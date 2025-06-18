// src/pages/SubscribePlanDetail.jsx — Updated to use standardized rollover tip format
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const SubscribePlanDetail = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [stake, setStake] = useState(1000);
  const [wallet, setWallet] = useState({ wallet: 0, bonusWallet: 0 });
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planRes = await api.get(`/rollover/plans/${id}`);
        setPlan(planRes.data);

        const walletRes = await api.get("/wallets/balance");
        setWallet(walletRes.data);

        const tipsRes = await api.get("/rollover/today");
        const filtered = tipsRes.data.filter(t => t.plan === id);
        setTips(filtered);
      } catch (error) {
        console.error("❌ Failed to load plan or tips:", error);
        toast.error("Error loading plan.");
      }
    };

    fetchData();
  }, [id]);

  const handleSubscribe = async () => {
    if (!plan) return;
    
    setLoading(true);
    try {
      const walletType = wallet.bonusWallet >= plan.price ? "bonus" : "main";
      
      await api.post("/rollover/subscribe", {
        planId: plan._id,
        walletType,
        stake: parseFloat(stake)
      });
      
      toast.success("✅ Successfully subscribed to plan!");
      navigate("/my-rollover");
    } catch (error) {
      console.error("❌ Subscription failed:", error);
      toast.error(error.response?.data?.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  const expectedReturn = (stake * plan?.totalOdds || 0).toFixed(2);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">🎯 {plan?.name}</h2>
      <p className="text-sm mb-4">Duration: {plan?.duration} days • Odds: {plan?.totalOdds}</p>

      <div className="mb-4">
        <label className="block mb-1 text-sm">💰 Enter Stake:</label>
        <input
          type="number"
          className="bg-[#11152F] px-4 py-2 rounded-md w-full"
          value={stake}
          onChange={(e) => setStake(Number(e.target.value))}
        />
        <p className="text-xs text-green-400 mt-1">Expected Return: ₦{expectedReturn}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">📋 Tip for Today</h3>
        {tips.length === 0 ? (
          <p className="text-gray-400 text-sm">No tip available yet.</p>
        ) : (
          tips.map((tip) => (
            <div key={tip._id} className="bg-[#11152F] p-3 rounded-lg mb-2">
              {tip.games.map((g, i) => (
                <div key={i} className="mb-1 text-sm">
                  ⚽ <strong>{g.teamA}</strong> vs <strong>{g.teamB}</strong> — {g.league}
                  <br />
                  🕒 {g.kickoff} | 🧠 {g.prediction} | 🔢 Odds: {g.odds}
                </div>
              ))}
              <p className="text-xs text-right text-gray-400 mt-2">⏳ Expires: {new Date(tip.expiresAt).toLocaleTimeString()}</p>
            </div>
          ))
        )}
      </div>

      {/* Wallet Balance Display */}
      <div className="mb-6 p-3 bg-[#11152F] rounded-lg">
        <h3 className="text-md font-semibold mb-2">💼 Wallet Balance</h3>
        <div className="text-sm space-y-1">
          <p>Main Wallet: ₦{wallet.wallet?.toLocaleString() || 0}</p>
          <p>Bonus Wallet: ₦{wallet.bonusWallet?.toLocaleString() || 0}</p>
          <p className="text-yellow-400 font-semibold">Plan Price: ₦{plan?.price?.toLocaleString() || 0}</p>
        </div>
      </div>

      {/* Subscribe Button */}
      <button
        onClick={handleSubscribe}
        disabled={loading || !plan}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
          loading 
            ? "bg-gray-600 cursor-not-allowed" 
            : "bg-yellow-500 hover:bg-yellow-400 text-black"
        }`}
      >
        {loading ? "🔄 Processing..." : "🔐 Subscribe to Plan"}
      </button>

      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/rollover")}
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back to All Plans
        </button>
      </div>
    </div>
  );
};

export default SubscribePlanDetail;