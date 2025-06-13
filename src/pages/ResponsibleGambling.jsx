import React from 'react';

function ResponsibleGambling() {
  return (
    <div className="max-w-3xl mx-auto p-4 text-sm leading-relaxed">
      <h1 className="text-xl font-semibold mb-4">Responsible Gambling</h1>
      <p>
        Betting should always be approached as a form of entertainment, not a financial plan. If you're no longer enjoying betting or feel out of control, please stop and seek help.
      </p>
      <p className="mt-2">
        Tips for gambling responsibly:
      </p>
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Only bet what you can afford to lose</li>
        <li>Set a budget and stick to it</li>
        <li>Don’t chase losses</li>
        <li>Take breaks regularly</li>
        <li>Never borrow money to bet</li>
      </ul>
      <p className="mt-4">
        If you or someone you know needs help, contact: <br />
        <strong>BeGambleAware (UK):</strong> <a href="https://www.begambleaware.org" className="text-blue-600 underline" target="_blank" rel="noreferrer">begambleaware.org</a><br />
        <strong>Nigeria National Gaming Board:</strong> 0800-GAMBLE-HELP (placeholder) <br />
        Or email <a href="mailto:cashout@cashouttips.com" className="text-blue-600 underline">cashout@cashouttips.com</a>
      </p>
    </div>
  );
}

export default ResponsibleGambling;
