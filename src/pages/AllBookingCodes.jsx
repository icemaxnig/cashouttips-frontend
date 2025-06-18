// 📁 src/pages/AllBookingCodes.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WalletBadge from "../components/WalletBadge";
import api from "../api";
import { useAuth } from "../dashboard/context/AuthContext";
import { toast } from "react-toastify";

const AllBookingCodes = () => {
  const [codes, setCodes] = useState([]);
  const [purchasedCodes, setPurchasedCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all booking codes
        const codesResponse = await api.get("/booking");
        setCodes(codesResponse.data);

        // Fetch user's purchased codes if logged in
        if (user && token) {
          const purchasedResponse = await api.get("/user/purchased-codes", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setPurchasedCodes(purchasedResponse.data.map(p => p.code._id));
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load booking codes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  const handlePurchase = async (codeId, useBonus = false) => {
    if (!user || !token) {
      toast.error("Please login to purchase codes");
      navigate("/login");
      return;
    }

    if (buying) return;
    setBuying(true);

    try {
      await api.post(`/booking/purchase/${codeId}`, 
        { useBonus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("Code purchased successfully!");
      navigate("/my-codes");
    } catch (error) {
      console.error("Purchase error:", error);
      const errorMessage = error.response?.data?.error || "Failed to purchase code";
      toast.error(errorMessage);
    } finally {
      setBuying(false);
    }
  };

  const isCodePurchased = (codeId) => {
    return purchasedCodes.includes(codeId);
  };

  // Filter out purchased codes
  const availableCodes = codes.filter(code => !isCodePurchased(code._id));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <WalletBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {availableCodes.length === 0 ? (
          <div className="col-span-2 text-center p-8">
            <h3 className="text-xl font-semibold mb-2">No Available Codes</h3>
            <p className="text-gray-600 mb-4">All premium booking codes have been purchased.</p>
            <button
              onClick={() => navigate("/my-codes")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View My Purchased Codes
            </button>
          </div>
        ) : (
          availableCodes.map((code) => (
            <div
              key={code._id}
              className="bg-[#1F2D5C] text-white p-4 rounded-2xl shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="text-lg font-bold">Odds: {code.totalOdds}</div>
                <div className="text-sm text-gray-300">⏳ Ends: {new Date(code.expiresAt).toLocaleTimeString()}</div>
                <div className="my-2 text-yellow-400">•••••••</div>
                <div className="text-sm text-gray-300">Price: ₦{code.price}</div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handlePurchase(code._id)}
                  disabled={buying}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {buying ? "Processing..." : "Buy Now"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllBookingCodes;
