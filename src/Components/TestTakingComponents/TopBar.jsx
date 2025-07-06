import React, { useState } from 'react';

const TopBar = ({ title, timeLeft, subjects = [], toggleSidebar }) => {
  const [showSubjects, setShowSubjects] = useState(false);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-blue-600 text-white py-3 px-4 flex justify-between items-center shadow-md fixed top-0 z-50 h-[60px]">
      {/* Left: Test Title */}
      <div className="text-sm sm:text-base font-semibold truncate max-w-[40%]">
        {title}
      </div>

      {/* Middle: Subjects (scrollable in desktop, toggle in mobile) */}
      <div className="flex-1 mx-4 overflow-x-auto hidden md:flex gap-3 items-center scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
        <span className="text-xs font-semibold whitespace-nowrap">SUBJECTS:</span>
        {subjects.length > 0 ? (
          subjects.map((subj, i) => (
            <span
              key={i}
              className="text-xs bg-white text-blue-600 px-2 py-0.5 rounded whitespace-nowrap font-medium"
            >
              {subj}
            </span>
          ))
        ) : (
          <span className="text-xs italic text-gray-200">None</span>
        )}
      </div>

      {/* Middle (Mobile only): View Subjects Dropdown */}
      <div className="flex md:hidden items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowSubjects(!showSubjects)}
            className="text-xs bg-white text-blue-600 px-2 py-1 rounded font-medium"
          >
            Subjects
          </button>
          {showSubjects && (
            <div className="absolute right-0 mt-2 bg-white text-gray-800 border shadow-md rounded w-48 z-50">
              <ul className="text-sm p-2 space-y-1 max-h-48 overflow-y-auto">
                {subjects.length > 0 ? (
                  subjects.map((subj, i) => (
                    <li key={i} className="border-b last:border-b-0 py-1">{subj}</li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No Subjects</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Optional: sidebar toggle icon (on mobile only) */}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="text-white border border-white px-2 py-0.5 rounded text-xs"
          >
            Questions
          </button>
        )}
      </div>

      {/* Right: Timer */}
      <div className="text-sm sm:text-base font-mono whitespace-nowrap ml-4">
        ⏱️ {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default TopBar;
