import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CourseOverview from './components/CourseOverview';
import LessonPlayer from './components/LessonPlayer';
import PointsPopup from './components/PointsPopup';
import CompletionPanel from './components/CompletionPanel';
import { mockCourse, mockReviews, mockLearner } from './mockData';
import { courses as listingCourses } from '../courses-listing/mockData';

const CourseLearningPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const courseMeta = location?.state?.courseMeta;
    const backTarget = location?.state?.from || '/courses';

    const mergedCourse = useMemo(() => {
        const parsedId = Number.parseInt(courseId, 10);
        const fallbackMeta = listingCourses?.find((c) => c?.id === parsedId);
        const resolvedMeta = courseMeta || fallbackMeta;
        const baseCourse = {
            ...mockCourse,
            id: Number.isFinite(parsedId) ? parsedId : mockCourse.id,
        };

        if (!resolvedMeta) return baseCourse;

        return {
            ...baseCourse,
            title: resolvedMeta?.title || baseCourse.title,
            description: resolvedMeta?.description || baseCourse.description,
            coverImage: resolvedMeta?.coverImage || baseCourse.coverImage,
            instructor: resolvedMeta?.instructor || baseCourse.instructor,
        };
    }, [courseId, courseMeta]);

    // State management
    const [currentState, setCurrentState] = useState('detail'); // detail | player | completion
    const [activeLesson, setActiveLesson] = useState(null);
    const [showPointsPopup, setShowPointsPopup] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [totalPointsEarned, setTotalPointsEarned] = useState(0);

    // Course data with local state for progress tracking
    const [course, setCourse] = useState(mergedCourse);

    useEffect(() => {
        setCourse(mergedCourse);
        setCurrentState('detail');
        setActiveLesson(null);
        setShowPointsPopup(false);
        setEarnedPoints(0);
        setTotalPointsEarned(0);
    }, [mergedCourse]);

    // Handle lesson click from Course Overview
    const handleLessonClick = (lesson) => {
        console.log(`[Lesson] Opening: ${lesson.id} - ${lesson.title}`);
        setActiveLesson(lesson);
        setCurrentState('player');

        // Mark lesson as in-progress if not completed
        if (lesson.status !== 'completed') {
            setCourse(prev => ({
                ...prev,
                lessons: prev.lessons.map(l =>
                    l.id === lesson.id ? { ...l, status: 'in-progress' } : l
                )
            }));
        }
    };

    // Handle back to course overview
    const handleBackToCourse = () => {
        console.log('[Navigation] Back to course overview');
        setCurrentState('detail');
        setActiveLesson(null);
    };

    // Handle next lesson
    const handleNextLesson = (nextLesson) => {
        // Mark current lesson as completed
        if (activeLesson && activeLesson.status !== 'completed') {
            setCourse(prev => {
                const updatedLessons = prev.lessons.map(l =>
                    l.id === activeLesson.id ? { ...l, status: 'completed' } : l
                );
                const completedCount = updatedLessons.filter(l => l.status === 'completed').length;
                return {
                    ...prev,
                    lessons: updatedLessons,
                    completedLessons: completedCount,
                    progress: Math.round((completedCount / prev.totalLessons) * 100)
                };
            });
        }

        setActiveLesson(nextLesson);
    };

    // Handle quiz completion
    const handleQuizComplete = (points) => {
        console.log(`[Points] Earned: ${points}`);
        setEarnedPoints(points);
        setTotalPointsEarned(prev => prev + points);
        setShowPointsPopup(true);

        // Mark quiz lesson as completed
        setCourse(prev => {
            const updatedLessons = prev.lessons.map(l =>
                l.id === activeLesson.id ? { ...l, status: 'completed' } : l
            );
            const completedCount = updatedLessons.filter(l => l.status === 'completed').length;
            return {
                ...prev,
                lessons: updatedLessons,
                completedLessons: completedCount,
                progress: Math.round((completedCount / prev.totalLessons) * 100)
            };
        });
    };

    // Handle points popup close
    const handlePointsClose = () => {
        setShowPointsPopup(false);
    };

    // Handle course completion
    const handleCompleteCourse = () => {
        console.log('[Course] Marked complete');
        setCurrentState('completion');
    };

    // Render based on current state
    const renderContent = () => {
        switch (currentState) {
            case 'detail':
                return (
                    <CourseOverview
                        course={course}
                        reviews={mockReviews}
                        learner={mockLearner}
                        onLessonClick={handleLessonClick}
                        onCompleteCourse={handleCompleteCourse}
                    />
                );

            case 'player':
                return (
                    <LessonPlayer
                        course={course}
                        lesson={activeLesson}
                        onBack={handleBackToCourse}
                        onNextLesson={handleNextLesson}
                        onQuizComplete={handleQuizComplete}
                    />
                );

            case 'completion':
                return (
                    <CompletionPanel
                        course={course}
                        totalPointsEarned={totalPointsEarned}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen">
            <div className="fixed top-4 left-4 z-50">
                <button
                    type="button"
                    onClick={() => navigate(backTarget)}
                    className="inline-flex items-center gap-2 bg-white/95 hover:bg-white border border-gray-200 shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Courses
                </button>
            </div>

            {renderContent()}

            {/* Points Popup Overlay */}
            {showPointsPopup && (
                <PointsPopup
                    points={earnedPoints}
                    onClose={handlePointsClose}
                />
            )}
        </div>
    );
};

export default CourseLearningPage;
