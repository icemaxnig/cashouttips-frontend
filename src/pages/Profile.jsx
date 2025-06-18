import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";


const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user profile:", err);
      toast.error("Failed to load user profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔄 Refresh on wallet update
  useEffect(() => {
    const handleWalletUpdate = () => fetchUser();
    window.addEventListener("wallet-updated", handleWalletUpdate);
    return () => window.removeEventListener("wallet-updated", handleWalletUpdate);
  }, []);

  if (!user) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-[#0A0E2C] text-white rounded shadow mt-8">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">My Profile</h2>

        <div className="bg-[#1C1F3C] rounded p-4">
          <p className="text-lg font-semibold mb-2">{user.name || "No Name Provided"}</p>
          <p className="text-sm text-gray-300 mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="text-sm text-gray-300 mb-1"><strong>Role:</strong> {user.role}</p>
          <p className="text-sm text-gray-300 mb-1"><strong>Telegram ID:</strong> {user.telegramId || "N/A"}</p>

          <div className="space-y-2 mt-4 text-sm text-gray-300">
            <div><strong>User ID:</strong> <span>{user._id}</span></div>
            <div><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
            <div><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</div>
            <div className="mt-6 text-sm text-gray-300 space-y-1">
              <p><strong>Main Wallet:</strong> ₦{user.mainWallet?.toLocaleString() || 0}</p>
              <p><strong>Bonus Wallet:</strong> ₦{user.bonusWallet?.toLocaleString() || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
