import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer  } from 'recharts';
import api from '../api';
import PDFReportButton from '../Components/PdfReportButton';
import TROPHY_IMAGE from '../assets/champion_img.png'
const COLORS = ['#4ade80', '#ef4444', '#072ac8']; // green, red, yellow
 

const TestResultsPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [testInfo, setTestInfo] = useState(null);
  const [results, setResults] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get(`/attempt/result/${attemptId}`);
        setTestInfo(res.data.test);
        setResults({
          totalScore: res.data.totalScore,
          totalMarks: res.data.totalMarks,
          subjectScores: res.data.subjectScores,
          timeTaken: res.data.timeTaken,
        });
        setQuestions(res.data.answers);
      } catch (err) {
        console.error('Failed to load results', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [attemptId]);

  if (loading) {
    return <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>;
  }

  const formatTime = (timeObj) => {
    if (!timeObj || typeof timeObj !== 'object') return 'N/A';
    const { minutes = 0, seconds = 0 } = timeObj;
    return `${minutes}m ${seconds}s`;
  };

  const totalQuestions = questions.length;
  const correctCount = questions.filter(q => q.is_correct).length;
  const wrongCount = questions.filter(q => q.answered && !q.is_correct).length;
  const unattemptedCount = totalQuestions - (correctCount + wrongCount);

  const overallData = [
    { name: 'Correct', value: correctCount },
    { name: 'Wrong', value: wrongCount },
    { name: 'Unattempted', value: unattemptedCount },
  ];

  return (
    <div className="bg-blue-50 min-h-screen p-6 space-y-6">
      {/* Top Actions */}
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded"
          onClick={() => navigate('/home')}
        >
          Go Home
        </button>
        <PDFReportButton attemptId={attemptId} />
      </div>

      {/* Test Info */}
      <div className="border p-4 rounded bg-blue-600 text-white flex flex-col md:flex-row justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold text-center md:text-left">{testInfo.name} - Results</h1>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 text-sm">
          <div>Total Score: <strong>{results.totalScore} / {results.totalMarks}</strong></div>
          <div>Time Taken: <strong>{formatTime(results.timeTaken)}</strong></div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="border p-4 rounded bg-blue-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Subject-wise Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(results.subjectScores).map(([subject, scoreObj]) => {
            const chartData = [
              { name: 'Correct', value: scoreObj.questionStats.correct },
              { name: 'Wrong', value: scoreObj.questionStats.wrong },
              { name: 'Unattempted', value: scoreObj.questionStats.unattempted },
            ];
            return (
              <div key={subject} className="p-2 bg-blue-100 rounded flex flex-col items-center">
                <h3 className="font-bold text-lg mb-1">{subject.toUpperCase()}</h3>
                <p className="mb-2 text-md  font-semibold">Score: {scoreObj.scored} / {scoreObj.total}</p>
                <PieChart width={180} height={180}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${subject}-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall Performance */}
      <div className="border p-1 rounded bg-blue-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 p-4">Overall Performance</h2>
        <div className="flex flex-col lg:flex-row items-center justify-around gap-8 flex-wrap">

          {/* Pie Chart */}
          <div className="flex justify-center">
            <PieChart width={250} height={320}>
              <Pie
                data={overallData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {overallData.map((entry, index) => (
                  <Cell key={`cell-overall-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Bar Chart */}
          <div className="w-full max-w-md h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Object.entries(results.subjectScores).map(([subject, s]) => ({
                    subject,
                    scored: s.scored,
                    total: s.total,
                  }))}
                  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                >
                  <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="scored" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>


          {/* Stats Summary */}
          <div className="text-lg font-medium text-center lg:text-left space-y-1">
            <div>Total Score: <strong>{results.totalScore} / {results.totalMarks}</strong></div>
            <div>Correct: <strong>{correctCount}</strong></div>
            <div>Wrong: <strong className="text-red-600">{wrongCount}</strong></div>
            <div>Unattempted: <strong>{unattemptedCount}</strong></div>
          </div>

          {/* Trophy Image */}
          <img
            src={TROPHY_IMAGE}
            alt="Trophy"
            className="w-40 h-auto md:w-56"
          />
        </div>
      </div>


      {/* Detailed Review */}
      <div className="border p-4 rounded bg-blue-50 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Detailed Review</h2>
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={q.questionId} className="p-4 bg-blue-100 rounded shadow">
              <div className="mb-2">
                <span className="font-semibold">Q{i + 1}.</span> {q.questionText}
              </div>
              <div className="mb-2">
                Your Answer: <span className={q.is_correct ? 'text-green-600' : 'text-red-600'}>
                  {q.answered ? (Array.isArray(q.selected) ? q.selected.join(', ') : q.selected) : 'Not Answered'}
                </span>
              </div>
              {!q.is_correct && (
                <div className="mb-2">
                  Correct Answer: <span className="text-green-600">
                    {Array.isArray(q.correctAnswers) ? q.correctAnswers.join(', ') : q.correctAnswers}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestResultsPage;
