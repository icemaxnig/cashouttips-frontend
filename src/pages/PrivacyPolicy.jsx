import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-4 text-sm leading-relaxed">
      <h1 className="text-xl font-semibold mb-4">Privacy Policy</h1>
      <p>
        This platform collects minimal personal information solely for account management.
        We do not sell or share your data with third parties. All payment transactions are
        securely handled through third-party gateways like Paystack.
      </p>
      <p className="mt-2">
        Your login details (e.g., Telegram ID, Google ID) are used only for identifying your
        account. All referral and wallet data is stored securely.
      </p>
      <p className="mt-2">
        For concerns, email <a href="mailto:cashout@cashouttips.com" className="text-blue-600 underline">cashout@cashouttips.com</a>
      </p>
    </div>
  );
}

export default PrivacyPolicy;
