import React, { useState, useMemo } from 'react';
import LearnerNavbar from '../../components/navigation/LearnerNavbar';
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
        <div className="min-h-screen bg-background">
            {/* Learner Navigation */}
            <LearnerNavbar />

            {/* Main Content */}
            <main>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">

                    {/* Two-column layout */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                        {/* Profile Panel - Full width on mobile, sidebar on desktop */}
                        <div className="lg:order-2 lg:w-80 xl:w-96 lg:flex-shrink-0">
                            <div className="lg:sticky lg:top-20">
                                <ProfilePanel learner={mockLearner} />
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 lg:order-1 min-w-0">
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
            </main>
        </div>
    );
};

export default MyCoursesPage;
