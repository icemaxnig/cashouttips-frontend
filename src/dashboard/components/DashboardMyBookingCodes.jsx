import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import moment from "moment";

const DashboardMyBookingCodes = ({ compact }) => {
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/booking-codes/purchased")
      .then((res) => setPurchases(res.data.slice(0, 2)))
      .catch((err) => console.error("Preview fetch error", err));
  }, []);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md h-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-[#1F2D5C]">🎫 My Booking Codes</h3>
        <button
          onClick={() => navigate("/my-codes")}
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </button>
      </div>

      {purchases.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No codes purchased yet.</p>
      ) : (
        <div className="space-y-3">
          {purchases.map((purchase) => (
            <div key={purchase._id} className="border rounded-xl p-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-800">
                  {purchase.code?.bookmaker} • {purchase.code?.odds} odds
                </span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                  {purchase.code?.urgencyTag || "Normal"}
                </span>
              </div>
              <p className="text-green-700 font-mono text-sm mt-2">
                Code: {purchase.code?.code}
              </p>
              <p className="text-xs text-gray-400">
                Bought: {moment(purchase.createdAt).format("lll")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardMyBookingCodes;
