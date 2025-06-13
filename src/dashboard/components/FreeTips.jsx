import React from "react";
import { useTips } from "../hooks/useTips";
import { SendHorizontal } from "lucide-react";

const FreeTips = () => {
  const { tips, loading } = useTips("free");

  const telegramURL = "https://t.me/cashouttips_ai";

  if (loading) return <p className="text-white">Loading free tips...</p>;

  return (
    <section className="bg-white/10 p-4 rounded-xl shadow text-white border border-indigo-500 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-indigo-300">📣 Free Telegram Tips</h3>
        <a
          href={telegramURL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-indigo-200 hover:underline text-sm"
        >
          <SendHorizontal className="w-4 h-4" />
          Join Telegram
        </a>
      </div>

      {tips.length ? (
        <div className="space-y-3">
          {tips.map((tip, idx) => (
            <div key={idx} className="p-3 border border-indigo-400 rounded-md">
              <p><strong>Game:</strong> {tip.game}</p>
              <p><strong>Posted:</strong> {new Date(tip.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span className="text-yellow-400">{tip.status}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/70">No free tips available. Check back later.</p>
      )}

      <p className="text-xs text-white/60">
        Want access to guaranteed rollover plans? Subscribe to one below!
      </p>
    </section>
  );
};

export default FreeTips;
