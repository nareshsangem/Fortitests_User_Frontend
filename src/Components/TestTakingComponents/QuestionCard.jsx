import React, { useRef } from 'react';

const QuestionCard = ({ question, answer = {}, index, setAnswer, isMarked, onMark }) => {
  const inputRef = useRef(null);

  const handleSingleSelect = (opt) => {
    setAnswer({
      selected: [opt],
      answered: true,
      markedForReview: isMarked || false,
    });
  };

  const handleMultiSelect = (opt) => {
    const selected = answer.selected || [];
    const newSelected = selected.includes(opt)
      ? selected.filter((o) => o !== opt)
      : [...selected, opt];

    setAnswer({
      selected: newSelected,
      answered: newSelected.length > 0,
      markedForReview: isMarked || false,
    });
  };

  const handleBlurFill = () => {
    const val = inputRef.current.value.trim();
    setAnswer({
      selected: [val],
      answered: !!val,
      markedForReview: isMarked || false,
    });
  };

  return (
    <div className="mb-6 p-4 bg-white rounded shadow border">
      {/* Question Title */}
      <h3 className="font-semibold text-gray-800 mb-2">
        Q{index + 1}. {question.question}
      </h3>

      {/* Image if exists */}
      {question.image && (
        <img
          src={question.image}
          alt="question-img"
          className="mb-4 max-h-64 object-contain rounded"
        />
      )}

      {/* Options Rendering */}
      <div className="space-y-2">
        {question.type === 'single' &&
          question.options.map((opt, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={`q-${question.id}`}
                className="mr-2"
                checked={answer.selected?.[0] === opt}
                onChange={() => handleSingleSelect(opt)}
              />
              {opt}
            </label>
          ))}

        {question.type === 'multiple' &&
          question.options.map((opt, i) => (
            <label key={i} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={answer.selected?.includes(opt)}
                onChange={() => handleMultiSelect(opt)}
              />
              {opt}
            </label>
          ))}

        {question.type === 'fill' && (
          
          <input
          type="text"
          ref={inputRef}
          value={answer.selected?.[0] || ''}
          onBlur={handleBlurFill}
          onChange={(e) =>
            setAnswer({
              selected: [e.target.value],
              answered: !!e.target.value.trim(),
              markedForReview: isMarked || false,
            })
          }
          placeholder="Type your answer here..."
          className="w-full mt-2 px-3 py-2 border rounded"
        />

        )}
      </div>

      {/* Mark for Review Button */}
      <div className="mt-4">
        <button
          onClick={onMark}
          className={`px-3 py-1 rounded text-sm font-medium border transition ${
            isMarked
              ? 'bg-purple-600 text-white border-purple-600'
              : 'text-purple-600 border-purple-600 hover:bg-purple-50'
          }`}
        >
          {isMarked ? 'Unmark Review' : 'Mark for Review'}
        </button>
      </div>

      {/* Optional Marks Display */}
      <div className="mt-3 text-xs text-gray-500">
        +{question.positive_marks} mark{question.positive_marks !== 1 ? 's' : ''} | 
        -{question.negative_marks} negative
      </div>
    </div>
  );
};

export default QuestionCard;
