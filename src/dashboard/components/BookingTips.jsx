import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";

const BookingTips = ({ isSubscriber }) => {
  const [tips, setTips] = useState([]);
  const [purchasedCodes, setPurchasedCodes] = useState([]);
  const [wallets, setWallets] = useState({ wallet: 0, bonusWallet: 0 });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipsRes, purchasedRes, walletRes] = await Promise.all([
          axios.get("/booking", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/booking/purchased", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/wallet/balance", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTips(tipsRes.data);
        setPurchasedCodes(purchasedRes.data.map((tip) => tip._id));
        setWallets({
          wallet: walletRes.data.mainWallet || 0,
          bonusWallet: walletRes.data.bonusWallet || 0,
        });
      } catch (err) {
        console.error("Error loading booking tips or wallets:", err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePurchase = async (tipId, price) => {
    try {
      const res = await axios.post(
        `/booking/buy/${tipId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Purchase successful");
      setPurchasedCodes([...purchasedCodes, tipId]);

      // Refresh wallet balances after purchase
      const walletRes = await axios.get("/wallet/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallets({
        wallet: walletRes.data.mainWallet || 0,
        bonusWallet: walletRes.data.bonusWallet || 0,
      });
    } catch (err) {
      console.error("❌ Purchase failed", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Could not purchase tip");
    }
  };

  const hasEnoughFunds = (price) =>
    wallets.wallet >= price || wallets.bonusWallet >= price;

  if (loading) {
    return <div className="text-sm text-gray-400 mt-6">Loading booking tips...</div>;
  }

  if (tips.length === 0) {
    return (
      <div className="bg-[#1F2937] text-gray-400 p-4 rounded-lg mt-4">
        No booking tips available at the moment.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {tips.map((tip) => {
        const alreadyBought = purchasedCodes.includes(tip._id);
        const canBuy = hasEnoughFunds(tip.price);

        return (
          <div key={tip._id} className="bg-[#1F2937] p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-indigo-300 font-bold">
                {tip.category || "Booking Tip"}
              </span>
              <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                {tip.urgencyTag || "🔥 Hot"}
              </span>
            </div>

            <h3 className="text-white text-lg font-bold mb-1">{tip.odds} Odds</h3>
            <p className="text-gray-300 text-sm mb-1">Bookmaker: {tip.bookmaker || "N/A"}</p>
            <p className="text-gray-400 text-xs">Success Rate: {tip.successRate}%</p>
            <p className="text-gray-500 text-xs mb-2">Price: ₦{tip.price?.toLocaleString()}</p>
            <p className="text-gray-500 text-xs mb-2">
              Slots Left: {tip.slotLimit - (tip.purchasedBy?.length || 0)}
            </p>

            <div className="mt-3">
              {isSubscriber || alreadyBought ? (
                <div className="text-green-400 font-mono break-words">{tip.code}</div>
              ) : (
                <button
                  onClick={() => handlePurchase(tip._id, tip.price)}
                  className="bg-yellow-500 text-black px-4 py-2 rounded text-sm hover:bg-yellow-400 disabled:opacity-50"
                  disabled={!canBuy}
                >
                  {canBuy ? "🔓 Unlock Tip" : "❌ Insufficient Balance"}
                </button>
              )}
            </div>

            {tip.adminNote && (
              <p className="text-xs text-gray-500 mt-2 italic">💡 {tip.adminNote}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingTips;
