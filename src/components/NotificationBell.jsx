import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import api from "../api";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await api.get("/user/status", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { subscriptionExpires } = res.data;
        if (subscriptionExpires) {
          const expiry = new Date(subscriptionExpires);
          const diff = Math.ceil((expiry - new Date()) / (1000 * 60 * 60 * 24));
          if (diff === 1) {
            setNotifications([{ text: "Your subscription expires tomorrow." }]);
          }
        }
      } catch {
        // silent
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="relative inline-block">
      <button onClick={() => setShowList(!showList)} className="relative">
        <Bell className="w-6 h-6 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        )}
      </button>
      {showList && notifications.length > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl z-50 p-4 text-sm">
          {notifications.map((n, i) => (
            <div key={i} className="py-1">{n.text}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;