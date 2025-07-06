import React from 'react';

const SidebarNavigator = ({ questions, answers, current, onNavigate }) => {
  const getColor = (qId) => {
    const a = answers[qId];
    if (a?.answered && a?.markedForReview) return 'bg-purple-500 border-green-500';
    if (a?.markedForReview) return 'bg-purple-400';
    if (a?.answered) return 'bg-green-500';
    return 'bg-red-400';
  };

  return (
    <div className="h-full w-30 md:w-50 lg:w-55  bg-white shadow-inner border-l flex flex-col z-30">
      {/* Scrollable Buttons */}
      <div className="flex-grow overflow-scoll p-2">
        <div className="flex flex-wrap gap-2 justify-left ">
          {questions.map((q, i) => (
            <button
              key={q.id}
              className={`w-8 h-8 rounded-full text-white text-xs font-bold ${getColor(q.id)} ${
                current === i ? 'ring-2 ring-black' : ''
              }`}
              onClick={() => onNavigate(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="p-2 border-t text-[10px] space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Answered
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-400 rounded-full inline-block" /> Not Answered
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-purple-400 rounded-full inline-block" /> Marked for Review
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-purple-500 border border-green-500 rounded-full inline-block" /> Answered + Review
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigator;
