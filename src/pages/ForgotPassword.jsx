import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("OTP has been sent to your email.");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Reset request failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] flex items-center justify-center text-white p-4">
      <form onSubmit={handleSubmit} className="bg-[#1A1F3C] p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-800 text-white mb-4"
        />
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">
          Send OTP
        </button>
        <p className="mt-4 text-center">
          <Link to="/login" className="text-yellow-400 hover:underline">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;