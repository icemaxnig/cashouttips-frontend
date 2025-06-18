import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "", otp: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [countryCode, setCountryCode] = useState("us");

  useEffect(() => {
    // Fetch user's country via IP
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data && data.country_code) {
          setCountryCode(data.country_code.toLowerCase());
        }
      } catch (err) {
        console.error("Failed to get user country:", err);
      }
    };
    fetchCountry();
  }, []);

  useEffect(() => {
    if (otpCooldown > 0) {
      const timer = setTimeout(() => setOtpCooldown(otpCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCooldown]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validatePassword = (pw) =>
    pw.length >= 6 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw);

  const sendOtp = async () => {
    if (otpSent) return; // Don't resend again
    setError("");
    if (!form.email.includes("@")) return setError("Enter a valid email.");
    try {
      const res = await api.post("/auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      setOtpSent(true);
      setOtpCooldown(60);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.otp) return setError("Enter the OTP sent to your email.");

    try {
      const res = await api.post("/auth/verify-otp", {
        email: form.email,
        otp: form.otp,
      });

      setMessage("✅ Account verified! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E2C] text-white p-4">
      <form onSubmit={handleSubmit} className="bg-[#1A1F3C] p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Create Account</h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="p-3 rounded bg-white/20" required />
          <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="p-3 rounded bg-white/20" required />
        </div>

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-3 mb-4 rounded bg-white/20" required />

        <div className="mb-4">
          <label className="block text-sm mb-1">Phone Number</label>
          <div className="bg-white/20 rounded p-1">
            <PhoneInput
              country={countryCode}
              enableAreaCodes
              preferredCountries={['us', 'gb', 'ng']}
              value={form.phone}
              onChange={(phone) => setForm({ ...form, phone })}
              inputStyle={{
                width: "100%",
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                paddingLeft: "48px"
              }}
              buttonStyle={{ backgroundColor: "transparent", border: "none" }}
              containerStyle={{ width: "100%" }}
            />
          </div>
        </div>

        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 mb-2 rounded bg-white/20" required />
        <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full p-3 mb-2 rounded bg-white/20" required />
        <label className="text-sm inline-flex items-center mb-2">
          <input type="checkbox" className="mr-2" onChange={() => setShowPassword(!showPassword)} /> Show Password
        </label>

        <div className="flex items-center mb-4">
          <input type="text" name="otp" placeholder="OTP" value={form.otp} onChange={handleChange} className="w-full p-3 rounded bg-white/20 mr-2" required />
          <button type="button" onClick={sendOtp} disabled={otpCooldown > 0} className="text-sm text-yellow-400 hover:underline">
            {otpCooldown > 0 ? `Wait ${otpCooldown}s` : "Send OTP"}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-400 text-sm mb-2">{message}</p>}

        <button type="submit" disabled={!otpSent} className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300 transition disabled:opacity-50">
          Register
        </button>

        <div className="text-center text-sm mt-4">
          <Link to="/login" className="text-yellow-400 hover:underline">Already have an account? Login</Link><br />
          <Link to="/forgot-password" className="text-yellow-400 hover:underline">Forgot Password?</Link>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          By registering, you confirm you're 18+ and agree to our Responsible Gambling Policy.
        </p>
      </form>
    </div>
  );
};

export default Register;
