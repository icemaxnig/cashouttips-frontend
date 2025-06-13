// 📄 Deposit.jsx (auto-fill amount from query param)
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Deposit = () => {
  const [searchParams] = useSearchParams();
  const initialAmount = searchParams.get("amount") || "";
  const [amount, setAmount] = useState(initialAmount);

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

  const handleDeposit = () => {
    alert(`Proceeding to deposit ₦${amount}`);
    // Add deposit logic here
  };

  return (
    <div className="p-6 bg-[#0A0E2C] text-white min-h-screen">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">
        💰 Fund Your Wallet
      </h1>

      <p className="text-sm text-gray-300 mb-4">
        Enter the amount you wish to deposit below:
      </p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="text-black p-3 rounded mb-4 w-full max-w-sm"
      />

      <button
        onClick={handleDeposit}
        className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold"
      >
        Deposit ₦{amount || "..."}
      </button>
    </div>
  );
};

export default Deposit;
