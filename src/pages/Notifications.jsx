// 🔔 Notifications.jsx — Displays in-app user notifications
import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/user/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Error loading notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Notifications</h2>

      {loading ? (
        <p className="text-gray-300">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-400">No notifications at this time.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note, index) => (
            <li
              key={index}
              className="bg-white/10 p-4 rounded-lg border-l-4 border-yellow-400"
            >
              <p className="text-yellow-300 font-semibold">{note.title}</p>
              <p className="text-sm text-gray-300">{note.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(note.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
