import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyState = () => {
    const navigate = useNavigate();

    const handleExploreCourses = () => {
        console.log('[Explore] Navigating to courses listing');
        navigate('/courses');
    };

    return (
        <div className="text-center py-16 px-4">
            {/* Illustration */}
            <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
                    <span className="text-5xl">📚</span>
                </div>
            </div>

            {/* Message */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No courses yet?
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start your learning journey today! Explore our catalog of courses and find something that sparks your curiosity.
            </p>

            {/* CTA Button */}
            <button
                onClick={handleExploreCourses}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore Courses
            </button>

            {/* Motivational text */}
            <p className="mt-6 text-sm text-gray-400">
                🚀 Start learning and earn badges along the way!
            </p>
        </div>
    );
};

export default EmptyState;
