import React from 'react';

const LessonViewer = ({ lesson, onStartQuiz }) => {
    // Render content based on lesson type
    const renderContent = () => {
        switch (lesson.type) {
            case 'video':
                return (
                    <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src={lesson.videoUrl}
                            title={lesson.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                );

            case 'document':
                return (
                    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                            <span className="text-4xl">📄</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Document Viewer
                        </h3>
                        <p className="text-gray-600 mb-4">
                            This is a document lesson. In production, a PDF viewer would be embedded here.
                        </p>
                        <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF
                        </button>
                    </div>
                );

            case 'image':
                return (
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={lesson.imageUrl}
                            alt={lesson.title}
                            className="w-full h-auto"
                        />
                    </div>
                );

            case 'quiz':
                return (
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
                            <span className="text-4xl">📝</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Quiz: {lesson.quiz?.title || lesson.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {lesson.quiz?.questions.length} questions • +{lesson.quiz?.pointsReward} points
                        </p>
                        <button
                            onClick={onStartQuiz}
                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                        >
                            Start Quiz
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                );

            default:
                return (
                    <div className="bg-gray-100 rounded-xl p-8 text-center">
                        <p className="text-gray-500">Unknown content type</p>
                    </div>
                );
        }
    };

    return (
        <div>
            {/* Content Viewer */}
            <div className="mb-6">
                {renderContent()}
            </div>

            {/* Attachments */}
            {lesson.attachments && lesson.attachments.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        Attachments
                    </h4>
                    <div className="space-y-2">
                        {lesson.attachments.map((attachment) => (
                            <button
                                key={attachment.id}
                                onClick={() => console.log(`[Download] ${attachment.name}`)}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">
                                        {attachment.type === 'pdf' ? '📕' :
                                            attachment.type === 'zip' ? '📦' :
                                                attachment.type === 'image' ? '🖼️' : '📎'}
                                    </span>
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{attachment.name}</p>
                                        <p className="text-xs text-gray-500">{attachment.size}</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LessonViewer;
