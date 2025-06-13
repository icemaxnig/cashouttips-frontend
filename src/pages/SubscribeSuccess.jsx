import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SubscribeSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const plan = query.get("plan") || "Your Plan";

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0E2C] text-white p-6">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">
          🎉 Subscription Successful!
        </h1>
        <p className="text-lg mb-2">You've successfully subscribed to:</p>
        <p className="text-xl font-semibold text-blue-400 mb-4">{plan}</p>
        <p className="text-sm text-gray-300 mb-6 text-center max-w-md">
          You’ll start receiving daily AI-generated rollover tips for this
          plan. Be sure to check your dashboard regularly. You can also view
          your active plans and track progress at any time.
        </p>
        <p className="text-sm text-green-400 mb-4 text-center">
          💰 You just earned referral bonus credits if your invitee used your
          code!
        </p>
        <div className="flex gap-4">
          <button
            className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded hover:bg-yellow-300 transition"
            onClick={() => navigate("/my-rollover")}
          >
            View My Rollover Tips
          </button>
          <button
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-500 transition"
            onClick={() => navigate("/refer")}
          >
            Refer & Earn
          </button>
        </div>
      </div>

      <div className="mt-8 w-full max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-yellow-300 mb-2">
          🔥 You may also like:
        </h3>
        <ul className="space-y-2 text-sm text-white">
          <li className="bg-[#1A1D3B] p-3 rounded flex justify-between items-center">
            <span>⚡ 2.0 Odds Plan – 5 Days</span>
            <button
              onClick={() => navigate("/subscribe/plan-id-here")}
              className="text-blue-300 underline text-xs"
            >
              View
            </button>
          </li>
          <li className="bg-[#1A1D3B] p-3 rounded flex justify-between items-center">
            <span>🎯 1.5 Odds Plan – 3 Days</span>
            <button
              onClick={() => navigate("/subscribe/plan-id-here")}
              className="text-blue-300 underline text-xs"
            >
              View
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SubscribeSuccess;
