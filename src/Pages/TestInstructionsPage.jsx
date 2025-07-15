// Phase 1: Test Instructions Page
// Route: /take-test/:testId

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import usePageTracker from '../hooks/usePageTracker';
import { useUser } from '../context/UserContext';
const TestInstructionsPage = () => {
  const { user } = useUser()
   usePageTracker({
    userId: user?.id,
    testId: test?.id,
    categoryId: test?.category_id,
  });
  const { testId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [agree, setAgree] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [activeAttempt, setActiveAttempt] = useState(null);
  const [showAttemptModal, setShowAttemptModal] = useState(false);

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

  const renderSubjects = () => {
    try {
      const subjects = typeof test.subjects === 'string'
        ? JSON.parse(test.subjects)
        : test.subjects;
      return Array.isArray(subjects) ? subjects.join(', ') : 'N/A';
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
      navigate(`/take-test/${testId}/start`);
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

  if (!test) return <div className="p-6">Loading test details...</div>;

  return (
    <div className="min-h-screen bg-white p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h1 className="text-2xl font-bold">{test.name}</h1>
        <button onClick={() => setShowCloseModal(true)} className="text-red-600 text-xl">✖</button>
      </div>

      {/* Instructions */}
      <div className="bg-gray-100 p-4 rounded shadow mb-4">
        <h2 className="font-semibold text-lg mb-2">Instructions</h2>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Total Questions: {test.total_questions}</li>
          <li>Total Marks: {test.total_marks}</li>
          <li>Duration: {test.duration_minutes} minutes</li>
          <li>Test Language: {test.language}</li>
          <li>Subjects: {renderSubjects()}</li>
          <li>⚠️ Do not reload or close this tab once the test begins.</li>
        </ul>
      </div>

      {/* Agreement Checkbox */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <span className="text-sm">I agree to the instructions</span>
        </label>
      </div>

      {/* Start Button */}
      <button
        disabled={!agree}
        onClick={handleStartTest}
        className={`px-4 py-2 rounded text-white transition ${
          agree ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Start Test
      </button>

      {/* Close Test Modal */}
      {showCloseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-center mb-4">Are you sure you want to close the test?</p>
            <div className="flex justify-center gap-4">
              <button onClick={confirmClose} className="px-4 py-2 bg-red-600 text-white rounded">
                Close Test
              </button>
              <button onClick={cancelClose} className="px-4 py-2 bg-gray-300 rounded">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Attempt Modal */}
      {showAttemptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
    </div>
  );
};

export default TestInstructionsPage;
