import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../dashboard/context/authContext";
import OCard from "../components/OCard";
import OCardFilters from "../components/OCardFilters";
import { toast } from "react-toastify";


const BuyCodes = () => {
  const { user } = useAuth();
  const [codes, setCodes] = useState([]);
  const [wallets, setWallets] = useState({ wallet: 0, bonusWallet: 0 });
  const [filters, setFilters] = useState({
    category: "",
    urgency: "",
    bookmaker: "",
    minOdds: 0,
    minConfidence: 0
  });

  const fetchTips = async () => {
    try {
      const res = await api.get("/booking");
      setCodes(res.data);
    } catch (err) {
      toast.error("❌ Failed to fetch booking codes");
    }
  };

  const fetchWallets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/wallet/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWallets(res.data);
      console.log("💰 Wallets:", res.data);
    } catch (err) {
      console.error("❌ Wallet error:", err);
    }
  };

  useEffect(() => {
    fetchTips();
    fetchWallets();
  }, []);

  const filtered = codes.filter(t =>
    (!filters.category || t.category === filters.category) &&
    (!filters.urgency || t.urgency === filters.urgency) &&
    (!filters.bookmaker || t.bookmaker === filters.bookmaker) &&
    (!filters.minOdds || Number(t.totalOdds) >= Number(filters.minOdds)) &&
    (!filters.minConfidence || Number(t.confidence) >= Number(filters.minConfidence))
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎯 Buy Premium Booking Codes</h2>
      <p className="text-sm text-white mb-2">
        Wallet: ₦{wallets.wallet.toLocaleString()} | Bonus: ₦{wallets.bonusWallet.toLocaleString()}
      </p>

      <OCardFilters
        filters={filters}
        setFilters={setFilters}
        allTips={codes}
      />

      <p className="text-sm text-gray-400 mb-2">
        🎯 Showing <strong>{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="text-gray-300 text-sm mt-4">No tips match your filters.</p>
      ) : (
        filtered.map((tip) => (
          <OCard key={tip._id} tip={tip} refresh={fetchTips} />
        ))
      )}
    </div>
  );
};

export default BuyCodes;