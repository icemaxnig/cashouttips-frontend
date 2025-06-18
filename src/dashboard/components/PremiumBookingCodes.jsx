import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../dashboard/context/AuthContext";
import api from "../../api";
import { toast } from "react-hot-toast";

const PremiumBookingCodes = () => {
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

  // Filter out purchased codes and get only the first 3
  const availableCodes = codes
    .filter(code => !isCodePurchased(code._id))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If no unpurchased codes are available, show empty state
  if (availableCodes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🎯 Premium Booking Codes</h3>
          <button
            onClick={() => navigate("/my-codes")}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            View My Codes
          </button>
        </div>
        <div className="text-center py-4">
          <p className="text-gray-500">No available codes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🎯 Premium Booking Codes</h3>
        <button
          onClick={() => navigate("/booking-codes")}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {availableCodes.map((code) => (
          <div
            key={code._id}
            className="bg-gray-50 p-3 rounded-lg border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{code.bookmaker}</p>
                <p className="text-sm text-gray-500">
                  Odds: {code.totalOdds} • ₦{code.price}
                </p>
              </div>
              <button
                onClick={() => handlePurchase(code._id)}
                disabled={buying}
                className="px-3 py-1 bg-yellow-400 text-black text-sm rounded-full font-medium hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {buying ? "Processing..." : "Buy Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumBookingCodes; 