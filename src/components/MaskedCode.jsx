// 📄 MaskedCode.jsx
import React from "react";

const MaskedCode = ({ code, isLocked }) => {
  if (!code) return null;

  const visible = code.substring(0, 3);
  const masked = code.substring(3);

  return (
    <span className="font-mono text-gray-800">
      {visible}
      {isLocked ? (
        <span className="blur-sm select-none text-gray-400">
          {masked}
        </span>
      ) : (
        masked
      )}
    </span>
  );
};

export default MaskedCode;
