import React, { useEffect, useState } from "react";
import api from "../api";
import WalletBadge from "../components/WalletBadge";

const BookingCodes = () => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    api.get("/booking")
      .then((res) => setCodes(res.data))
      .catch((err) => console.error("Error loading codes", err));
  }, []);

  return (
    <div className="p-4">
      <WalletBadge />
      <h2 className="text-xl font-bold mb-4">🎯 Premium Booking Codes</h2>
      <div className="grid gap-4">
        {codes.length === 0 ? (
          <p>No booking codes available.</p>
        ) : (
          codes.map((code) => (
            <div key={code._id} className="border rounded p-4 shadow">
              <p className="font-semibold text-lg">🔒 Locked</p>
              <p>₦{code.price}</p>
              <p>📊 Odds: {code.odds}</p>
              <p>🏦 Bookmaker: {code.bookmaker}</p>
              <p>{code.urgencyTag}</p>
              <p>{code.category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingCodes;
