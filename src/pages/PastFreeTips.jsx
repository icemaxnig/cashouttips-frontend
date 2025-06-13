import React, { useEffect, useState } from "react";
import api from "../utils/api";

const PastFreeTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await api.get("/tips/free/past");
        setTips(res.data);
      } catch {
        setTips([]);
      }
    };
    fetchTips();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Past Free Tips</h2>
      {tips.length === 0 ? (
        <p>No past tips found.</p>
      ) : (
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white border rounded-xl shadow p-4">
              <p><strong>Date:</strong> {new Date(tip.date).toLocaleDateString()}</p>
              <p><strong>Tip:</strong> {tip.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastFreeTips;