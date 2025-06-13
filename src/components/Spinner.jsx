// src/components/Spinner.jsx
import React from "react";

const Spinner = ({ text }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0E2C] text-yellow-400">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent"></div>
    {text && <p className="mt-4 text-lg font-semibold">{text}</p>}
  </div>
);

export default Spinner;
