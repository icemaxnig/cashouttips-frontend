// ✅ PlanBadge.jsx
import React from "react";

const PlanBadge = ({ odds }) => {
  const label =
    odds === "1.5" ? "🥇 1.5 Odds" :
    odds === "2.0" ? "⚡ 2.0 Odds" :
    "🔥 3.0 Odds";

  const style =
    odds === "1.5" ? "bg-yellow-500 text-black" :
    odds === "2.0" ? "bg-blue-500" :
    "bg-red-500";

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-bold ${style}`}>
      {label}
    </span>
  );
};

export default PlanBadge;


