import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-[#111436] text-white px-4 py-3 shadow flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-yellow-400">
        CashoutTips
      </Link>
      <nav className="flex gap-4">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:underline text-yellow-300">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline text-yellow-300">
              Login
            </Link>
            <Link to="/register" className="hover:underline text-yellow-300">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;