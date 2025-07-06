import React from 'react';

const PDFReportButton = ({ attemptId }) => {
  const handleDownloadPdf = () => {
    window.open(`/api/results/attempts/${attemptId}/download-wrong-report`, '_blank');
  };

  return (
    <button
      onClick={handleDownloadPdf}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Download Wrong Answers PDF
    </button>
  );
};

export default PDFReportButton;
