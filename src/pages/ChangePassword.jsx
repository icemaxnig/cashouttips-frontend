// 🔐 ChangePassword.jsx
import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(`/api/user/change-password/${user._id}`, {
        oldPassword,
        newPassword,
      });
      setMessage(res.data.message || "Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Password update failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white flex justify-center items-center p-6">
      <div className="bg-white/10 p-8 rounded-xl shadow max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Current Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-[#1C2340] border border-gray-600 focus:outline-none"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-[#1C2340] border border-gray-600 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300"
          >
            Update Password
          </button>
          {message && <p className="text-sm mt-2 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
