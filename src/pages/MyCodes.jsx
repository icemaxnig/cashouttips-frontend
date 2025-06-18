import React, { useState, useEffect } from "react";
import { useAuth } from "../dashboard/context/AuthContext";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyCodes = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        console.log("🔍 Fetching all purchased codes...");
        const response = await api.get("/user/purchased-codes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
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
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold mb-4">No Purchased Codes Yet</h3>
        <p className="text-gray-600 mb-6">
          You haven't purchased any booking codes yet. Browse our collection to find your next winning code!
        </p>
        <button
          onClick={() => navigate("/booking-codes")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Browse Booking Codes
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Purchased Codes</h1>
        <p className="mt-2 text-gray-600">View and manage all your purchased booking codes</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {purchases.map((purchase) => (
          <div
            key={purchase._id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {purchase.code.bookmaker}
                </h3>
                <p className="text-sm text-gray-500">
                  Purchased on {formatDate(purchase.createdAt)}
                </p>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                {purchase.code.urgencyTag}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Code:</span>
                <span className="font-mono font-medium">{purchase.code.code}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Odds:</span>
                <span className="font-medium">{purchase.code.odds}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">₦{purchase.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Expires:</span>
                <span className="font-medium">{formatDate(purchase.code.expiresAt)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => navigate(`/booking-codes/${purchase.code._id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Game Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCodes;
