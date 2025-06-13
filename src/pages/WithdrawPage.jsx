import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import { toast } from "react-toastify";

const WithdrawPage = () => {
  const [form, setForm] = useState({
    amount: "",
    accountName: "",
    bankName: "",
    accountNumber: "",
  });
  const [wallet, setWallet] = useState(0);
  const [loading, setLoading] = useState(false);

  const MIN_WITHDRAW = 1000;

  useEffect(() => {
    api.get("/wallet/balance").then((res) => setWallet(res.data.bonusWallet || 0));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = parseInt(form.amount);
    if (isNaN(value) || value < MIN_WITHDRAW) {
      return toast.error(`Minimum withdrawal is ₦${MIN_WITHDRAW}`);
    }
    if (value > wallet) {
      return toast.error("Insufficient bonus wallet balance");
    }
    if (!form.accountName || !form.bankName || !form.accountNumber) {
      return toast.error("Please fill all bank details");
    }

    setLoading(true);
    try {
      await api.post("/withdraw/request", form);
      toast.success("Withdrawal request submitted");
      setForm({ amount: "", accountName: "", bankName: "", accountNumber: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0E2C] px-4 py-10 text-white">
      <div className="max-w-lg mx-auto bg-[#111436] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Withdraw Earnings</h2>

        <div className="bg-white/10 text-sm text-gray-300 p-4 rounded mb-6">
          <p><strong>Bonus Wallet Balance:</strong> ₦{wallet.toLocaleString()}</p>
          <p className="text-yellow-400 mt-2">Note: Only Bonus Wallet funds are eligible for withdrawal.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Amount (₦)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white text-black outline-none focus:ring-2 ring-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white text-black outline-none focus:ring-2 ring-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Account Name</label>
            <input
              type="text"
              name="accountName"
              value={form.accountName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white text-black outline-none focus:ring-2 ring-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white text-black outline-none focus:ring-2 ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300 transition"
          >
            {loading ? "Submitting..." : "Request Withdrawal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawPage;
