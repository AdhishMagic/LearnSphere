import React, { useState } from 'react';
import LessonsList from './LessonsList';
import ReviewsSection from './ReviewsSection';

const CourseOverview = ({ course, reviews, learner, onLessonClick, onCompleteCourse }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Check if all lessons are completed
    const allLessonsCompleted = course.lessons.every(l => l.status === 'completed');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Course Header */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Header Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                            {course.title}
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base mb-4">
                            by {course.instructor} • {course.duration}
                        </p>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden max-w-md">
                                <div
                                    className="h-full bg-green-400 rounded-full transition-all duration-700"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                            <span className="text-white font-medium">{course.progress}% complete</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                        <div className="text-2xl md:text-3xl font-bold text-blue-600">{course.totalLessons}</div>
                        <div className="text-gray-500 text-sm">Total Lessons</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                        <div className="text-2xl md:text-3xl font-bold text-green-600">{course.completedLessons}</div>
                        <div className="text-gray-500 text-sm">Completed</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                        <div className="text-2xl md:text-3xl font-bold text-amber-600">{course.totalLessons - course.completedLessons}</div>
                        <div className="text-gray-500 text-sm">Remaining</div>
                    </div>
                </div>

                {/* Complete Course Button */}
                {allLessonsCompleted && (
                    <div className="mb-8">
                        <button
                            onClick={onCompleteCourse}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Complete This Course
                        </button>
                    </div>
                )}

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`pb-4 font-medium text-sm transition-colors relative ${activeTab === 'overview'
                                    ? 'text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Overview
                            {activeTab === 'overview' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`pb-4 font-medium text-sm transition-colors relative ${activeTab === 'reviews'
                                    ? 'text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Reviews ({reviews.length})
                            {activeTab === 'reviews' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Description */}
                        <div className="lg:col-span-2">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">About This Course</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {course.description}
                            </p>
                        </div>

                        {/* Lessons List */}
                        <div className="lg:col-span-1">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Course Content</h2>
                            <LessonsList
                                lessons={course.lessons}
                                activeLessonId={null}
                                onLessonClick={onLessonClick}
                            />
                        </div>
                    </div>
                ) : (
                    <ReviewsSection
                        reviews={reviews}
                        learner={learner}
                    />
                )}
            </div>
        </div>
    );
};

export default CourseOverview;
