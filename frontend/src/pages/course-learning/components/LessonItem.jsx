import React from 'react';

const LessonItem = ({ lesson, isActive, onClick }) => {
    // Status icons and colors
    const getStatusConfig = () => {
        switch (lesson.status) {
            case 'completed':
                return {
                    icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    ),
                    color: 'text-green-500',
                    bg: 'bg-green-50'
                };
            case 'in-progress':
                return {
                    icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    ),
                    color: 'text-blue-500',
                    bg: 'bg-blue-50'
                };
            default:
                return {
                    icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    ),
                    color: 'text-gray-400',
                    bg: 'bg-gray-50'
                };
        }
    };

    // Type icons
    const getTypeIcon = () => {
        switch (lesson.type) {
            case 'video':
                return '🎬';
            case 'document':
                return '📄';
            case 'image':
                return '🖼️';
            case 'quiz':
                return '📝';
            default:
                return '📚';
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <button
            onClick={() => onClick(lesson)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${isActive
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
        >
            <div className="flex items-start gap-3">
                {/* Status Icon */}
                <div className={`flex-shrink-0 ${statusConfig.color}`}>
                    {statusConfig.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{getTypeIcon()}</span>
                        <h4 className={`font-medium text-sm truncate ${isActive ? 'text-blue-700' : 'text-gray-900'
                            }`}>
                            {lesson.title}
                        </h4>
                    </div>
                    <p className="text-xs text-gray-500">{lesson.duration}</p>
                </div>

                {/* Arrow */}
                <svg
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? 'text-blue-500 translate-x-1' : 'text-gray-300 group-hover:text-gray-400'
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </button>
    );
};

export default LessonItem;
