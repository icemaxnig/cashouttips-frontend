import React, { useEffect, useState } from "react";

const WalletCard = () => {
  const [walletData, setWalletData] = useState({ mainWallet: null, bonusWallet: null });

  const fetchWalletBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/wallet/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setWalletData({
        mainWallet: data.mainWallet || 0,
        bonusWallet: data.bonusWallet || 0
      });
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      setWalletData({ mainWallet: 0, bonusWallet: 0 });
    }
  };

  useEffect(() => {
    fetchWalletBalance();
    // Set up an interval to refresh wallet balance every 30 seconds
    const intervalId = setInterval(fetchWalletBalance, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[#111436] p-6 rounded-xl shadow text-center">
      <p className="text-sm text-gray-400">Wallet Balance</p>
      <p className="text-2xl font-bold text-yellow-400">
        ₦{(walletData.mainWallet ?? 0).toLocaleString()}
      </p>
      {walletData.bonusWallet > 0 && (
        <p className="text-sm text-green-400 mt-2">
          Bonus: ₦{walletData.bonusWallet.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default WalletCard;
