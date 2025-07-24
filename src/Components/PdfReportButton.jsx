import React from 'react';

const PDFReportButton = ({ attemptId }) => {
  const handleDownloadPdf = () => {
    const downloadUrl = `/pdf/attempts/${attemptId}/download-wrong-unanswered-report`;

    const newWindow = window.open(downloadUrl, '_blank');

    if (!newWindow) {
      alert('Popup blocked! Please allow popups for this site to download the PDF.');
    }
  };

  return (
    <button
      onClick={handleDownloadPdf}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
    >
      Download Mistakes & Unanswered Report
    </button>
  );
};

export default PDFReportButton;
