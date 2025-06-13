// 👑 Bigboys.jsx - Premium tools hub
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Search, SlidersHorizontal } from "lucide-react";
import axios from "axios";

const Bigboys = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [hasPaidEnough, setHasPaidEnough] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const res = await axios.get(`/api/user/access-check/${user._id}`);
      setHasPaidEnough(res.data.totalDeposits >= 10000);
      setSubscriptions(res.data.subscriptions); // e.g. ["scanner", "arbitrage"]
    } catch (err) {
      setMessage("Access denied. Unable to verify.");
    }
  };

  const canAccess = (tool) => subscriptions.includes(tool);

  if (!hasPaidEnough) {
    return (
      <div className="min-h-screen bg-[#0A0E2C] text-white flex items-center justify-center p-4">
        <div className="bg-white/10 p-8 rounded-xl text-center max-w-md">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Big Boys Only 👑</h2>
          <p className="text-gray-300 mb-4 text-sm">
            You must have deposited at least ₦10,000 to unlock premium tools like Scanner, Arbitrage & Combo Builder.
          </p>
          <button
            onClick={() => navigate("/deposit")}
            className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-300"
          >
            Fund Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Big Boys Only 🔐</h2>
        {message && <p className="text-sm text-red-400 text-center mb-4">{message}</p>}

        <div className="grid gap-6">
          <ToolCard
            icon={<Search className="text-yellow-400" />}
            title="Value Scanner"
            desc="Find high-value betting opportunities"
            link="/bigboys/scanner"
            locked={!canAccess("scanner")}
          />
          <ToolCard
            icon={<ShieldCheck className="text-yellow-400" />}
            title="Arbitrage (VVIP)"
            desc="Risk-free profits across bookies"
            link="/bigboys/arbitrage"
            locked={!canAccess("arbitrage")}
          />
          <ToolCard
            icon={<SlidersHorizontal className="text-yellow-400" />}
            title="Combo Builder"
            desc="Create combo codes (2, 5, 40, 100 odds)"
            link="/bigboys/combo"
            locked={!canAccess("combo")}
          />
        </div>
      </div>
    </div>
  );
};

function ToolCard({ icon, title, desc, link, locked }) {
  return (
    <div
      onClick={() => !locked && window.location.assign(link)}
      className={`p-6 rounded-xl shadow-lg bg-white/10 transition cursor-pointer ${
        locked ? "opacity-40 cursor-not-allowed" : "hover:shadow-xl"
      }`}
    >
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <h3 className="text-lg font-bold text-yellow-400">{title}</h3>
          <p className="text-sm text-gray-300">{desc}</p>
        </div>
      </div>
      {locked && <p className="text-xs text-red-400 mt-2">Subscription required</p>}
    </div>
  );
}

export default Bigboys;
