
import React from "react";

const LockedBookingCard = ({ booking }) => {
  return (
    <div className="border rounded p-4 bg-gray-100 shadow">
      <h4 className="font-semibold text-lg mb-1">{booking.teams}</h4>
      <p><strong>Odds:</strong> {booking.odds}</p>
      <p><strong>Bookmaker:</strong> {booking.bookmaker}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <button className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        Buy Code
      </button>
    </div>
  );
};

export default LockedBookingCard;
