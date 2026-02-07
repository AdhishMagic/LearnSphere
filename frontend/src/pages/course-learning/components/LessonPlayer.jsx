import React, { useState } from 'react';
import PlayerSidebar from './PlayerSidebar';
import LessonViewer from './LessonViewer';
import NavigationControls from './NavigationControls';
import QuizIntro from './QuizIntro';
import QuizQuestion from './QuizQuestion';
import { getNextLesson } from '../mockData';

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

    const hasNextLesson = getNextLesson(currentLesson.id) !== null;

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
        const nextLesson = getNextLesson(currentLesson.id);
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
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <PlayerSidebar
                course={course}
                activeLessonId={activeLessonId}
                onLessonClick={handleLessonClick}
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-0' : 'lg:ml-80'
                }`}>
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <h1 className="text-xl font-bold text-gray-900">
                        {currentLesson.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {currentLesson.description}
                    </p>
                </div>

                {/* Content */}
                <div className="p-6">
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
