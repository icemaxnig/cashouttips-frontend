// 📄 MyPurchasedCodes.jsx — Compact Mode Enabled
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../../api";
import { toast } from "react-toastify";

const MyPurchasedCodes = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        console.log("🔍 Fetching purchased codes...");
        console.log("🔑 Using token:", token);
        
        const response = await api.get("/user/purchased-codes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("📦 Received data:", response.data);
        
        if (Array.isArray(response.data)) {
          setPurchases(response.data);
        } else {
          console.error("❌ Invalid data format received:", response.data);
          setError("Invalid data format received from server");
        }
      } catch (err) {
        console.error("❌ Error fetching codes:", err);
        setError(err.response?.data?.error || "Failed to fetch purchased codes");
        toast.error("Failed to load purchased codes");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCodes();
    }
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m left`;
    }
    return `${diffMinutes}m left`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="text-center p-4">
        <h3 className="text-lg font-semibold mb-2">No Purchased Codes Yet</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Browse our collection to find your next winning code!
        </p>
        <button
          onClick={() => navigate("/my-codes")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Browse Booking Codes
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">My Codes</h2>
        <button
          onClick={() => navigate("/my-codes")}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {purchases.slice(0, 2).map((purchase) => (
          <div
            key={purchase._id}
            onClick={() => navigate(`/booking-codes/${purchase.code._id}`)}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {purchase.code.bookmaker.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{purchase.code.bookmaker}</h3>
                <p className="text-sm text-gray-500 font-mono">{purchase.code.code}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-600">
                {formatDate(purchase.code.expiresAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPurchasedCodes;
