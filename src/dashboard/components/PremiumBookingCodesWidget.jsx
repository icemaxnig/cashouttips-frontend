import React, { useEffect, useState } from "react";
import axios from "../../api/axios"; // ✅ Custom Axios instance
import "./WidgetCard.scss";

const PremiumBookingCodesWidget = () => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await axios.get("/booking/premiumcodes?limit=3"); // ✅ Corrected route
        const data = res.data || [];
        const limited = data.slice(0, 3); // ✅ Ensure only 3 codes displayed
        console.log("✅ Premium codes fetched:", limited);
        setCodes(limited);
      } catch (err) {
        console.error("❌ Failed to load premium codes:", err);
      }
    };

    fetchCodes();
  }, []);

  return (
    <div className="widget-card">
      <h3>🏆 Premium Booking Codes</h3>
      {codes.length === 0 ? (
        <p>No booking codes available right now.</p>
      ) : (
        <ul>
          {codes.map((code, idx) => (
            <li key={idx}>
              <strong>{code.code}</strong> — {code.market}
            </li>
          ))}
        </ul>
      )}
      <a href="/booking-codes" className="widget-btn">View More</a>
    </div>
  );
};

export default PremiumBookingCodesWidget;
