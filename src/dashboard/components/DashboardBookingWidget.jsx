// DashboardBookingWidget.jsx (Updated with route link to booking code details)
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LockIcon from "../../assets/lock.svg";
import api from "../../api";

const DashboardBookingWidget = () => {
  const [bookingCodes, setBookingCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/booking", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookingCodes(res.data.slice(0, 2));
      })
      .catch((err) => {
        console.error("Error fetching booking codes", err);
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🎯 Premium Booking Codes</h3>
        <Link
          to="/booking-codes"
          className="text-blue-600 text-sm hover:underline"
        >
          See All
        </Link>
      </div>

      {bookingCodes.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookingCodes.map((code) => (
            <div
              key={code._id}
              className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Odds:</span> {code.odds}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Bookmaker:</span> {code.bookmaker}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Price:</span> ₦{code.price}
                  </p>
                </div>
                <div className="text-center">
                  {code.alreadyPurchased ? (
                    <p className="text-green-600 font-semibold">Purchased</p>
                  ) : (
                    <Link
                      to={`/booking-codes/${code._id}`}
                      className="inline-flex items-center px-3 py-1 text-sm bg-yellow-400 rounded text-black hover:bg-yellow-500"
                    >
                      <img
                        src={LockIcon}
                        alt="Locked"
                        className="w-4 h-4 mr-1"
                      />
                      Buy
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardBookingWidget;
