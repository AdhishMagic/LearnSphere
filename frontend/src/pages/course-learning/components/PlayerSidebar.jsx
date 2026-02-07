import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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
            {/* Mobile Overlay */}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
                    onClick={onToggle}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed left-0 top-0 h-full bg-card border-r border-border z-40 
                    transition-all duration-300 ease-out
                    ${isCollapsed
                        ? 'w-0 -translate-x-full opacity-0'
                        : 'w-[85vw] sm:w-80 translate-x-0 opacity-100'
                    }
                `}
            >
                <div className="h-full flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="p-4 sm:p-5 border-b border-border/50 bg-gradient-to-br from-primary via-primary to-blue-700">
                        <div className="flex items-start justify-between gap-2">
                            <h2 className="font-bold text-primary-foreground text-sm sm:text-base leading-snug line-clamp-2">
                                {course.title}
                            </h2>
                            {/* Close button on mobile */}
                            <button
                                onClick={onToggle}
                                className="lg:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"
                                aria-label="Close sidebar"
                            >
                                <X size={16} className="text-primary-foreground" />
                            </button>
                        </div>

                        {/* Progress bar */}
                        <div className="flex items-center gap-2 mt-3">
                            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                            <span className="text-primary-foreground text-xs sm:text-sm font-semibold tabular-nums">
                                {course.progress}%
                            </span>
                        </div>

                        {/* Progress text */}
                        <p className="text-primary-foreground/70 text-xs mt-2">
                            {course.completedLessons || 0} of {course.totalLessons || course.lessons?.length} lessons
                        </p>
                    </div>

                    {/* Lessons List */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
                            Course Content
                        </p>
                        <div className="space-y-1.5">
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

            {/* Toggle Button - Desktop */}
            <button
                onClick={onToggle}
                className={`
                    hidden lg:flex fixed top-1/2 -translate-y-1/2 z-50 
                    bg-card shadow-lg rounded-r-lg p-2 border border-border border-l-0
                    transition-all duration-300 ease-out
                    hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    ${isCollapsed ? 'left-0' : 'left-80'}
                `}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!isCollapsed}
            >
                {isCollapsed ? (
                    <ChevronRight size={18} className="text-muted-foreground" />
                ) : (
                    <ChevronLeft size={18} className="text-muted-foreground" />
                )}
            </button>

            {/* Toggle Button - Mobile (when collapsed) */}
            {isCollapsed && (
                <button
                    onClick={onToggle}
                    className="lg:hidden fixed top-4 left-4 z-50 bg-card shadow-lg rounded-lg p-2.5 border border-border hover:bg-muted transition-colors"
                    aria-label="Open course menu"
                >
                    <ChevronRight size={20} className="text-foreground" />
                </button>
            )}
        </>
    );
};

export default PlayerSidebar;
