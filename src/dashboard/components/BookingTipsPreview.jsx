
// 📄 BookingTipsPreview.jsx — Shows a few purchasable booking codes (dashboard preview)
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import BookingTipCards from "./BookingTipCard";
import { useNavigate } from "react-router-dom";

const BookingTipsPreview = () => {
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/booking", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTips(res.data || []);
      } catch (err) {
        console.error("Error fetching booking tips:", err);
      }
    };

    fetchTips();
  }, []);

  const visibleTips = tips.slice(0, 2); // Only show 2 preview tips

  return (
    <div className="bg-white border border-[#1F2D5C] rounded-2xl shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-[#1F2D5C] text-sm md:text-base">🎟️ Available Booking Tips</h3>
        <button
          onClick={() => navigate("/booking-codes")}
          className="text-xs text-blue-700 hover:underline"
        >
          See All →
        </button>
      </div>

      {visibleTips.length === 0 ? (
        <p className="text-xs text-gray-500 italic">No booking tips available right now.</p>
      ) : (
        <div className="space-y-4">
          {visibleTips.map((tip) => (
            <BookingTipCards key={tip._id} tip={tip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingTipsPreview;
