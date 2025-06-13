// 🎯 ComboBuilder.jsx - Build combo odds (2, 5, 40, 100)
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Lock } from "lucide-react";

const ComboBuilder = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [accessGranted, setAccessGranted] = useState(false);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const res = await axios.get(`/api/user/access-check/${user._id}`);
      if (res.data.subscriptions.includes("combo")) {
        setAccessGranted(true);
        fetchCombos();
      } else {
        setAccessGranted(false);
        setLoading(false);
      }
    } catch (err) {
      setMessage("Access verification failed.");
      setLoading(false);
    }
  };

  const fetchCombos = async () => {
    try {
      const res = await axios.get("/api/combo-builder/results");
      setCombos(res.data);
    } catch (err) {
      setMessage("Failed to fetch combos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-white p-10">Loading combo builder...</div>;

  if (!accessGranted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0E2C] text-white p-6">
        <Lock size={64} className="text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Combo Builder Locked</h2>
        <p className="text-sm mb-4 text-gray-300">Subscribe to use this combo generation tool.</p>
        <a href="/subscribe" className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300 font-semibold">Subscribe Now</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Combo Builder</h2>

      {message && <p className="text-red-400 mb-4">{message}</p>}

      <div className="grid gap-4">
        {combos.map((combo, idx) => (
          <div key={idx} className="bg-white/10 p-4 rounded shadow">
            <h3 className="text-yellow-400 font-semibold">{combo.title} Odds</h3>
            <p className="text-sm text-gray-300">{combo.description}</p>
            <p className="text-sm mt-1">Code: <span className="font-mono text-green-400">{combo.code}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComboBuilder;
