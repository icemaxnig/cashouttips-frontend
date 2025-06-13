import React from "react";

const TelegramLinkStatus = ({ telegramId, connectCode }) => {
  if (telegramId) {
    return (
      <div className="p-4 bg-green-100 border border-green-400 rounded mb-4 text-green-800">
        ✅ Your Telegram is linked! You’ll receive tips via the bot.
      </div>
    );
  }

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded mb-4 text-yellow-800">
      <h3 className="font-bold text-lg mb-2">📲 Link Your Telegram</h3>
      <p>
        To receive tips and alerts via our Telegram bot, send the command below to{" "}
        <a
          href="https://t.me/cashouttips_ai"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          @cashouttips_ai
        </a>
        :
      </p>
      <div className="bg-white border rounded px-3 py-2 mt-2 text-black font-mono text-sm inline-block">
        /connect {connectCode || "LINK-XXXX"}
      </div>
      <div className="mt-2 text-sm text-gray-600">Once linked, you’ll get automatic updates.</div>
    </div>
  );
};

export default TelegramLinkStatus;
