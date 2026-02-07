import React, { useState } from 'react';

const QuizQuestion = ({ question, questionNumber, totalQuestions, onAnswer, isLast }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleProceed = () => {
        if (selectedOption === null) return;

        console.log(`[Quiz] Answer selected: Q${questionNumber} - Option ${selectedOption}`);
        onAnswer(selectedOption);
        setSelectedOption(null); // Reset for next question
    };

    return (
        <div className="flex items-center justify-center min-h-[500px] p-8">
            <div className="max-w-2xl w-full">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>Question {questionNumber} of {totalQuestions}</span>
                        <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        {question.question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOption(index)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${selectedOption === index
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedOption === index
                                            ? 'border-purple-500 bg-purple-500'
                                            : 'border-gray-300'
                                        }`}>
                                        {selectedOption === index && (
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                    </div>
                                    <span className={`font-medium ${selectedOption === index ? 'text-purple-700' : 'text-gray-700'
                                        }`}>
                                        {option}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Proceed Button */}
                    <button
                        onClick={handleProceed}
                        disabled={selectedOption === null}
                        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${selectedOption !== null
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isLast ? 'Complete Quiz' : 'Proceed'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizQuestion;
