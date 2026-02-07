import React, { useState } from 'react';
import LessonItem from './LessonItem';
import { filterLessonsBySearch } from '../mockData';

const LessonsList = ({ lessons, activeLessonId, onLessonClick }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLessons = filterLessonsBySearch(lessons, searchQuery);

    return (
        <div>
            {/* Search */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search lessons..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{filteredLessons.length} lessons</span>
                <span>
                    {lessons.filter(l => l.status === 'completed').length}/{lessons.length} completed
                </span>
            </div>

            {/* Lessons List */}
            <div className="space-y-2">
                {filteredLessons.map((lesson) => (
                    <LessonItem
                        key={lesson.id}
                        lesson={lesson}
                        isActive={activeLessonId === lesson.id}
                        onClick={onLessonClick}
                    />
                ))}
            </div>

            {/* Empty state */}
            {filteredLessons.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p>No lessons match your search.</p>
                </div>
            )}
        </div>
    );
};

export default LessonsList;
