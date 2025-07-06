import React from "react";

export default function ClosePopup({ onContinue, onCloseTest }) {
  return (
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border rounded-lg p-6 z-50">
      <p className="text-gray-800 mb-4 text-center font-medium">Are you sure you want to close the test?</p>
      <div className="flex justify-around">
        <button onClick={onContinue} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Continue Test
        </button>
        <button onClick={onCloseTest} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Close Test
        </button>
      </div>
    </div>
  );
}
