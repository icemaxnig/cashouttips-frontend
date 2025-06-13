import React, { useEffect, useState } from "react";

const ReferralLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [range, setRange] = useState("all");

  useEffect(() => {
    fetch(`http://localhost:5000/api/referrals/leaderboard?range=${range}`)
      .then(res => res.json())
      .then(data => setLeaders(data));
  }, [range]);

  return (
    <div className="bg-[#111436] p-6 rounded-xl shadow mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-yellow-400">Top Referrers</h3>
        <select
          className="bg-[#22274A] text-white border border-yellow-400 px-3 py-1 rounded"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <table className="w-full text-sm text-white">
        <thead>
          <tr className="text-yellow-400 text-left">
            <th>#</th>
            <th>Name</th>
            <th>Earnings (₦)</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user, index) => (
            <tr key={user._id} className="border-t border-gray-600">
              <td className="py-1">{index + 1}</td>
              <td>{user.name || "Unnamed"}</td>
              <td>{user.referralEarnings?.toLocaleString() || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralLeaderboard;