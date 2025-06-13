import React, { useEffect, useState } from "react";
import api from "../api";
import { Trophy, Wallet, Users } from "lucide-react";

const StatsHeader = () => {
  const [stats, setStats] = useState({
    plan: null,
    wallet: { main: 0, bonus: 0 },
    referrals: 0
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res1 = await api.get("/user/plan", { headers: { Authorization: `Bearer ${token}` } });
        const res2 = await api.get("/wallet", { headers: { Authorization: `Bearer ${token}` } });
        const res3 = await api.get("/referrals/count", { headers: { Authorization: `Bearer ${token}` } });

        setStats({
          plan: res1.data,
          wallet: res2.data,
          referrals: res3.data.count
        });
      } catch (err) {
        console.error("Stats load failed:", err);
      }
    };

    if (token) loadStats();
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white/10 p-4 rounded-xl flex items-center space-x-4">
        <Trophy className="text-yellow-400 w-6 h-6" />
        <div>
          <p className="text-sm text-gray-400">Rollover Plan</p>
          <p className="text-white text-lg font-semibold">
            {stats.plan?.odds || "—"} Odds, Day {stats.plan?.day || 0} of {stats.plan?.totalDays || "?"}
          </p>
        </div>
      </div>

      <div className="bg-white/10 p-4 rounded-xl flex items-center space-x-4">
        <Wallet className="text-yellow-400 w-6 h-6" />
        <div>
          <p className="text-sm text-gray-400">Wallet</p>
          <p className="text-white text-lg font-semibold">
            ₦{stats.wallet.main} | Bonus: ₦{stats.wallet.bonus}
          </p>
        </div>
      </div>

      <div className="bg-white/10 p-4 rounded-xl flex items-center space-x-4">
        <Users className="text-yellow-400 w-6 h-6" />
        <div>
          <p className="text-sm text-gray-400">Referrals</p>
          <p className="text-white text-lg font-semibold">{stats.referrals}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;