// 📊 ValueScanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Lock } from "lucide-react";

const ValueScanner = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [accessGranted, setAccessGranted] = useState(false);
  const [scannerData, setScannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkScannerAccess();
  }, []);

  const checkScannerAccess = async () => {
    try {
      const res = await axios.get(`/api/user/access-check/${user._id}`);
      if (res.data.subscriptions.includes("scanner")) {
        setAccessGranted(true);
        fetchScannerData();
      } else {
        setAccessGranted(false);
        setLoading(false);
      }
    } catch (err) {
      setMessage("Unable to verify access");
      setLoading(false);
    }
  };

  const fetchScannerData = async () => {
    try {
      const res = await axios.get("/api/value-scanner/results");
      setScannerData(res.data);
    } catch (err) {
      setMessage("Failed to load value tips");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-white p-10">Loading scanner...</div>;

  if (!accessGranted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0E2C] text-white p-6">
        <Lock size={64} className="text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Scanner Locked</h2>
        <p className="text-sm mb-4 text-gray-300">You need an active subscription to use the Value Scanner.</p>
        <a href="/subscribe" className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300 font-semibold">Subscribe Now</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Value Scanner</h2>

      {message && <p className="text-red-400 mb-4">{message}</p>}

      <div className="grid gap-4">
        {scannerData.map((tip, idx) => (
          <div key={idx} className="bg-white/10 p-4 rounded shadow hover:shadow-lg">
            <h3 className="text-yellow-400 font-semibold">{tip.match}</h3>
            <p className="text-sm">Market: {tip.market}</p>
            <p className="text-sm">Odds: {tip.odds}</p>
            <p className="text-sm">Estimated Value: <span className="text-green-400 font-bold">+{tip.value}%</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValueScanner;
