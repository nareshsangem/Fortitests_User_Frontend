import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import usePageTracker from '../hooks/usePageTracker';
import { useUser } from '../context/UserContext';

const TestInstructionsPage = () => {
  const { user } = useUser();
  const { testId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [agree, setAgree] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [activeAttempt, setActiveAttempt] = useState(null);
  const [showAttemptModal, setShowAttemptModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showCountdownModal, setShowCountdownModal] = useState(false);

  usePageTracker({ userId: user?.id });

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableRightClick);
    return () => document.removeEventListener('contextmenu', disableRightClick);
  }, []);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await api.get(`/attempt/tests/${testId}`);
        setTest(res.data);
      } catch (err) {
        console.error('Failed to fetch test details:', err);
      }
    };
    fetchTest();
  }, [testId]);

  useEffect(() => {
    if (!showCountdownModal) return;
    if (countdown === 0) {
      navigate(`/take-test/${testId}/start`);
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, showCountdownModal, navigate, testId]);

  const renderSubjects = () => {
    try {
      const subjects = typeof test.subjects === 'string'
        ? JSON.parse(test.subjects)
        : test.subjects;
      return Array.isArray(subjects) ? subjects.join(', ').toUpperCase() : 'N/A';
    } catch (err) {
      console.error('Error parsing subjects:', err);
      return 'N/A';
    }
  };

  const handleStartTest = async () => {
    try {
      const res = await api.get(`/attempt/activeAttempt/${testId}`);
      const attempt = res.data?.attempt;
      if (attempt && attempt.status === 'in_progress') {
        setActiveAttempt(attempt);
        setShowAttemptModal(true);
      } else {
        startNewAttempt();
      }
    } catch (err) {
      console.error('Failed to check active attempt:', err);
    }
  };

  const startNewAttempt = async () => {
    try {
      const res = await api.post('/attempt/startTest', { test_id: testId });
      localStorage.setItem('attemptId', res.data.attempt.id);
      setCountdown(5);
      setShowCountdownModal(true); // Begin countdown
    } catch (err) {
      console.error('Failed to start new attempt:', err);
    }
  };

  const continueAttempt = () => {
    localStorage.setItem('attemptId', activeAttempt.id);
    navigate(`/take-test/${testId}/start`);
  };

  const confirmClose = () => navigate('/test-closed');
  const cancelClose = () => setShowCloseModal(false);

  if (!test) return <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>;

  return (
    <div className="min-h-screen bg-blue-100 p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="bg-blue-50 px-4 py-2 rounded text-lg font-semibold text-blue-700 border border-blue-200">
          Test Name: {test.name}
        </div>
        <button onClick={() => setShowCloseModal(true)} className="text-red-600 text-xl">✖</button>
      </div>

      {/* Instructions Table */}
      <div className="bg-gray-50 p-6 rounded shadow mb-6 border">
        <h2 className="font-semibold text-lg mb-4 text-blue-700">Test Instructions</h2>
        <table className="w-full text-sm text-left border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium w-1/3">Total Questions</td>
              <td className="py-2">{test.total_questions}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Total Marks</td>
              <td className="py-2">{test.total_marks}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Duration</td>
              <td className="py-2">{test.duration_minutes} minutes</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Language</td>
              <td className="py-2">{test.language.toUpperCase()}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Subjects</td>
              <td className="py-2">{renderSubjects()}</td>
            </tr>
          </tbody>
        </table>

        <ul className="mt-6 list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Do not reload or close this tab once the test begins.</li>
          <li>Ensure a stable internet connection before starting.</li>
          <li>No switching between tabs/windows allowed.</li>
          <li>Once submitted, answers cannot be changed.</li>
          <li>Timer will auto-submit your test on completion.</li>
        </ul>
      </div>

      {/* Agreement & Start Test */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-left gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <span className="text-sm">I agree to the instructions</span>
        </label>
        <button
          disabled={!agree}
          onClick={handleStartTest}
          className={`px-6 py-2 rounded text-white font-medium transition ${
            agree ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Start Test
        </button>
      </div>

      {/* Close Test Modal */}
      {showCloseModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-auto">
      <p className="text-center mb-4">Are you sure you want to close the test?</p>
      <div className="flex justify-center gap-4">
        <button onClick={confirmClose} className="px-4 py-2 bg-red-600 text-white rounded">
          Close Test
        </button>
        <button onClick={cancelClose} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      {/* Resume Attempt Modal */}
      {showAttemptModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
            <p className="text-lg font-semibold text-center">You have an active test attempt.</p>
            <p className="text-sm text-gray-600 text-center mt-2">
              Would you like to continue it or start a new attempt?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={continueAttempt}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Continue Attempt
              </button>
              <button
                onClick={() => {
                  setShowAttemptModal(false);
                  startNewAttempt();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Start New Attempt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Countdown Modal */}
      {showCountdownModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Get Ready!</h2>
            <p className="text-sm text-gray-600 mb-4">Your test will begin in...</p>
            <div className="text-5xl font-bold text-blue-600 animate-pulse">{countdown}</div>
            <p className="mt-4 text-sm text-gray-500">Please stay on this screen.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestInstructionsPage;
