import React from 'react';
import LessonItem from './LessonItem';

const PlayerSidebar = ({
    course,
    activeLessonId,
    onLessonClick,
    isCollapsed,
    onToggle
}) => {
    return (
        <>
            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ${isCollapsed ? 'w-0 -translate-x-full' : 'w-80'
                }`}>
                <div className="h-full flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
                        <h2 className="font-bold text-white truncate mb-2">
                            {course.title}
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-500"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                            <span className="text-white text-sm font-medium">
                                {course.progress}%
                            </span>
                        </div>
                    </div>

                    {/* Lessons List */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                            Course Content
                        </p>
                        <div className="space-y-2">
                            {course.lessons.map((lesson) => (
                                <LessonItem
                                    key={lesson.id}
                                    lesson={lesson}
                                    isActive={activeLessonId === lesson.id}
                                    onClick={onLessonClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={onToggle}
                className={`fixed top-4 z-50 bg-white shadow-lg rounded-r-lg p-2 border border-gray-200 transition-all duration-300 ${isCollapsed ? 'left-0' : 'left-80'
                    }`}
            >
                <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Overlay for mobile */}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 lg:hidden"
                    onClick={onToggle}
                />
            )}
        </>
    );
};

export default PlayerSidebar;
