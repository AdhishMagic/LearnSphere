import React, { useState, useMemo } from 'react';
import DashboardHeader from './components/DashboardHeader';
import SearchBar from './components/SearchBar';
import CoursesSection from './components/CoursesSection';
import ProfilePanel from './components/ProfilePanel';
import { mockLearner, mockCourses, filterCoursesBySearch } from './mockData';

const MyCoursesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter courses based on search
    const filteredCourses = useMemo(() => {
        return filterCoursesBySearch(mockCourses, searchQuery);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                {/* User State Indicator (for demo purposes) */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm shadow-sm">
                        <span className={`w-2 h-2 rounded-full ${mockLearner.isLoggedIn ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        <span className="text-gray-700">
                            {mockLearner.isLoggedIn ? `Logged in as ${mockLearner.name}` : 'Guest Mode'}
                        </span>
                        <span className="text-gray-300 mx-1">|</span>
                        <span className="text-gray-500">
                            Role: Learner
                        </span>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Profile Panel - Sidebar on desktop, top on mobile */}
                    <div className="lg:order-2 lg:w-80 lg:flex-shrink-0">
                        <div className="lg:sticky lg:top-8">
                            <ProfilePanel learner={mockLearner} />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 lg:order-1">
                        {/* Header */}
                        <DashboardHeader />

                        {/* Search Bar */}
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search your courses by name or tag..."
                        />

                        {/* Courses Grid */}
                        <CoursesSection
                            courses={filteredCourses}
                            learner={mockLearner}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCoursesPage;
