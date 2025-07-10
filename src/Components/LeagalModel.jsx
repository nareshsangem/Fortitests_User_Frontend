import React from 'react';

const LegalModal = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white font-sans max-w-2xl w-full p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">{title}</h2>

        {/* ✅ This fixes the formatting */}
        <pre className="text-gray-700 text-sm whitespace-pre-wrap">{content}</pre>
      </div>
    </div>
  );
};

export default LegalModal;
