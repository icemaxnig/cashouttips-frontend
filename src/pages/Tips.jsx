import React, { useEffect, useState } from "react";
import api from "../utils/api.js";
import TipCard from "../components/TipCard"; // assume this displays unlocked tip
import LockedTipCard from "../components/LockedTipCard";
import BuyTipModal from "../components/BuyTipModal";
import { toast } from "react-toastify";

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTipId, setSelectedTipId] = useState(null);

  const fetchTips = async () => {
    try {
      const res = await api.get("/tips/locked");
      setTips(res.data);
    } catch {
      toast.error("Failed to load tips");
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const handleUnlock = (id) => {
    setSelectedTipId(id);
    setModalOpen(true);
  };

  const confirmUnlock = async () => {
    try {
      await api.post(`/tips/unlock/${selectedTipId}`);
      toast.success("Tip unlocked!");
      setModalOpen(false);
      fetchTips(); // refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || "Unlock failed");
    }
  };

  return (
    <div className="p-6 space-y-4 min-h-screen bg-[#0A0E2C] text-white">
      <h1 className="text-xl font-semibold text-yellow-400">🎯 Today's Tips</h1>
      <div className="flex flex-wrap gap-4">
        {tips.length ? tips.map((tip) =>
          tip.locked ? (
            <LockedTipCard key={tip._id} tip={tip} onUnlock={handleUnlock} />
          ) : (
            <TipCard key={tip._id} tip={tip} />
          )
        ) : (
          <p className="text-gray-400">No tips available.</p>
        )}
      </div>

      <BuyTipModal
        visible={modalOpen}
        onConfirm={confirmUnlock}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Tips;