// 💼 Arbitrage.jsx - VVIP Tool Page
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Lock } from "lucide-react";

const Arbitrage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [accessGranted, setAccessGranted] = useState(false);
  const [arbs, setArbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const res = await axios.get(`/api/user/access-check/${user._id}`);
      if (res.data.subscriptions.includes("arbitrage")) {
        setAccessGranted(true);
        fetchArbs();
      } else {
        setAccessGranted(false);
        setLoading(false);
      }
    } catch (err) {
      setMessage("Access verification failed.");
      setLoading(false);
    }
  };

  const fetchArbs = async () => {
    try {
      const res = await axios.get("/api/arbitrage/results");
      setArbs(res.data);
    } catch (err) {
      setMessage("Failed to fetch arbitrage data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-white p-10">Loading arbitrage...</div>;

  if (!accessGranted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0E2C] text-white p-6">
        <Lock size={64} className="text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">VVIP Access Only</h2>
        <p className="text-sm mb-4 text-gray-300">Subscribe to the Arbitrage tool to view risk-free betting opportunities.</p>
        <a href="/subscribe" className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300 font-semibold">Subscribe Now</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Arbitrage Opportunities</h2>

      {message && <p className="text-red-400 mb-4">{message}</p>}

      <div className="grid gap-4">
        {arbs.map((arb, idx) => (
          <div key={idx} className="bg-white/10 p-4 rounded shadow hover:shadow-lg">
            <h3 className="text-yellow-400 font-semibold">{arb.match}</h3>
            <p className="text-sm">Market: {arb.market}</p>
            <p className="text-sm">Bookies: {arb.bookie1} ({arb.odds1}) vs {arb.bookie2} ({arb.odds2})</p>
            <p className="text-sm text-green-400 font-bold">Profit Margin: +{arb.margin}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arbitrage;
