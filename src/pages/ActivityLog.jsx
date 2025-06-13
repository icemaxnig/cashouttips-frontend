// 📊 ActivityLog.jsx — Show user wallet and platform actions
import React, { useEffect, useState } from "react";
import axios from "axios";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("/api/user/activity-log");
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch activity log", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Activity Log</h2>

      {loading ? (
        <p className="text-gray-300">Loading activity...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-400">No activity found.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log, index) => (
            <li
              key={index}
              className="bg-white/10 p-4 rounded-lg border-l-4 border-blue-500"
            >
              <p className="font-semibold text-blue-300">{log.type}</p>
              <p className="text-sm text-gray-300">{log.description}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(log.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLog;
