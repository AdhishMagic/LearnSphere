import React from 'react';

const QuizIntro = ({ quiz, lesson, onStart }) => {
    return (
        <div className="flex items-center justify-center min-h-[500px] p-8">
            <div className="max-w-lg w-full text-center">
                {/* Icon */}
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                        <span className="text-4xl">📝</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {quiz.title || lesson.title}
                </h2>
                <p className="text-gray-600 mb-8">
                    {lesson.description}
                </p>

                {/* Quiz Info */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">
                                {quiz.questions.length}
                            </div>
                            <div className="text-sm text-gray-500">Questions</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                                +{quiz.pointsReward}
                            </div>
                            <div className="text-sm text-gray-500">Points</div>
                        </div>
                    </div>
                </div>

                {/* Notice */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Multiple attempts allowed. Take your time!
                </div>

                {/* Start Button */}
                <button
                    onClick={onStart}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizIntro;
