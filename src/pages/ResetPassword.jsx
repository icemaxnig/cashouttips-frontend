import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../api";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    try {
      await api.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setSuccess("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg?.includes("expired")) {
        setError("OTP has expired. Please request a new one.");
      } else if (msg?.includes("Invalid")) {
        setError("Invalid OTP. Please check and try again.");
      } else {
        setError("Reset failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] flex items-center justify-center text-white p-4">
      <form onSubmit={handleReset} className="bg-[#1A1F3C] p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Reset Password</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-800 text-white mb-4"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-800 text-white mb-4"
        />
        {error && (
          <div className="text-red-500 mb-2">
            <p>{error}</p>
            <p className="text-sm mt-1 text-yellow-300">
              <Link to="/forgot-password" className="hover:underline">
                Request a new OTP
              </Link>
            </p>
          </div>
        )}
        {success && <p className="text-green-500">{success}</p>}
        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">
          Reset Password
        </button>
        <p className="mt-4 text-center">
          <Link to="/login" className="text-yellow-400 hover:underline">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;