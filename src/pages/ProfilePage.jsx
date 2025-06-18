import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState({ mainWallet: 0, bonusWallet: 0 });
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const [userRes, walletRes] = await Promise.all([
        api.get("/user/profile"),
        api.get("/wallet/balance")
      ]);
      setUser(userRes.data);
      setWallet(walletRes.data);
    } catch (err) {
      console.error("Failed to load user data:", err);
      toast.error("Failed to load user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // 🔄 Refresh on wallet update
  useEffect(() => {
    const handleWalletUpdate = () => fetchUserData();
    window.addEventListener("wallet-updated", handleWalletUpdate);
    return () => window.removeEventListener("wallet-updated", handleWalletUpdate);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/user/change-password", form);
      toast.success("Password updated successfully");
      setTimeout(() => navigate('/dashboard'), 1500);
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">👤 My Profile</h2>

        {user && (
          <div className="bg-white/10 p-6 rounded-xl mb-6 text-sm text-gray-300 space-y-2">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Main Wallet:</strong> ₦{wallet.mainWallet.toLocaleString()}</p>
            <p><strong>Bonus Wallet:</strong> ₦{wallet.bonusWallet.toLocaleString()}</p>
          </div>
        )}

        <div className="bg-white/10 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4 text-sm">
            <div>
              <label className="block mb-1">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white text-black outline-none focus:ring-2 ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white text-black outline-none focus:ring-2 ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white text-black outline-none focus:ring-2 ring-yellow-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300 transition"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
