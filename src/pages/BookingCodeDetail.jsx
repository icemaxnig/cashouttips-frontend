// 📁 src/pages/BookingCodeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../dashboard/context/AuthContext";
import api from "../api";
import { toast } from "react-toastify"; // ✅ correct

const BookingCodeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCodeDetails = async () => {
      try {
        console.log("🔍 Fetching code details for ID:", id);
        const response = await api.get(`/booking-codes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("📦 Received code data:", response.data);
        
        if (response.data) {
          setCode(response.data);
        } else {
          setError("Code not found");
        }
      } catch (err) {
        console.error("❌ Error fetching code:", err);
        setError(err.response?.data?.error || "Failed to load code details");
        toast.error("Failed to load code details");
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchCodeDetails();
    }
  }, [id, token]);

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
          onClick={() => navigate("/my-codes")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to My Codes
        </button>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold mb-4">Code Not Found</h3>
        <p className="text-gray-600 mb-6">
          The requested booking code could not be found.
        </p>
        <button
          onClick={() => navigate("/my-codes")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to My Codes
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate("/my-codes")}
            className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
          >
            ← Back to My Codes
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {code.bookmaker}
              </h1>
              <p className="text-gray-500">
                Expires on {formatDate(code.expiresAt)}
              </p>
            </div>
            <span className="px-4 py-2 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
              {code.urgencyTag}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Booking Code</h3>
                <p className="font-mono text-xl">{code.code}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Odds</h3>
                <p className="text-2xl font-bold text-blue-600">{code.odds}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Game Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Bookmaker:</span> {code.bookmaker}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Status:</span> Active
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Expires:</span> {formatDate(code.expiresAt)}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Copy the booking code above</li>
                  <li>Visit {code.bookmaker} website or app</li>
                  <li>Paste the code in the booking section</li>
                  <li>Complete your booking before expiration</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCodeDetail;
