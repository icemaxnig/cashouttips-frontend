// bookingcodes.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import BookingCodeCard from "./bookingcodelist";

const BookingCodes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/booking-codes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCodes(res.data || []);
      })
      .catch((err) => {
        console.error("Error loading codes:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-4">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">🎯 All Premium Booking Codes</h2>
      {loading ? (
        <p>Loading booking codes...</p>
      ) : codes.length === 0 ? (
        <p>No booking codes available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {codes.map((code) => (
            <BookingCodeCard key={code._id} code={code} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingCodes;
