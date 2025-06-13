import React from "react";
import BookingCodeList from "../../pages/BookingCodeList";
import { Link } from "react-router-dom";

const PremiumCodesSection = () => (
  <div className="bg-[#1C1F3C] rounded-xl p-4 border border-gray-700 flex flex-col">
    <h3 className="text-yellow-300 text-lg font-semibold mb-2">🎫 Premium Booking Codes</h3>
    <div className="flex-1 overflow-y-auto">
      <BookingCodeList compact />
    </div>
    <Link to="/premium-codes" className="mt-3 text-sm text-yellow-300 hover:underline font-semibold">
      🔥 Buy More Codes →
    </Link>
  </div>
);

export default PremiumCodesSection;
