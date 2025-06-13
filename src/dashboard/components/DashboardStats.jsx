import React from "react";
import StatCard from "./StatCard";
import { Link } from "react-router-dom";

const DashboardStats = ({ user }) => (
  <>
    <StatCard title="Active Plans" value={user.rolloverSubscriptions?.length || 0} icon="🎯" />
    <StatCard title="Referrals" value={user.referrals?.length || 0} icon="👥" />
    <Link to="/wallet" className="bg-yellow-400 text-black p-4 rounded-xl font-bold flex justify-center items-center hover:bg-yellow-500 transition">
      💰 Deposit Now
    </Link>
  </>
);

export default DashboardStats;
