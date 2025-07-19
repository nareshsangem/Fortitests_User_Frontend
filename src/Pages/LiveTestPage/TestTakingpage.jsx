import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../../Components/TestTakingComponents/QuestionCard';
import SidebarNavigator from '../../Components/TestTakingComponents/SidebarNavigator';
import TopBar from '../../Components/TestTakingComponents/TopBar';
import api from '../../api';

const TestTakingPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [timeLeft, setTimeLeft] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const attemptId = localStorage.getItem('attemptId');

  useEffect(() => {
    const preventUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    const preventBack = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('beforeunload', preventUnload);
    window.addEventListener('popstate', preventBack);
    window.history.pushState(null, '', window.location.href);
    return () => {
      window.removeEventListener('beforeunload', preventUnload);
      window.removeEventListener('popstate', preventBack);
    };
  }, []);

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableRightClick);
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  useEffect(() => {
    if (!attemptId) {
      navigate(`/take-test/${testId}/instructions`);
      return;
    }
    const fetchData = async () => {
      try {
        const res = await api.get(`/attempt/testAttempt/${attemptId}`);
        setQuestions(res.data.questions || []);
        setTest(res.data.test || null);
        setTimeLeft(res.data.test.duration_minutes * 60);
      } catch (err) {
        console.error('Failed to load test data:', err);
      }
    };
    fetchData();
  }, [attemptId, testId, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  if (timeLeft === 0) {
    
    setShowSubmitModal(true);
  }
}, [timeLeft, test]);


  const handleAnswer = async (questionId, value, onBlur = false) => {
    const updated = {
      selected: value.selected || [],
      answered: value.answered || false,
      markedForReview: marked[questionId] || false,
    };
    setAnswers((prev) => ({ ...prev, [questionId]: updated }));
    if (onBlur || value?.answered !== undefined)  {
      try {
        await api.post(`/attempt/saveAnswer/${attemptId}`, {
          question_id: questionId,
          answers: updated.selected,
          marked_for_review: updated.markedForReview,
        });
      } catch (err) {
        console.error('Save error:', err);
      }
    }
  };

  const handleMark = async (questionId) => {
    const newMarked = !marked[questionId];
    setMarked((prev) => ({ ...prev, [questionId]: newMarked }));
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        markedForReview: newMarked,
      },
    }));
    try {
      await api.post(`/attempt/saveAnswer/${attemptId}`, {
        question_id: questionId,
        answers: answers[questionId]?.selected || [],
        marked_for_review: newMarked,
      });
    } catch (err) {
      console.error('Mark for review update error:', err);
    }
  };

  const clearAnswer = async (questionId) => {
  setAnswers((prev) => ({
    ...prev,
    [questionId]: {
      selected: [],
      answered: false,
      markedForReview: marked[questionId] || false,
      clear: true, // optional
    },
  }));

  try {
    await api.post(`/attempt/clearAnswer/${attemptId}`, {
      attempt_id: attemptId,
      question_id: questionId,
    });
  } catch (err) {
    console.error('Clear answer failed:', err);
  }
};

  const handleSubmit = async () => {
    if (hasSubmitted) return;
    setHasSubmitted(true);
    try {
      await api.post(`/attempt/submitTest/${attemptId}`);
      localStorage.removeItem('attemptId');
      
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const totalQuestions = questions.length;
  const answered = Object.values(answers).filter(a => a?.answered).length;
  const answeredAndMarked = Object.values(answers).filter(a => a?.answered && a?.markedForReview).length;
  const markedOnly = Object.values(answers).filter(a => !a?.answered && a?.markedForReview).length;
  const notAnswered = totalQuestions - answered;

  return (
    <div className="flex flex-col h-screen">

  {/* Fixed TopBar */}
  <div className="h-[60px] shrink-0 z-30">
    <TopBar
      title={test?.name || 'Test'}
      subjects={test?.subjects || []}
      timeLeft={timeLeft}
      subjectOpen={subjectOpen}
      setSubjectOpen={setSubjectOpen}
      toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
    />
  </div>

  {/* Main body: scrollable question area + fixed sidebar */}
  <div className="flex flex-1 overflow-hidden relative">

    {/* Scrollable Question Area */}
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {questions.map((q, i) => (
        <div key={q.id} id={`question-${i}`}>
          <QuestionCard
              key={q.id}
              question={q}
              index={i}
              answer={answers[q.id]}
              setAnswer={(ans) => handleAnswer(q.id, ans)}
              isMarked={marked[q.id]}
              onMark={() => handleMark(q.id)}
              onClear={() => clearAnswer(q.id)} // ✅ this line adds clear functionality
            />

        </div>
      ))}
    </div>

    {/* Sidebar - visible on md and up */}
    <div className="hidden md:flex w-30 md:w-50 lg:w-55 border-l border-gray-300 bg-white z-20 ">
      <SidebarNavigator
        questions={questions}
        answers={answers}
        marked={marked}
        current={currentQuestion}
        onNavigate={(i) => {
          const el = document.getElementById(`question-${i}`);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          setCurrentQuestion(i);
        }}
      />
    </div>
  </div>

  {/* Fixed BottomBar */}
  <div className="h-[64px] shrink-0 bg-blue-600 flex justify-center items-center gap-6 z-50">
    <button
      className="px-3 py-1 sm:px-6 sm:py-2 bg-white text-blue-600 text-xs sm:text-sm font-semibold rounded hover:bg-gray-100 border border-blue-600"
      onClick={() => setShowSubmitModal(true)}
    >
      Submit Test
    </button>
    {timeLeft > 0 && (
      <button
        className="px-3 py-1 sm:px-6 sm:py-2 bg-white text-red-600 text-xs sm:text-sm font-semibold rounded hover:bg-red-100 border border-red-600"
        onClick={() => setShowEndModal(true)}
      >
        End Test
      </button>
    )}
    <button
      className="px-3 py-1 sm:px-6 sm:py-2 bg-red-500 text-white text-xs sm:text-sm font-semibold rounded hover:bg-red-600 border border-red-500"
      onClick={() => setShowQuitModal(true)}
    >
      Quit Test
    </button>
  </div>

  {/* Mobile Sidebar */}
 {sidebarOpen && (
  <div className="block md:hidden fixed top-[60px] bottom-[64px] left-0 right-0 z-50 bg-transparent">
    <div className="absolute right-0 top-0 h-full w-30 bg-white shadow-lg">
      <SidebarNavigator
        questions={questions}
        answers={answers}
        marked={marked}
        current={currentQuestion}
        onNavigate={(i) => {
          const el = document.getElementById(`question-${i}`);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          setCurrentQuestion(i);
          setSidebarOpen(false);
        }}
      />
    </div>
  </div>
)}

  {/* Modals */}
  {showSubmitModal && (
    <div className="fixed inset-0 bg-black/30 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Submit Your Test?</h2>
        <div className="text-gray-700 mb-4 text-sm space-y-1 text-left">
          <p><strong>Total Questions:</strong> {totalQuestions}</p>
          <p><strong>Total Answered:</strong> {answered}</p>
          <p><strong>Answered + Marked for Review:</strong> {answeredAndMarked}</p>
          <p><strong>Marked for Review and (Unanswered):</strong> {markedOnly}</p>
          <p><strong>Total Not Answered :</strong> {notAnswered}</p>
        </div>
        <button
            onClick={async () => {
  setShowSubmitModal(false);
  setShowThankYou(true); // ✅ Show thank you modal

  await handleSubmit(); // Save attempt

  // ⏱ Start countdown from 5
  setCountdown(5);
  const interval = setInterval(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        navigate(`/test-results/${attemptId}`);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
}}

            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
          >
            Proceed to Results
          </button>
      </div>
    </div>
  )}

  {showEndModal && (
    <div className="fixed inset-0 bg-black/30 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm End Test</h2>
        <p className="text-gray-700 text-sm mb-3">
          ⚠️ Once you confirm, <strong>you cannot return</strong> to the test. Make sure you've reviewed your answers.
        </p>
        <p className="text-gray-600 text-xs mb-5">
          Your progress will be locked and you'll proceed to the summary screen.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setShowEndModal(false);
              setShowSubmitModal(true);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
          >
            Yes, End Test
          </button>
          <button
            onClick={() => setShowEndModal(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}

  {showQuitModal && (
    <div className="fixed inset-0 bg-black/30 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Quit Test?</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to quit? Your attempt will be discarded and you will be returned to the homepage.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => {
              setShowQuitModal(false);
              navigate('/home');
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
          >
            Yes, Quit
          </button>
          <button
            onClick={() => setShowQuitModal(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
  {showThankYou && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-[90%] text-center space-y-4 animate-fade-in">
      <div className="text-4xl">🎉</div>
      <h2 className="text-2xl font-bold text-green-600">Thank You!</h2>
      <p className="text-sm text-gray-700">You have successfully completed your test.</p>
      <p className="text-base text-blue-600 font-semibold">Redirecting to your results in {countdown} seconds...</p>
      <div className="text-xl animate-pulse">🧠 All the Best!</div>
    </div>
  </div>
)}

</div>

  );
};

export default TestTakingPage;
