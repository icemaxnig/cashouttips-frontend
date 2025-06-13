import React from "react";
import { BarChart2, Lightbulb, Users, Send } from "lucide-react";
import { useStats } from "../hooks/useStats";

const StatsSummary = () => {
  const { plans, tipsToday, usersSubscribed, telegramLink, loading } = useStats();

  if (loading) return <p className="text-white">Loading stats...</p>;

  const items = [
    { icon: BarChart2, label: "Plans Available", value: plans },
    { icon: Lightbulb, label: "Tips Today", value: tipsToday },
    { icon: Users, label: "Users Subscribed", value: usersSubscribed },
    {
      icon: Send,
      label: "Telegram Tips",
      value: "Join",
      link: telegramLink
    }
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(({ icon: Icon, label, value, link }) => (
        <div
          key={label}
          className="bg-white/10 rounded-xl p-4 text-center shadow text-white space-y-2"
        >
          <Icon className="mx-auto w-5 h-5 text-yellow-400" />
          <h4 className="text-sm font-bold">{label}</h4>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 font-semibold hover:underline"
            >
              {value}
            </a>
          ) : (
            <p className="text-lg font-extrabold">{value}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default StatsSummary;
