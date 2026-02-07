import React, { useState, useMemo } from 'react';
import LearnerNavbar from '../../components/navigation/LearnerNavbar';
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
        <div className="min-h-screen bg-background">
            {/* Learner Navigation */}
            <LearnerNavbar />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
                {/* Header */}
                <CoursesHeader />

                {/* User State Indicator */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-card border border-border px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm shadow-sm">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${mockUser.isLoggedIn ? 'bg-success' : 'bg-muted-foreground'}`} />
                        <span className="text-foreground font-medium">
                            {mockUser.isLoggedIn ? 'Logged in as Learner' : 'Guest Mode'}
                        </span>
                        <span className="text-border mx-1 sm:mx-2">|</span>
                        <span className="text-muted-foreground">
                            {visibleCourses.length} course{visibleCourses.length !== 1 ? 's' : ''} available
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
