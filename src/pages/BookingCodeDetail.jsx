// src/pages/BookingCodeDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { notifyError, notifySuccess } from "../utils/toast";
import LockIcon from "../assets/lock.svg";

const BookingCodeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/booking-codes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const found = res.data.find((b) => b._id === id);
        if (!found) {
          notifyError("Booking Code not found");
          return navigate("/booking-codes");
        }
        setBooking(found);
      })
      .catch(() => notifyError("Error loading code"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleBuy = async () => {
    setBuying(true);
    const token = localStorage.getItem("token");
    try {
      const res = await api.post(`/booking-codes/buy/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notifySuccess("Purchased successfully!");
      setBooking(res.data.code);
    } catch (err) {
      notifyError(err?.response?.data?.error || "Error purchasing");
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!booking) return null;

  const {
    code,
    bookmaker,
    odds,
    price,
    category,
    urgencyTag,
    successRate,
    note,
    alreadyPurchased,
    buyerCount,
    slotLimit,
    expiresAt,
    postedAt,
    purchaseTime,
  } = booking;

  return (
    <div className="max-w-2xl mx-auto p-4 text-white bg-[#0A0E2C] min-h-screen">
      <h1 className="text-xl font-bold text-yellow-400 mb-4">📋 Booking Code Details</h1>

      <div className="bg-[#111638] p-4 rounded shadow space-y-2">
        <p>🎲 <strong>Odds:</strong> {odds}</p>
        <p>💼 <strong>Bookmaker:</strong> {bookmaker}</p>
        <p>🎯 <strong>Category:</strong> {category}</p>
        <p>{urgencyTag && <>🚨 <strong>Urgency:</strong> {urgencyTag}</>}</p>
        <p>🔐 <strong>Price:</strong> ₦{price}</p>
        <p>📈 <strong>Success Rate:</strong> {successRate}%</p>
        {note && <p>📝 <strong>Admin Note:</strong> {note}</p>}
        <p>📤 <strong>Posted:</strong> {new Date(postedAt).toLocaleString()}</p>
        <p>⏳ <strong>Expires:</strong> {new Date(expiresAt).toLocaleString()}</p>
        <p>👥 <strong>Buyers:</strong> {buyerCount}{slotLimit ? ` / ${slotLimit}` : ""}</p>
        {purchaseTime && <p>🕒 <strong>Purchased At:</strong> {new Date(purchaseTime).toLocaleString()}</p>}

        <div className="text-center mt-6">
          {alreadyPurchased ? (
            <div className="text-green-400 font-bold text-lg">✅ UNLOCKED: {code}</div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <img src={LockIcon} alt="locked" className="w-10 h-10 opacity-80" />
              <button
                onClick={handleBuy}
                disabled={buying}
                className="btn bg-yellow-400 text-[#0A0E2C] font-bold px-6 py-2 rounded"
              >
                {buying ? "Processing..." : `Buy for ₦${price}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCodeDetail;
