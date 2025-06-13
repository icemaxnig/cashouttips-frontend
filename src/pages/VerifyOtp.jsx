import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setMessage(data.message);
      // ✅ Show toast (browser-native or swap for a toast lib like react-hot-toast)
      const toast = document.createElement('div');
      toast.textContent = '🎉 Verification successful! Redirecting to login...';
      toast.style = 'position:fixed;top:20px;right:20px;padding:12px 20px;background:#28a745;color:#fff;border-radius:8px;z-index:9999;font-size:15px;';
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
        navigate('/login');
      }, 2500);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0A0E2C] text-white">
      <div className="w-full max-w-md p-8 rounded-md bg-[#131B3A] shadow-lg">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">Verify Your Email</h2>
        <form onSubmit={handleVerify}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 rounded bg-[#1F2A4C] text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-3 mb-4 rounded bg-[#1F2A4C] text-white"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isVerifying}
            className={`w-full py-3 rounded font-bold transition ${
              isVerifying ? 'bg-yellow-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'
            }`}
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-400 text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyOtp;
