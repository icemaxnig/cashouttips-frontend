// 🎫 BookingStore.jsx - View and buy booking codes
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingStore = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [codes, setCodes] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const res = await axios.get(`/api/booking/user/${user._id}`);
      setCodes(res.data);
    } catch (err) {
      setMessage("Error loading codes");
    }
  };

  const handlePurchase = async (codeId) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`/api/booking/purchase`, {
        userId: user._id,
        codeId,
      });
      setMessage(res.data.message);
      fetchCodes();
    } catch (err) {
      setMessage(err.response?.data?.message || "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Booking Code Store</h2>
        {message && <p className="text-sm text-center text-red-400 mb-4">{message}</p>}
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
                {code.unlocked ? (
                  <div className="text-green-400 font-bold mt-2 sm:mt-0">{code.code}</div>
                ) : (
                  <button
                    disabled={loading}
                    onClick={() => handlePurchase(code._id)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold mt-2 sm:mt-0 hover:bg-yellow-300"
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
