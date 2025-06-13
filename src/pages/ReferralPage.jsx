import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

const ReferralPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [referralStats, setReferralStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadersRes, statsRes] = await Promise.all([
          api.get("/referral/leaderboard"),
          api.get("/referral/stats")
        ]);
        setLeaderboard(leadersRes.data);
        setReferralStats(statsRes.data);
      } catch (err) {
        console.error("Error loading referral data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-white text-center py-6">Loading leaderboard...</div>;

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🏆 Referral Leaderboard</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/10 text-yellow-300">
              <tr>
                <th className="p-2 text-left">Rank</th>
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Referrals</th>
                <th className="p-2 text-left">Earnings (₦)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, i) => (
                <tr key={user._id} className="border-t border-white/5">
                  <td className="p-2">#{i + 1}</td>
                  <td className="p-2">{user.name || "User"}</td>
                  <td className="p-2">{user.count}</td>
                  <td className="p-2">₦{user.earnings.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {referralStats && (
          <div className="bg-white/10 p-4 rounded-xl mt-8">
            <h3 className="text-yellow-400 font-semibold mb-2 text-lg">🎁 Your Referral Stats</h3>
            <p className="text-sm mb-1">
              <strong>Referral Link:</strong> <span className="text-blue-400">{referralStats.link}</span>
            </p>
            <p className="text-sm mb-1">
              <strong>Total Referred:</strong> {referralStats.count}
            </p>
            <p className="text-sm">
              <strong>Total Earnings:</strong> ₦{referralStats.earnings.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralPage;
