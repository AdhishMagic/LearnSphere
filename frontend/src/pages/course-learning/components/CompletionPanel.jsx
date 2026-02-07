import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompletionPanel = ({ course, totalPointsEarned }) => {
    const navigate = useNavigate();

    const handleBackToMyCourses = () => {
        console.log('[Course] Returning to My Courses');
        navigate('/my-courses');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-8">
            <div className="max-w-lg w-full text-center">
                {/* Celebration Animation */}
                <div className="mb-8 relative">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                        <span className="text-6xl">🎉</span>
                    </div>
                    {/* Confetti */}
                    <span className="absolute top-0 left-1/4 text-3xl animate-bounce">🎊</span>
                    <span className="absolute top-4 right-1/4 text-2xl animate-pulse">🌟</span>
                    <span className="absolute bottom-2 left-1/3 text-2xl animate-ping">✨</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Course Completed!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Congratulations! You've successfully completed
                </p>

                {/* Course Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {course.title}
                    </h2>
                    <p className="text-gray-500">by {course.instructor}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-3xl font-bold text-green-600">{course.totalLessons}</div>
                        <div className="text-sm text-gray-500">Lessons Completed</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-3xl font-bold text-amber-500">+{totalPointsEarned}</div>
                        <div className="text-sm text-gray-500">Points Earned</div>
                    </div>
                </div>

                {/* Certificate Notice */}
                <div className="flex items-center justify-center gap-2 text-green-600 mb-8">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Certificate of completion unlocked!</span>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleBackToMyCourses}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                    Back to My Courses
                </button>
            </div>
        </div>
    );
};

export default CompletionPanel;
