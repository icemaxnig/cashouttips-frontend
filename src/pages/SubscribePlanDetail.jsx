// SubscribePlanDetail.jsx — Final fix with token, error fallback, and UI update
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
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [usingBonus, setUsingBonus] = useState(false);
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

        const subRes = await api.get("/rollover/my-subscriptions");
        const subscribed = subRes.data.some(sub => String(sub.planId) === String(id));
        setIsSubscribed(subscribed);
      } catch (error) {
        console.error("❌ Failed to load plan or tips:", error);
        toast.error("Error loading plan.");
      }
    };

    fetchData();
  }, [id]);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      let walletType = "main";
      setUsingBonus(false);
      if (wallet.wallet < plan.price) {
        if (wallet.bonusWallet >= plan.price) {
          walletType = "bonus";
          setUsingBonus(true);
        } else {
          toast.error("Insufficient balance in both wallets.");
          setLoading(false);
          return;
        }
      }

      await api.post("/rollover/subscribe", {
        planId: id,
        walletType,
      });

      toast.success("Successfully subscribed!");
      setIsSubscribed(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to subscribe";
      toast.error(msg);
      if (msg.includes("Already subscribed")) {
        setIsSubscribed(true); // fallback UI fix
      }
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return <div className="text-center p-4">Loading plan...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-2xl font-bold text-[#1F2D5C] mb-2">{plan.name}</h2>
      <p className="text-sm text-gray-600">🎯 Odds: {plan.odds}</p>
      <p className="text-sm text-gray-600">📆 Duration: {plan.duration} days</p>
      <p className="text-sm text-gray-600">₦ Price: {plan.price}</p>

      <button
        disabled={loading || isSubscribed}
        onClick={handleSubscribe}
        className={
          "mt-4 w-full px-4 py-2 rounded-full text-sm font-semibold " +
          (isSubscribed ? "bg-gray-400 text-white" : "bg-yellow-400 hover:bg-yellow-300 text-black")
        }
      >
        {loading ? "Subscribing..." : isSubscribed ? "You're Already Subscribed" : "Subscribe Now"}
      </button>
    </div>
  );
};

export default SubscribePlanDetail;