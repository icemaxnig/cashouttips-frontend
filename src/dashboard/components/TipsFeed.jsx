import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const TipsFeed = ({ subscribedPlans }) => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const allTips = await Promise.all(
          subscribedPlans.map((plan) =>
            axios.get(`/rollover/tips/${plan._id}`).then((res) => ({
              ...res.data[0], // latest tip
              planName: plan.name,
              odds: plan.odds,
              days: plan.days,
            }))
          )
        );
        setTips(allTips.filter(Boolean)); // remove nulls
      } catch (err) {
        console.error("Error loading tips", err);
      }
    };
    fetchTips();
  }, [subscribedPlans]);

  if (!subscribedPlans.length) return null;

  return (
    <section className="bg-[#0A0E2C] p-4 rounded-xl border border-green-400 text-white mt-4">
      <h2 className="text-lg font-bold text-green-300 mb-4">🎯 Today's Rollover Tips</h2>
      {tips.length === 0 ? (
        <p>No tips posted yet for your plans.</p>
      ) : (
        tips.map((tip, idx) => (
          <div key={idx} className="bg-white/5 p-4 rounded-lg mb-3 border border-white/10">
            <p className="text-yellow-300 font-semibold">{tip.planName} - {tip.odds} Odds ({tip.days} Days)</p>
            <p><strong>Game:</strong> {tip.game}</p>
            <p><strong>Prediction:</strong> {tip.prediction}</p>
            <p><strong>Status:</strong> <span className={`font-bold ${tip.status === 'Win' ? 'text-green-400' : tip.status === 'Loss' ? 'text-red-400' : 'text-gray-400'}`}>{tip.status}</span></p>
          </div>
        ))
      )}
    </section>
  );
};

export default TipsFeed;
