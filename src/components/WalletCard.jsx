import React, { useEffect, useState } from "react";

const WalletCard = () => {
  const [balance, setBalance] = useState(null); // use null instead of 0 to distinguish loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/wallet/balance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setBalance(data.balance);
      })
      .catch(() => setBalance(0)); // fallback if error
  }, []);

  return (
    <div className="bg-[#111436] p-6 rounded-xl shadow text-center">
      <p className="text-sm text-gray-400">Wallet Balance</p>
      <p className="text-2xl font-bold text-yellow-400">
        ₦{(balance ?? 0).toLocaleString()}
      </p>
    </div>
  );
};

export default WalletCard;
