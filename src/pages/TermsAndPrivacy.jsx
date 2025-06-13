import React from "react";

const TermsAndPrivacy = ({ title, content }) => {
  return (
    <div className="min-h-screen bg-[#0A0E2C] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">{title}</h1>
        <div className="bg-white/10 p-6 rounded-xl space-y-4 text-sm text-gray-200 whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
