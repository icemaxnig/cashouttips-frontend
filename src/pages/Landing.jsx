import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 🔁 navigate added
import { Newspaper, Bot, Trophy, Wallet } from "lucide-react";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import { useAuth } from "../dashboard/context/AuthContext"; // ✅ useAuth injected

const Landing = () => {
  const [showTip, setShowTip] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  const { user } = useAuth(); // ✅ check auth
  const navigate = useNavigate();

  // 🔁 Optional redirect to dashboard if logged in AND token exists
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (user && token) navigate("/dashboard");
  }, [user, navigate]);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setShowCookie(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-indigo-800 bg-[#0A0E2C]">
        <div className="flex items-center gap-3">
          <img src={logo} alt="CashoutTips Logo" className="h-20 w-auto" />
          <span className="text-2xl md:text-3xl font-extrabold text-yellow-400">CashoutTips</span>
        </div>
        <a
          href="https://t.me/cashouttips_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-yellow-400 text-[#0A0E2C] rounded hover:bg-yellow-300 font-semibold text-sm"
        >
          Open Telegram Bot
        </a>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-6 py-12 text-center bg-gradient-to-r from-[#0A0E2C] to-indigo-900">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-3">AI-Powered Football Predictions that Win</h2>
        <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto font-medium">
          From AI-driven rollovers to premium booking codes and free daily tips — all powered by intelligent algorithms to help you win smart.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-yellow-400 text-[#0A0E2C] px-5 py-2 rounded-lg font-bold hover:bg-yellow-300">Get Started</Link>
          <Link to="/login" className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-lg font-bold hover:bg-yellow-300 hover:text-[#0A0E2C]">Login</Link>
        </div>
      </section>

      {/* What We Offer */}
      <section className="px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white/10 rounded-xl p-6 shadow hover:shadow-lg transition text-white">
          <Trophy className="text-yellow-400 mb-3" />
          <h3 className="text-xl font-bold mb-2">Rollover Plans</h3>
          <p className="text-gray-200 font-medium">Start small, win big. Multi-day expert tips to grow your stake safely.</p>
          <Link to="/login" className="mt-4 inline-block text-yellow-400 hover:underline font-semibold">Subscribe</Link>
        </div>
        <div className="bg-white/10 rounded-xl p-6 shadow hover:shadow-lg transition text-white">
          <Wallet className="text-green-400 mb-3" />
          <h3 className="text-xl font-bold mb-2">Booking Codes</h3>
          <p className="text-gray-200 font-medium">Buy codes based on your odds and risk appetite. Instant, trusted predictions.</p>
          <Link to="/login" className="mt-4 inline-block text-yellow-400 hover:underline font-semibold">Explore Codes</Link>
        </div>
        <div className="bg-white/10 rounded-xl p-6 shadow hover:shadow-lg transition text-white">
          <Newspaper className="text-blue-400 mb-3" />
          <h3 className="text-xl font-bold mb-2">Free Tips</h3>
          <p className="text-gray-200 font-medium">Preview our daily prediction. Full tip posted on Telegram.</p>
          <button onClick={() => setShowTip(!showTip)} className="mt-4 inline-block text-yellow-400 hover:underline font-semibold">
            View Preview
          </button>
          {showTip && (
            <div className="mt-4 bg-white/10 p-4 rounded text-sm text-gray-100 font-medium">
              <ul>
                <li><strong>Sport:</strong> Football</li>
                <li><strong>League:</strong> EPL</li>
                <li><strong>Fixture:</strong> Arsenal vs Chelsea</li>
                <li><strong>Prediction:</strong> Over 2.5 Goals</li>
                <li><strong>Kick-off:</strong> 8:00 PM</li>
              </ul>
              <a
                href="https://t.me/cashouttips_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              >
                View Full Tip on Telegram
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Toggle Button */}
      <div className="flex flex-col items-center space-y-4 mt-10">
        <button
          onClick={() => setShowFaq(!showFaq)}
          className="bg-yellow-400 text-[#0A0E2C] font-bold px-6 py-2 rounded hover:bg-yellow-300 transition"
        >
          ❓ Frequently Asked Questions
        </button>
        {showFaq && (
          <div className="bg-white/10 text-sm p-6 rounded-xl max-w-3xl mx-auto text-gray-200 space-y-3">
            <p><strong>What is a Rollover?</strong><br />A curated multi-day prediction plan to build winnings gradually.</p>
            <p><strong>How do I fund my wallet?</strong><br />Login and use Paystack, Flutterwave, or Crypto on the wallet page.</p>
            <p><strong>Can I withdraw referral bonuses?</strong><br />Yes, you can withdraw from the Bonus Wallet once the minimum is reached.</p>
            <p><strong>What if I miss a day?</strong><br />Each user's rollover is personal, so you resume with the next posted tip.</p>
          </div>
        )}
      </div>

      {/* How It Works */}
      <section className="px-4 sm:px-6 py-10 max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6 text-white">
          <div>
            <div className="text-lg font-semibold">1. Fund Wallet</div>
            <p className="text-sm text-gray-300">Top up with Paystack, Flutterwave, or Crypto</p>
          </div>
          <div>
            <div className="text-lg font-semibold">2. Choose Product</div>
            <p className="text-sm text-gray-300">Pick a Rollover Plan or Booking Code</p>
          </div>
          <div>
            <div className="text-lg font-semibold">3. Win and Withdraw</div>
            <p className="text-sm text-gray-300">Receive daily tips and cash out anytime</p>
          </div>
        </div>
      </section>

      {/* AI vs Human Tipsters */}
      <section className="px-4 sm:px-6 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-yellow-400 text-center mb-8">AI vs Human Tipsters</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 p-6 rounded-xl text-white shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold text-yellow-300 mb-2">Traditional Human Tipsters</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2"><span className="text-red-400">🚫</span>Based on emotions or bias</li>
              <li className="flex items-start gap-2"><span className="text-red-400">🤔</span>Limited to personal experience</li>
              <li className="flex items-start gap-2"><span className="text-red-400">🐢</span>Can’t process real-time data efficiently</li>
              <li className="flex items-start gap-2"><span className="text-red-400">🎯</span>Often inconsistent across matches</li>
            </ul>
          </div>
          <div className="bg-white/10 p-6 rounded-xl text-white shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold text-green-300 mb-2">AI-Powered Predictions</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2"><span className="text-green-400">⚡️</span>Analyzes thousands of matches instantly</li>
              <li className="flex items-start gap-2"><span className="text-green-400">📊</span>Unbiased and data-driven decisions</li>
              <li className="flex items-start gap-2"><span className="text-green-400">🧠</span>Consistently monitors odds & lineups</li>
              <li className="flex items-start gap-2"><span className="text-green-400">🔁</span>Adapts based on historical patterns</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="px-4 sm:px-6 py-10 text-center text-white bg-indigo-900">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6">CashoutTips by the Numbers</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-bold text-white">500,000+</p>
            <p className="text-gray-300">Total Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">85%+</p>
            <p className="text-gray-300">Tip Accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">98%</p>
            <p className="text-gray-300">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      <p className="text-center text-gray-400 text-sm mt-6 px-4">
        CashoutTips is powered by intelligent AI models — designed to help you bet smarter, not harder.
      </p>

      {/* Cookie Banner */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
