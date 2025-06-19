// 📄 Dashboard.jsx — Patched with Proper Layout + Logo Space
import React from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "./components/StatCard";
import DashboardRolloverWidget from "./components/DashboardRolloverWidget";
import DashboardBookingWidget from "./components/DashboardBookingWidget";
import FreeTipsWrapper from "./components/FreeTipsWrapper";
import TodaysRolloverTips from "./components/TodaysRolloverTips";
import MyPurchasedCodes from "./components/MyPurchasedCodes";
import ReferralCard from "./components/ReferralCard";
import WithdrawBonusCard from "./components/WithdrawBonusCard";
import WalletOverviewCard from "./components/WalletOverviewCard";
import DualStatCard from "./components/DualStatCard";
import { useAuth } from "./context/AuthContext";
import "./Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const rolloverTipsToday = 3;
  const bookingCodesToday = 2;

  if (loading) return null;
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <main className="bg-[#0A0E2C] min-h-screen py-6 px-4 sm:px-6 lg:px-8 font-poppins text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome Back, <span className="text-[#FFD700]">{user?.fullName?.split(" ")[0]}</span> 👋
          </h2>
          <p className="text-sm text-gray-400">Your dashboard is up to date</p>
        </div>

        {/* 🔼 Stats Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <WalletOverviewCard user={user} />
          <StatCard title="Active Rollover Plans" value={`${user?.rolloverPlans?.length || 0} Plans`} />
          <DualStatCard tipsToday={rolloverTipsToday} codesToday={bookingCodesToday} />
          <WithdrawBonusCard user={user} />
        </section>

        {/* 🔹 Widget Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardBookingWidget compact />
          <DashboardRolloverWidget compact />
          <FreeTipsWrapper compact />
        </section>

        {/* 🔻 Lower Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TodaysRolloverTips compact />
          <MyPurchasedCodes compact />
          <ReferralCard compact />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
