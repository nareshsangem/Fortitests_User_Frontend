import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const ResultPage = () => {
  const overallResult = JSON.parse(localStorage.getItem('overallResult'));
  const subjectWiseReport = JSON.parse(localStorage.getItem('subjectWiseReport'));
  const [hovered, setHovered] = useState(null);

  if (!overallResult || !subjectWiseReport) {
    return <p className="p-4 text-center text-gray-500">No result data found. Please attempt a test first.</p>;
  }

  const pieData = Object.entries(subjectWiseReport).map(([subject, data], idx) => ({
    title: subject,
    value: data.score,
    color: `hsl(${(idx * 70) % 360}, 70%, 50%)`,
  }));

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Test Results</h2>

      <div className="mb-8 text-center space-y-1">
        <p><strong>Score:</strong> {overallResult.overallScore} / {overallResult.totalMarks}</p>
        <p><strong>Correct Answers:</strong> {overallResult.totalCorrect}</p>
        <p><strong>Wrong Answers:</strong> {overallResult.totalWrong}</p>
        <p><strong>Attempted Questions:</strong> {overallResult.attemptedCount}</p>
      </div>

      <h3 className="font-semibold mb-4 text-center">Subject-wise Scores</h3>

      <div className="flex flex-col items-center">
        <PieChart
          data={pieData}
          radius={42}
          lineWidth={25}
          segmentsShift={index => (index === hovered ? 6 : 1)}
          animate
          label={({ dataEntry }) => `${dataEntry.title}`}
          labelPosition={60}
          labelStyle={{
            fontSize: '5px',
            fill: '#333',
            pointerEvents: 'none',
          }}
          onMouseOver={(_, index) => setHovered(index)}
          onMouseOut={() => setHovered(null)}
        />
        {hovered !== null && (
          <div className="mt-4 p-2 rounded bg-gray-100 border border-gray-300 shadow text-center w-48">
            <p className="font-semibold">{pieData[hovered].title}</p>
            <p>Score: {pieData[hovered].value}</p>
            <p style={{ color: pieData[hovered].color }}>●</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
