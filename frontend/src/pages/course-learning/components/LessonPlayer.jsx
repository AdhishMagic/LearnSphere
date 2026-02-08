import React, { useState } from 'react';
import PlayerSidebar from './PlayerSidebar';
import LessonViewer from './LessonViewer';
import NavigationControls from './NavigationControls';
import QuizIntro from './QuizIntro';
import QuizQuestion from './QuizQuestion';

const LessonPlayer = ({
    course,
    lesson,
    onBack,
    onNextLesson,
    onQuizComplete
}) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeLessonId, setActiveLessonId] = useState(lesson.id);
    const [currentLesson, setCurrentLesson] = useState(lesson);

    // Quiz state
    const [quizState, setQuizState] = useState('idle'); // idle | intro | question
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id);
    const nextLesson = currentIndex >= 0 && currentIndex < course.lessons.length - 1
        ? course.lessons[currentIndex + 1]
        : null;
    const hasNextLesson = nextLesson !== null;

    // Handle lesson change from sidebar
    const handleLessonClick = (selectedLesson) => {
        console.log(`[Lesson] Opening: ${selectedLesson.id} - ${selectedLesson.title}`);
        setActiveLessonId(selectedLesson.id);
        setCurrentLesson(selectedLesson);
        setQuizState('idle');
        setCurrentQuestionIndex(0);
    };

    // Handle next content
    const handleNext = () => {
        if (nextLesson) {
            handleLessonClick(nextLesson);
            onNextLesson(nextLesson);
        }
    };

    // Quiz handlers
    const handleStartQuiz = () => {
        console.log(`[Quiz] Starting: ${currentLesson.quiz?.id}`);
        setQuizState('intro');
    };

    const handleQuizStart = () => {
        setQuizState('question');
    };

    const handleQuizAnswer = (answerIndex) => {
        const quiz = currentLesson.quiz;
        const isLast = currentQuestionIndex === quiz.questions.length - 1;

        if (isLast) {
            console.log(`[Quiz] Completed: +${quiz.pointsReward} points`);
            setQuizState('idle');
            setCurrentQuestionIndex(0);
            onQuizComplete(quiz.pointsReward);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    // Render main content
    const renderMainContent = () => {
        if (currentLesson.type === 'quiz') {
            if (quizState === 'intro') {
                return (
                    <QuizIntro
                        quiz={currentLesson.quiz}
                        lesson={currentLesson}
                        onStart={handleQuizStart}
                    />
                );
            }
            if (quizState === 'question') {
                const quiz = currentLesson.quiz;
                return (
                    <QuizQuestion
                        question={quiz.questions[currentQuestionIndex]}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={quiz.questions.length}
                        onAnswer={handleQuizAnswer}
                        isLast={currentQuestionIndex === quiz.questions.length - 1}
                    />
                );
            }
        }

        return (
            <LessonViewer
                lesson={currentLesson}
                onStartQuiz={handleStartQuiz}
            />
        );
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <PlayerSidebar
                course={course}
                activeLessonId={activeLessonId}
                onLessonClick={handleLessonClick}
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content Area */}
            <div
                className={`
                    transition-all duration-300 ease-out min-h-screen
                    ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-80'}
                `}
            >
                {/* Header */}
                <div className="bg-card border-b border-border px-4 sm:px-6 py-4 sm:py-5 sticky top-0 z-20">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                            {currentLesson.title}
                        </h1>
                        {currentLesson.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {currentLesson.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="max-w-4xl mx-auto">
                        {renderMainContent()}
                    </div>
                </div>

                {/* Navigation */}
                {quizState === 'idle' && (
                    <NavigationControls
                        onBack={onBack}
                        onNext={handleNext}
                        hasNext={hasNextLesson}
                    />
                )}
            </div>
        </div>
    );
};

export default LessonPlayer;
