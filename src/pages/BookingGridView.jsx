import React, { useState } from "react";
import LockedBookingCard from "./LockedBookingCard";
import { Dialog } from "@headlessui/react";

const sampleBookings = [
  {
    id: 1,
    odds: 137.5,
    price: 300,
    confidence: 45,
    bookmaker: "Bet9ja",
    category: "AI SPECIAL",
    urgency: "🚀 BOOSTED AI",
    expiry: "5h 20m"
  },
  {
    id: 2,
    odds: 12.8,
    price: 2500,
    confidence: 90,
    bookmaker: "1xBet",
    category: "Combo Picks",
    urgency: "🔥 HOT PICK",
    expiry: "3h 45m"
  }
];

const BookingGridView = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-4">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">Booking Codes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sampleBookings.map((tip) => (
          <div key={tip.id} onClick={() => setSelected(tip)} className="cursor-pointer">
            <LockedBookingCard {...tip} />
          </div>
        ))}
      </div>

      <Dialog open={!!selected} onClose={() => setSelected(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Dialog.Panel className="bg-[#0A0E2C] rounded-xl p-4 max-w-sm w-full border border-yellow-500">
            {selected && <LockedBookingCard {...selected} />}
            <button
              onClick={() => setSelected(null)}
              className="mt-4 text-sm text-yellow-300 hover:underline block mx-auto"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default BookingGridView;
