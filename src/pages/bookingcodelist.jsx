// bookingcodelist.jsx
import React from "react";

const BookingCodeCard = ({ code }) => {
  const {
    code: bookingCode,
    odds,
    price,
    bookmaker,
    note,
    urgencyTag,
    slotLimit,
    alreadyPurchased,
    buyerCount,
    expiresAt,
    purchaseTime,
  } = code;

  const expiry = new Date(expiresAt).toLocaleString();
  const purchased = alreadyPurchased ? "✅ Purchased" : "🔒 Locked";
  const buyers = slotLimit ? `${buyerCount}/${slotLimit} slots` : `${buyerCount} buyers`;

  return (
    <div className="bg-[#1A1E3C] p-4 rounded shadow text-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-yellow-400">{urgencyTag || "🎯 Booking Code"}</h3>
        <span className="text-sm">{purchased}</span>
      </div>
      <p><b>Odds:</b> {odds}</p>
      <p><b>Bookmaker:</b> {bookmaker}</p>
      <p><b>Code:</b> {alreadyPurchased ? bookingCode : "Locked 🔒"}</p>
      {note && <p className="text-sm italic mt-2 text-gray-300">📝 {note}</p>}
      <p className="text-sm mt-2 text-yellow-300"><b>Price:</b> ₦{price}</p>
      <p className="text-sm text-gray-400">⏰ Expires: {expiry}</p>
      <p className="text-sm text-gray-400">👥 {buyers}</p>
      {purchaseTime && (
        <p className="text-sm text-green-400">🛒 Purchased on: {new Date(purchaseTime).toLocaleString()}</p>
      )}
    </div>
  );
};

export default BookingCodeCard;
