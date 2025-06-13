import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../dashboard/context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUser, setToken } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      if (res.data.token && res.data.user) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setToken(token);
        navigate("/dashboard");
      } else {
        setError("Login failed: no token returned.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E2C] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl space-y-6 border border-yellow-400">
        <h2 className="text-2xl font-bold text-center text-yellow-400">Sign In to CashoutTips</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-yellow-400 rounded bg-[#0A0E2C] text-white placeholder-gray-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-yellow-400 rounded bg-[#0A0E2C] text-white placeholder-gray-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-[#0A0E2C] font-bold py-2 rounded hover:bg-yellow-300 transition"
          >
            Sign In
          </button>
        </form>
        <div className="text-center text-sm text-white/70">
          <Link to="/forgot-password" className="text-yellow-300 hover:underline">Forgot Password?</Link>
        </div>
        <div className="text-center text-sm text-white/70">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-300 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
