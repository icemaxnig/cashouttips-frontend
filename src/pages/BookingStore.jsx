// 🎫 BookingStore.jsx - View and buy booking codes
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BookingStore = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [codes, setCodes] = useState([]);
  const [purchasedCodes, setPurchasedCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCodes();
    fetchPurchasedCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const res = await axios.get(`/api/booking/user/${user._id}`);
      setCodes(res.data);
    } catch (err) {
      toast.error("Error loading codes");
    }
  };

  const fetchPurchasedCodes = async () => {
    try {
      const res = await axios.get(`/api/user/purchased-codes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setPurchasedCodes(res.data.map(p => p.code._id));
    } catch (err) {
      console.error("Error fetching purchased codes:", err);
    }
  };

  const handlePurchase = async (codeId) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/booking/purchase`, {
        userId: user._id,
        codeId,
      });
      toast.success("Code purchased successfully!");
      // Redirect to my-codes after successful purchase
      navigate('/my-codes');
    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  const isCodePurchased = (codeId) => {
    return purchasedCodes.includes(codeId);
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Booking Code Store</h2>
        <div className="grid gap-4">
          {codes.length === 0 ? (
            <p className="text-gray-300 text-center">No booking codes available.</p>
          ) : (
            codes.map((code) => (
              <div
                key={code._id}
                className="bg-white/10 rounded-lg p-4 shadow flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div>
                  <h3 className="text-yellow-400 font-semibold text-lg">{code.oddType} - ₦{code.price}</h3>
                  <p className="text-sm text-gray-300">
                    Expires: {new Date(code.expiry).toLocaleString()}
                  </p>
                </div>
                {isCodePurchased(code._id) ? (
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 font-bold">✓ Purchased</span>
                    <button
                      onClick={() => navigate(`/booking-codes/${code._id}`)}
                      className="text-sm bg-[#1F2D5C] text-white px-3 py-1 rounded hover:bg-[#FFD700] hover:text-[#1F2D5C] transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={loading}
                    onClick={() => handlePurchase(code._id)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold mt-2 sm:mt-0 hover:bg-yellow-300 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : `Pay ₦${code.price} to View`}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingStore;
