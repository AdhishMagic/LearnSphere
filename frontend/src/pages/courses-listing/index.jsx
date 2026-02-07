import React, { useState, useMemo } from 'react';
import CoursesHeader from './components/CoursesHeader';
import CoursesFilters from './components/CoursesFilters';
import CoursesGrid from './components/CoursesGrid';
import { mockUser, getVisibleCourses, getAllTags } from './mockData';

const CoursesListingPage = () => {
    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All Tags');

    // Get courses based on visibility rules
    const visibleCourses = useMemo(() => {
        return getVisibleCourses(mockUser.isLoggedIn);
    }, []);

    // Get all available tags from visible courses
    const availableTags = useMemo(() => {
        return getAllTags();
    }, []);

    // Filter courses based on search and tag
    const filteredCourses = useMemo(() => {
        let filtered = [...visibleCourses];

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query)
            );
        }

        // Apply tag filter
        if (selectedTag !== 'All Tags') {
            filtered = filtered.filter(course =>
                course.tags.includes(selectedTag)
            );
        }

        return filtered;
    }, [visibleCourses, searchQuery, selectedTag]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <CoursesHeader />

                {/* User State Indicator (for demo purposes) */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm">
                        <span className={`w-2 h-2 rounded-full ${mockUser.isLoggedIn ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        <span className="text-gray-700">
                            {mockUser.isLoggedIn ? 'Logged in as Learner' : 'Guest Mode'}
                        </span>
                        <span className="text-gray-400 mx-2">|</span>
                        <span className="text-gray-600">
                            Showing {visibleCourses.length} course{visibleCourses.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <CoursesFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedTag={selectedTag}
                    onTagChange={setSelectedTag}
                    availableTags={availableTags}
                />

                {/* Courses Grid */}
                <CoursesGrid courses={filteredCourses} />
            </div>
        </div>
    );
};

export default CoursesListingPage;
