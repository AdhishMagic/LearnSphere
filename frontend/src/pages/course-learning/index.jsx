import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LearnerNavbar from '../../components/navigation/LearnerNavbar';
import CourseOverview from './components/CourseOverview';
import LessonPlayer from './components/LessonPlayer';
import PointsPopup from './components/PointsPopup';
import CompletionPanel from './components/CompletionPanel';

const CourseLearningPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

    const [currentState, setCurrentState] = useState('detail');
    const [activeLesson, setActiveLesson] = useState(null);
    const [showPointsPopup, setShowPointsPopup] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [totalPointsEarned, setTotalPointsEarned] = useState(0);
    const [course, setCourse] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [learner, setLearner] = useState({ isLoggedIn: false, name: 'Learner' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setLearner({ isLoggedIn: Boolean(token), name: 'Learner' });

        const fetchCourse = async () => {
            if (!token) {
                alert('You need to log in to preview this course.');
                navigate('/login-screen');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/courses/${courseId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const message = errorData?.detail || 'Unable to load course.';
                    alert(message);
                    navigate('/courses');
                    return;
                }

                const data = await response.json();
                const lessons = (data.curriculum || []).map((item, index) => {
                    const base = {
                        id: item.id || `${index}`,
                        title: item.title,
                        type: item.type,
                        duration: item.duration || '',
                        status: 'not-started',
                        description: item.description || ''
                    };

                    if (item.type === 'video') {
                        return { ...base, videoUrl: item.content || '' };
                    }

                    if (item.type === 'document') {
                        return { ...base, documentUrl: item.content || '' };
                    }

                    if (item.type === 'image') {
                        return { ...base, imageUrl: item.content || '' };
                    }

                    if (item.type === 'quiz') {
                        return {
                            ...base,
                            quiz: {
                                id: item.id,
                                title: item.title,
                                pointsReward: 0,
                                questions: (item.questions || []).map((q, qIndex) => ({
                                    id: q.id || `${index}-${qIndex}`,
                                    question: q.text,
                                    options: q.options || [],
                                    correctAnswer: q.correctAnswer
                                }))
                            }
                        };
                    }

                    return base;
                });

                const coursePayload = {
                    id: data.id,
                    title: data.title,
                    description: data.description || '',
                    coverImage: data.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop',
                    instructor: data.instructor || 'Instructor',
                    totalLessons: lessons.length,
                    completedLessons: 0,
                    progress: 0,
                    rating: 0,
                    reviewCount: 0,
                    duration: '',
                    lessons
                };

                setCourse(coursePayload);
                setReviews([]);
                setCurrentState('detail');
                setActiveLesson(null);
                setShowPointsPopup(false);
                setEarnedPoints(0);
                setTotalPointsEarned(0);
            } catch (error) {
                alert('Unable to load course.');
                navigate('/courses');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [API_BASE_URL, courseId, navigate]);

    const handleLessonClick = (lesson) => {
        setActiveLesson(lesson);
        setCurrentState('player');

        if (lesson.status !== 'completed') {
            setCourse(prev => ({
                ...prev,
                lessons: prev.lessons.map(l =>
                    l.id === lesson.id ? { ...l, status: 'in-progress' } : l
                )
            }));
        }
    };

    const handleBackToCourse = () => {
        setCurrentState('detail');
        setActiveLesson(null);
    };

    const handleNextLesson = (nextLesson) => {
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

    const handleQuizComplete = (points) => {
        setEarnedPoints(points);
        setTotalPointsEarned(prev => prev + points);
        setShowPointsPopup(true);

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

    const handlePointsClose = () => {
        setShowPointsPopup(false);
    };

    const handleCompleteCourse = () => {
        setCurrentState('completion');
    };

    const renderContent = () => {
        if (isLoading || !course) {
            return (
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-muted-foreground text-sm">Loading course...</p>
                    </div>
                </div>
            );
        }

        switch (currentState) {
            case 'detail':
                return (
                    <CourseOverview
                        course={course}
                        reviews={reviews}
                        learner={learner}
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
            <LearnerNavbar />
            {renderContent()}
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
