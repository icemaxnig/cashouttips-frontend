// 🤝 Referral.jsx - Show user's referral code and bonus
import React, { useEffect, useState } from "react";
import axios from "axios";

const Referral = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [code, setCode] = useState("");
  const [bonus, setBonus] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferral();
  }, []);

  const fetchReferral = async () => {
    try {
      const res = await axios.get(`/api/user/referral/${user._id}`);
      setCode(res.data.code);
      setBonus(res.data.bonus);
    } catch (err) {
      console.error("Failed to fetch referral info.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/register?ref=${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Referral Program</h2>
      <div className="bg-white/10 rounded-xl p-4 shadow">
        <p className="text-gray-300 text-sm">Your Referral Code:</p>
        <p className="text-xl font-bold text-green-400 mb-2">{code}</p>

        <button
          onClick={handleCopy}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
        >
          {copied ? "Copied!" : "Copy Referral Link"}
        </button>

        <p className="text-sm text-gray-300 mt-6">Bonus Earned:</p>
        <p className="text-xl font-bold text-blue-400">₦{bonus.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Referral;
