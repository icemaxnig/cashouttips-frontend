import React from "react";

const BuyTipModal = ({ visible, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80 space-y-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">Confirm Unlock</h2>
        <p className="text-sm text-gray-600">
          Unlock this tip for <span className="font-bold text-blue-600">₦100</span>?
        </p>
        <div className="flex justify-around mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyTipModal;