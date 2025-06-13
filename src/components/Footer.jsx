import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";

const Footer = () => {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setTimeout(() => setShowCookie(true), 1200);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookie(false);
  };

  return (
    <>
      <footer className="bg-[#0A0E2C] text-gray-300 text-sm py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto space-y-6 text-center">

          {/* Social Icons */}
          <div className="flex justify-center gap-6 text-yellow-400 text-xl">
            <a href="https://facebook.com/cashouttipsai" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://x.com/cashouttips_ai" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/cashouttips_ai" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://t.me/cashouttips_ai" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
          </div>

          {/* Responsible Gaming Section */}
          <div className="text-center text-white px-4 py-6 border-t border-indigo-800">
            <h4 className="text-lg font-bold text-yellow-400 mb-2">Responsible Gaming</h4>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto">
              CashoutTips is strictly for users 18 years and above. We support responsible gambling and encourage safe betting practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-blue-400">
              <a href="https://www.begambleaware.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">BeGambleAware.org</a>
              <a href="https://www.gamcare.org.uk/" target="_blank" rel="noopener noreferrer" className="hover:underline">GamCare</a>
              <a href="https://www.responsiblegambling.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">ResponsibleGambling.org</a>
            </div>
            <p className="text-xs text-gray-400 mt-3">You must be 18+ to use this platform. Play smart. Bet responsibly.</p>
          </div>

          {/* Terms and Copyright */}
          <p>
            By using <strong>CashoutTips</strong>, you agree to our{" "}
            <Link to="/terms" className="underline text-yellow-400">Terms & Conditions</Link>,{" "}
            <Link to="/privacy" className="underline text-yellow-400">Privacy Policy</Link>, and{" "}
            <Link to="/disclaimer" className="underline text-yellow-400">Disclaimer</Link>. You must be 18+.
          </p>

          <p className="text-xs text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} CashoutTips. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Cookie Consent */}
      {showCookie && (
        <div className="fixed bottom-4 left-4 right-4 md:right-8 bg-gray-800 text-white px-4 py-3 rounded-md shadow-md z-50">
          <div className="flex items-center justify-between">
            <span className="text-sm">We use cookies to ensure you get the best experience on CashoutTips.</span>
            <button
              className="ml-4 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
              onClick={handleAcceptCookies}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
